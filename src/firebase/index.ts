import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getAuth} from 'firebase/auth'
import {getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

export const firebaseConfig = {
    apiKey: "AIzaSyBhUiAzIkanr8uXLiAIc2dZ6v0grBYIrMQ",
    authDomain: "testotp-fabeb.firebaseapp.com",
    projectId: "testotp-fabeb",
    storageBucket: "testotp-fabeb.appspot.com",
    messagingSenderId: "594375925573",
    appId: "1:594375925573:web:b0f04ed3a89deeb0dce82c",
    measurementId: "G-H1RMLQD9CJ"
}
let app;
//
if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
}
export const auth = app && getAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
