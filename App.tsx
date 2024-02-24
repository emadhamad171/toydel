import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Toast from "react-native-toast-message";
import {Provider} from "react-redux";
import {store} from "./src/store";
import Application from './src/Application';
import 'react-native-gesture-handler';
import {StripeProvider} from "@stripe/stripe-react-native";
import {stripePublishableKey} from 'react-native-dotenv';

export default function App() {
    return (<Provider store={store}>
            <StatusBar style="auto" hidden/>
            <StripeProvider publishableKey={stripePublishableKey}
                            merchantIdentifier="merchant.com.toydelapp"
            >
            <Application />
            </StripeProvider>
            <Toast />
        </Provider>
    );
}
