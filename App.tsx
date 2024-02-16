import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Toast from "react-native-toast-message";
import {Provider} from "react-redux";
import {store} from "./src/store";
import Application from './src/Application';
import registerNNPushToken from "./src/notifications";
import {notificationAppId, notificationAppToken} from "react-native-dotenv";
import 'react-native-gesture-handler';

export default function App() {
    registerNNPushToken(notificationAppId, notificationAppToken);
    return (<Provider store={store}>
            <StatusBar style="auto" hidden/>
            <Application />
            <Toast />
        </Provider>
    );
}
