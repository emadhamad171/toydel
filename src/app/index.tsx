import React, {useEffect, useState} from 'react';
import Toast from "react-native-toast-message";
import 'react-native-gesture-handler';
import { Provider } from "react-redux";
import { store } from "./providers/redux";
import { stripePublishableKey } from "react-native-dotenv";
import { StatusBar } from "expo-status-bar";
import { StripeProvider } from "@stripe/stripe-react-native";
import ApplicationFlow from "../processes/app";
import {LogBox, Platform, View} from 'react-native';
import * as SplashScreen from "expo-splash-screen";
import {useFonts} from "@expo-google-fonts/inter";
import {wait} from "@shared";
import {AnimatePresence} from "moti";
import {WelcomeLoading} from "../screens";

LogBox.ignoreAllLogs();

export default function App(){
    const [isLoading, setLoading] = useState(true);
    const [fontsLoaded] = useFonts({
        "Shantell-Sans": require('../../assets/fonts/ShantellSans-ExtraBold.ttf'),
        "Cera-Pro": require('../../assets/fonts/CeraPro-Regular.ttf'),
        "Cera-Pro-Bold": require('../../assets/fonts/CeraPro-Bold.ttf'),
        "Cera-Pro-Black": require('../../assets/fonts/CeraPro-Black.ttf'),
        "Manrope": require('../../assets/fonts/Manrope-Regular.ttf'),
        "Manrope-Bold": require('../../assets/fonts/Manrope-Bold.ttf')
    });

    useEffect(() => {
        const prepare = async () => {
            await SplashScreen.preventAutoHideAsync();
        };
        prepare();
    }, []);

    if (fontsLoaded){
        wait().then(()=> {
            SplashScreen.hideAsync();
        });
    } else {
        return null;
    }

    return (
        <Provider store={store}>
            <StatusBar style="auto" />
            <StripeProvider publishableKey={stripePublishableKey}
                            merchantIdentifier="merchant.com.toydelapp"
            >
                <View style={{flex: 1, position: 'relative'}}>
                        <AnimatePresence exitBeforeEnter>
                        {
                            isLoading && <WelcomeLoading closeLoading={()=>setLoading(false)} />
                        }
                        </AnimatePresence>
                    {
                        Platform.OS === 'ios' ? <ApplicationFlow />
                            : !isLoading && <ApplicationFlow />
                    }
                </View>
            </StripeProvider>
            <Toast />
    </Provider>);
}
