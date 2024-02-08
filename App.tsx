import { StatusBar } from 'expo-status-bar';
import Authorization from "./src/screens/Authorization";
import React, { useState, useEffect } from 'react';
import Toast from "react-native-toast-message";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/firebase";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import registerNNPushToken, { registerIndieID } from './src/notifications';
import Notifications from "./src/screens/Notifications";
import {loadOrCreateUser, screenOptions, signInSuccessfulToast, signInWarningToast} from "./src/helpers";
import Cart from "./src/screens/Cart";
import {notificationAppToken, notificationAppId} from 'react-native-dotenv'

const Tab = createBottomTabNavigator();

export default function App() {
    const [user, setUser] = useState(null);
    const [isUserVerified, setUserVerify] = useState(false);
    registerNNPushToken(notificationAppId, notificationAppToken);
    useEffect(() => {
        onAuthStateChanged(auth, (userInstance) => {
            if(!!userInstance){
                if(!!userInstance?.emailVerified || !!userInstance?.phoneNumber) {
                    setUserVerify(true);
                    registerIndieID(userInstance.uid, notificationAppId, notificationAppToken);
                    loadOrCreateUser({userInstance, setUser}).then(() => {
                        signInSuccessfulToast();
                    }).catch((e) => {
                        signInWarningToast();
                        console.log(e);
                    });
                } else {
                    auth.signOut().then(()=>
                        Toast.show({type: 'info', text1:'User registered', text2: 'Check your email to verify it.'}))
                }
            }
        });
    }, []);

    const ProfileScreen = ()=> <Profile user={user} setUser={setUser} />;
    const NotificationScreen = () => <Notifications user={user} />;
    const CartScreen = () => <Cart user={user} />;

    return (<>
            <StatusBar style="auto" hidden/>
        {user && isUserVerified ?
        <NavigationContainer>
            <Tab.Navigator initialRouteName={'Profile'} screenOptions={screenOptions}>
                <Tab.Screen name="Home" options={{tabBarIcon: ({focused})=>{
                        return <Icon name={'apple-keyboard-command'} size={24} color={focused ? '#555' : '#aaa'} />;}}} component={Home} />
                <Tab.Screen name="Cart" options={{tabBarIcon: ({focused})=>{
                        return <Icon name={'format-list-bulleted'} size={24} color={focused ? '#555' : '#aaa'} />;}}} component={CartScreen} />
                <Tab.Screen name="Notifications" options={{tabBarIcon: ({focused})=>{
                        return <Icon name={ focused ? 'bell' : 'bell-outline'} size={24} color={focused ? '#555' : '#aaa'} />;}}} component={NotificationScreen} />
                <Tab.Screen name="Profile" options={{tabBarIcon: ({focused})=>{
                    return <Icon name={'account'} size={24} color={focused ? '#555' : '#aaa'} />;}}} component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
            : <Authorization />}
            <Toast />
        </>
    );
}
