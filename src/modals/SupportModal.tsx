import WebView from "react-native-webview";
import {updateUserField} from "../firebase/firebaseAPI";
import {useRef, useState} from "react";
const onMessage = async ({payload, user}) => {
    const data = await JSON.parse(payload.nativeEvent.data);
    await updateUserField({updatedField: {supportInfo: data}, userID: user.id});
};
const setSupport = ({supportInfo})=> {
    return `(function() {
  window.localStorage.setItem('@@lc_auth_token:5273fef3-1326-4aba-9f8b-4331c9697529','${supportInfo.auth_token}');
  setTimeout(()=>{
  const ids = window.localStorage.getItem('@@lc_ids');
  const token = window.localStorage.getItem('@@lc_auth_token:5273fef3-1326-4aba-9f8b-4331c9697529');
  const data123 = {lc_ids: ids, auth_token: token};
  const pData = JSON.stringify(data123);
  if(token !== '${supportInfo.auth_token}'){
  window.ReactNativeWebView.postMessage(pData);
  }
  },5000)
})();`;
}

const getSupport =`(function() {
setTimeout(()=>{
  const ids = window.localStorage.getItem('@@lc_ids');
  const token = window.localStorage.getItem('@@lc_auth_token:50c6cd15-ed8c-44db-bf6d-9ca5df4833e1');
  const data123 = {lc_ids: ids, auth_token: token};
  const pData = JSON.stringify(data123);
  window.ReactNativeWebView.postMessage(pData);
  }, 3000);
})();`;
const clearStorage =(setCookieClear) => {
    setTimeout(()=> {
        setCookieClear(true);
    }, 500);
    return `(function() {
  window.localStorage.clear();
  })()
`;
}
const SupportModal = ({user}) => {
    const [isCookieClear, setCookieClear] = useState(false);
    const WebViewRef = useRef(null);
    const _injectaccesstokenonload = () =>{
        const script = user?.supportInfo && user.supportInfo?.auth_token  ? setSupport({supportInfo: user.supportInfo}) : isCookieClear || user.supportInfo?.auth_token ? getSupport : clearStorage(setCookieClear);
        return script;
    }

    return <WebView
        ref={WebViewRef}
        incognito={!!!user?.supportInfo?.auth_token}
        source={{ uri: 'https://secure.livechatinc.com/customer/action/open_chat?license_id=17159016' }}
        style={{ flex: 1 }}
        onMessage={(payload)=>{onMessage({payload: payload, user})}}
        injectedJavaScriptBeforeContentLoaded={_injectaccesstokenonload()}
        injectedJavaScript={_injectaccesstokenonload()}
    />
};



export default SupportModal;
