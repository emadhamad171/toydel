import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import {
    getReactNativePersistence,
    initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyBhUiAzIkanr8uXLiAIc2dZ6v0grBYIrMQ",
    authDomain: "testotp-fabeb.firebaseapp.com",
    projectId: "testotp-fabeb",
    storageBucket: "testotp-fabeb.appspot.com",
    messagingSenderId: "594375925573",
    appId: "1:594375925573:web:b0f04ed3a89deeb0dce82c",
    measurementId: "G-H1RMLQD9CJ"
}

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = app && initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
