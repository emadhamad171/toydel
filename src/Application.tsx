import React, {useEffect} from 'react';
import Toast from "react-native-toast-message";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Authorization, Cart, Home, Notifications, Onboarding, Profile} from './screens'
import {
    loadBaseColorTheme, loadNotificationStatus,
    loadOrCreateUser, registerNotifications,
    screenOptions,
    signInSuccessfulToast,
    signInWarningToast
} from "./helpers";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "./store";
import {setUser} from "./store/slices/userSlice";
import {useColorScheme} from "react-native";
import {setNotificationsStatus, setTheme} from "./store/slices/configSlice";

const Tab = createBottomTabNavigator();

export default function Application() {
    const user = useSelector((state:RootState)=>state.user.user);
    const isNotificationOff = useSelector((state:RootState)=>state.config.notificationOff);

    const dispatch = useDispatch();
    const baseTheme = useColorScheme();
    const onUserSignIn = ({userInstance}) => {
        loadOrCreateUser({userInstance}).then((user) => {
            dispatch(setUser(user));
            signInSuccessfulToast();
            !isNotificationOff && registerNotifications();
        }).catch((e) => {
            signInWarningToast();
            console.log(e);
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (userInstance) => {
            if(!!userInstance?.emailVerified || !!userInstance?.phoneNumber) {
                onUserSignIn({userInstance})
            } else {
                if(!!userInstance){
                auth.signOut().then(()=>
                    Toast.show({type: 'info', text1:'User registered', text2: 'Check your email to verify it.'}))
                    }
            }
        });
        loadBaseColorTheme(baseTheme).then(colorTheme => {
            dispatch(setTheme(colorTheme));
        })
        loadNotificationStatus().then((isNotificationOff)=>{
            dispatch(setNotificationsStatus(isNotificationOff));
        })
    }, []);

    return user && (!!auth.currentUser.emailVerified || !!user?.phoneNumber) ?
        <NavigationContainer>
            <Tab.Navigator initialRouteName={user.isOnboarded ? 'Profile' : 'Onboarding'} screenOptions={screenOptions}>
                {!user.isOnboarded && <Tab.Screen name={'Onboarding'} options={{tabBarStyle: {display:'none'}}} component={Onboarding}/>}
                <Tab.Screen name="Home" options={{tabBarIcon: ({focused})=>{
                    return <Icon name={'apple-keyboard-command'} size={24} color={focused ? '#555' : '#aaa'} />;}}} component={Home} />
                <Tab.Screen name="Cart" options={{tabBarIcon: ({focused})=>{
                    return <Icon name={'format-list-bulleted'} size={24} color={focused ? '#555' : '#aaa'} />;}}} component={Cart} />
                <Tab.Screen name="Notifications" options={{tabBarIcon: ({focused})=>{
                    return <Icon name={ focused ? 'bell' : 'bell-outline'} size={24} color={focused ? '#555' : '#aaa'} />;}}} component={Notifications} />
                <Tab.Screen name="Profile" options={{tabBarIcon: ({focused})=>{
                    return <Icon name={'account'} size={24} color={focused ? '#555' : '#aaa'} />;}}} component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>
        : <Authorization />;
}
