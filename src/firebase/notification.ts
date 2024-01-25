import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {app, firebaseConfig} from "./index";
import firebase from "@react-native-firebase/app";

async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
}

export const getFCMToken = async () =>{
    let token = await AsyncStorage.getItem('fcmtoken');
    try {
        if (!token) {
            const app = await firebase.initializeApp(firebaseConfig);
            const generatedToken = await messaging().getToken();
            if(generatedToken){
                token = generatedToken;
            }
            await AsyncStorage.setItem('fcmtoken', generatedToken);
        }
    } catch (e){
        console.log('problem: ', e)
    }
    console.log(token);
    return token;
}
