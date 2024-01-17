import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import {
    getReactNativePersistence,
    initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId} from 'react-native-dotenv';
import {getStorage} from "firebase/storage";
import firebase from "firebase/compat";

export const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
}

export const app = firebase.initializeApp(firebaseConfig);
export const auth = app && initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const fStorage = getFirestore(app);
export const imgStorage = getStorage(app);
export const db = firebase.firestore(app);
