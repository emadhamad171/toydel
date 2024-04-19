import * as React from 'react';
import { WebView } from 'react-native-webview';
import { FirebaseOptions } from 'firebase/app';
import { CustomError } from '../lib/types';

export interface FirebaseAuthApplicationVerifier {
    readonly type: string;
    verify(): Promise<string>;
}

interface Props extends React.ComponentProps<typeof WebView> {
    firebaseConfig?: FirebaseOptions;
    firebaseVersion?: string;
    appVerificationDisabledForTesting?: boolean;
    languageCode?: string;
    onLoad?: () => any;
    onError?: () => any;
    onVerify: (token: string) => any;
    onFullChallenge?: () => any;
    invisible?: boolean;
    verify?: boolean;
}

function getWebviewSource(
    firebaseConfig: FirebaseOptions,
    firebaseVersion?: string,
    appVerificationDisabledForTesting: boolean = false,
    languageCode?: string,
    invisible?: boolean
) {
    firebaseVersion = firebaseVersion || '8.0.0';
    return {
        baseUrl: `https://${firebaseConfig.authDomain}`,
        html: `
<!DOCTYPE html><html>
<head>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="HandheldFriendly" content="true">
  <script src="https://www.gstatic.com/firebasejs/${firebaseVersion}/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/${firebaseVersion}/firebase-auth.js"></script>
  <script type="text/javascript">firebase.initializeApp(${JSON.stringify(
            firebaseConfig
        )});</script>
  <style>
    html, body {
      height: 100%;
      ${invisible ? `padding: 0; margin: 0;` : ``}
    }
    #recaptcha-btn {
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      border: 0;
      user-select: none;
      -webkit-user-select: none;
    }
  </style>
</head>
<body>
  ${
            invisible
                ? `<button id="recaptcha-btn" type="button" onclick="onClickButton()">Confirm reCAPTCHA</button>`
                : `<div id="recaptcha-cont" class="g-recaptcha"></div>`
        }
  <script>
    var fullChallengeTimer;
    function onVerify(token) {
      if (fullChallengeTimer) {
        clearInterval(fullChallengeTimer);
        fullChallengeTimer = undefined;
      }
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'verify',
        token: token
      }));
    }
    function onLoad() {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'load'
      }));
      firebase.auth().settings.appVerificationDisabledForTesting = ${appVerificationDisabledForTesting};
      ${languageCode ? `firebase.auth().languageCode = '${languageCode}';` : ''}
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("${
            invisible ? 'recaptcha-btn' : 'recaptcha-cont'
        }", {
        size: "${invisible ? 'invisible' : 'normal'}",
        callback: onVerify
      });
      window.recaptchaVerifier.render();
    }
    function onError() {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'error'
      }));
    }
    function onClickButton() {
      if (!fullChallengeTimer) {
        fullChallengeTimer = setInterval(function() {
          var iframes = document.getElementsByTagName("iframe");
          var isFullChallenge = false;
          for (i = 0; i < iframes.length; i++) {
            var parentWindow = iframes[i].parentNode ? iframes[i].parentNode.parentNode : undefined;
            var isHidden = parentWindow && parentWindow.style.opacity == 0;
            isFullChallenge = isFullChallenge || (
              !isHidden && 
              ((iframes[i].title === 'recaptcha challenge') ||
               (iframes[i].src.indexOf('google.com/recaptcha/api2/bframe') >= 0)));
          }
          if (isFullChallenge) {
            clearInterval(fullChallengeTimer);
            fullChallengeTimer = undefined;
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'fullChallenge'
            }));  
          }
        }, 100);
      }
    }
    window.addEventListener('message', function(event) {
      if (event.data.verify) {
        document.getElementById('recaptcha-btn').click();
      }
    });
  </script>
  <script src="https://www.google.com/recaptcha/api.js?onload=onLoad&render=explicit&hl=${
            languageCode ?? ''
        }" onerror="onError()"></script>
</body></html>`,
    };
}

function validateFirebaseConfig(firebaseConfig?: FirebaseOptions) {
    if (!firebaseConfig) {
        const err = new Error('Missing firebase web configuration.') as CustomError;
        err['code'] = 'ERR_FIREBASE_RECAPTCHA_CONFIG';
        throw err;
    }
    const { authDomain } = firebaseConfig;
    if (!authDomain) {
        const err = new Error(
            'Missing "authDomain" in firebase web configuration.'
        ) as CustomError;
        err['code'] = 'ERR_FIREBASE_RECAPTCHA_CONFIG';
    }
}

export function FirebaseRecaptcha(props: Props) {
    const {
        firebaseConfig,
        firebaseVersion,
        appVerificationDisabledForTesting,
        languageCode,
        onVerify,
        onLoad,
        onError,
        onFullChallenge,
        invisible,
        verify,
        ...otherProps
    } = props;
    const webview = React.useRef(null);
    const [loaded, setLoaded] = React.useState(false);
    React.useEffect(() => {
        if (webview.current && loaded && verify) {
            // @ts-ignore: Object is possibly null
            webview.current.injectJavaScript(`
    (function(){
      window.dispatchEvent(new MessageEvent('message', {data: { verify: true }}));
    })();
    true;
    `);
        }
        return () => {};
    }, [webview, verify, loaded]);
    validateFirebaseConfig(firebaseConfig);
    if (!firebaseConfig) {
        console.error(
            `FirebaseRecaptcha: Missing firebase web configuration. Please set the "expo.web.config.firebase" field in "app.json" or use the "firebaseConfig" prop.`
        );
        return null;
    }
    return (
        <WebView
            ref={webview}
            javaScriptEnabled
            automaticallyAdjustContentInsets
            scalesPageToFit
            mixedContentMode="always"
            source={getWebviewSource(
                firebaseConfig,
                firebaseVersion,
                appVerificationDisabledForTesting,
                languageCode,
                invisible
            )}
            onError={onError}
            onMessage={(event:any) => {
                const data = JSON.parse(event.nativeEvent.data);
                switch (data.type) {
                    case 'load':
                        if (onLoad) {
                            setLoaded(true);
                            onLoad();
                        }
                        break;
                    case 'error':
                        if (onError) {
                            onError();
                        }
                        break;
                    case 'verify':
                        onVerify(data.token);
                        break;
                    case 'fullChallenge':
                        if (onFullChallenge) {
                            onFullChallenge();
                        }
                        break;
                }
            }}
            {...otherProps}
        />
    );
}
