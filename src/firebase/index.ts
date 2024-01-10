import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import {
    getReactNativePersistence,
    initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId} from 'react-native-dotenv';
export const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
}

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = app && initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
