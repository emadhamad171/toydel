import React, {useEffect} from 'react';
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
import {
    appSetConnection,
    appSetIsResetPassword,
    appSetLoading,
    appSetOobCode,
    useAppDispatch,
    useAppSelector,
    wait
} from "@shared";
import {AnimatePresence} from "moti";
import {WelcomeLoading} from "../screens";
import * as Network from 'expo-network';
import * as Linking from 'expo-linking';
import {parseDeepLink} from "./lib";
import NetworkProblemScreen from "../screens/lostConnection";
LogBox.ignoreAllLogs();


export default function App(){

    return (
        <Provider store={store}>
            <StatusBar style="auto" />
            <StripeProvider publishableKey={stripePublishableKey}
                            merchantIdentifier="merchant.com.toydelapp"
            >
                <AppFlow />
            </StripeProvider>
            <Toast />
        </Provider>
    );
}

export function AppFlow(){
    const isConnectionLost = useAppSelector(state=>state.config.isConnectionLost);
    const isLoading = useAppSelector(state=>state.config.isLoading);
    const dispatch = useAppDispatch();

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
            const status = await Network.getNetworkStateAsync();
            Linking.addEventListener("url", (event)=>{
                const ops = parseDeepLink(event.url);
                if (ops["mode"]){
                    switch (ops["mode"]){
                        case "resetPassword":
                            dispatch(appSetIsResetPassword(true));
                            dispatch(appSetOobCode(ops["oobCode"]));
                            break;
                        default:
                            break;
                    }
                }
            })
            dispatch(appSetConnection(status.isConnected))
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

    return (<View style={{flex: 1, position: 'relative'}}>
                <AnimatePresence exitBeforeEnter>
                    {
                        isLoading && <WelcomeLoading closeLoading={()=>dispatch(appSetLoading(false))} />
                    }
                </AnimatePresence>
                {
                    !isConnectionLost ? Platform.OS === 'ios' ? <ApplicationFlow /> : !isLoading && <ApplicationFlow /> :
                            <NetworkProblemScreen />
                }
            </View>
    );
}
