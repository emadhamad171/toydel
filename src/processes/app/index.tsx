import {
    appSetNotificationsStatus,
    appSetTheme,
    auth, loadBaseColorTheme, LoadingIndicator, loadNotificationStatus,
    loadOrCreateUser,
    registerIndieID,
    registerNNPushToken,
    signInSuccessfulToast, useAppDispatch,
    useAppSelector,
    userSet
} from "@shared";
import {notificationAppId, notificationAppToken} from "react-native-dotenv";
import React, {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import Toast from "react-native-toast-message";
import {useColorScheme, View} from "react-native";
import {Application} from "../main";
import AuthorizationFlow from "../authorization";


const ApplicationFlow = () => {
    const user = useAppSelector((state)=>state.user.user);
    const isNotificationOff = useAppSelector((state)=>state.config.notificationOff);
    const isLoadingInApp = useAppSelector((state)=>state.config.isLoading);
    const dispatch = useAppDispatch();
    const baseTheme = useColorScheme();

    const onUserSignIn = async ({userInstance}) => {
        loadOrCreateUser({userInstance}).then((user) => {
            dispatch(userSet(user));
            signInSuccessfulToast();
            if(!isNotificationOff){
                registerIndieID(auth.currentUser.uid, notificationAppId, notificationAppToken);
                registerNNPushToken(notificationAppId, notificationAppToken);
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    useEffect(() => {
        const unsubscribeAuthHandler = onAuthStateChanged(auth, (userInstance) => {
            if (!!userInstance?.emailVerified || !!userInstance?.phoneNumber) {
                onUserSignIn({userInstance});
            } else {
                if(!!userInstance){
                    auth.signOut().then(()=>
                        Toast.show({type: 'info', text1:'User registered', text2: 'Check your email to verify it.'}))
                }
            }
            return ()=> {
                unsubscribeAuthHandler();
            }
        });
        loadBaseColorTheme(baseTheme).then(colorTheme => {
            dispatch(appSetTheme(colorTheme));
        })
        loadNotificationStatus().then((isNotificationOff)=>{
            dispatch(appSetNotificationsStatus(isNotificationOff));
        })
    }, []);

    return <View style={{flex: 1, backgroundColor: '#fff'}}>
        {
            user ? <Application />
                : <AuthorizationFlow />
        }

        <LoadingIndicator isLoading={isLoadingInApp} />
    </View>
}

export default ApplicationFlow;
