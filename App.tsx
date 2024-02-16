import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useCallback} from 'react';
import Toast from "react-native-toast-message";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/firebase";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import registerNNPushToken, { registerIndieID } from './src/notifications';
import {
    Authorization,
    Cart,
    Home,
    Notifications,
    Onboarding,
    Profile
} from './src/screens'
import {loadOrCreateUser, screenOptions, signInSuccessfulToast, signInWarningToast,getOnboarded} from "./src/helpers";
import {notificationAppToken, notificationAppId} from 'react-native-dotenv'
import {userType} from "./src/helpers/types";
import {Provider,useSelector, useDispatch} from "react-redux";
import {store,RootState} from "./src/store";

const Tab = createBottomTabNavigator();

export default function App() {
    // const user = useSelector((state:RootState)=>state.user.user);


    const [user, setUser] = useState<userType>(null);
    const updateUser = useCallback(()=>{
            loadOrCreateUser({userInstance: {uid: user?.id}, setUser});
    }, [user]);
    const [isUserVerified, setUserVerify] = useState(false);
    const [isOnboarded, setOnboarded] = useState(false);
    registerNNPushToken(notificationAppId, notificationAppToken);
    useEffect(() => {
        getOnboarded().then(setOnboarded);
        onAuthStateChanged(auth, (userInstance) => {
            if(!!userInstance){
                if(!!userInstance?.emailVerified || !!userInstance?.phoneNumber) {
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

    const ProfileScreen = ()=> <Profile user={user} setUser={setUser} updateUser={updateUser} />;
    const NotificationScreen = () => <Notifications user={user} />;
    const CartScreen = () => <Cart user={user} />;
    const HomeScreen = () => <Home user={user} updateUser={updateUser} />;
    const OnboardingScreen = () => <Onboarding setOnboarded={setOnboarded}/>
    return (<Provider store={store}>
            <StatusBar style="auto" hidden/>
        {
            user && (!!auth.currentUser.emailVerified || !!user?.phoneNumber) ?<NavigationContainer>
                <Tab.Navigator initialRouteName={isOnboarded ? 'Profile' : 'Onboarding'} screenOptions={screenOptions}>
                    {!isOnboarded && <Tab.Screen name={'Onboarding'} options={{tabBarStyle: {display:'none'}}} component={OnboardingScreen}/>}
                    <Tab.Screen name="Home" options={{tabBarIcon: ({focused})=>{
                        return <Icon name={'apple-keyboard-command'} size={24} color={focused ? '#555' : '#aaa'} />;}}} component={HomeScreen} />
                    <Tab.Screen name="Cart" options={{tabBarIcon: ({focused})=>{
                        return <Icon name={'format-list-bulleted'} size={24} color={focused ? '#555' : '#aaa'} />;}}} component={CartScreen} />
                    <Tab.Screen name="Notifications" options={{tabBarIcon: ({focused})=>{
                        return <Icon name={ focused ? 'bell' : 'bell-outline'} size={24} color={focused ? '#555' : '#aaa'} />;}}} component={NotificationScreen} />
                    <Tab.Screen name="Profile" options={{tabBarIcon: ({focused})=>{
                        return <Icon name={'account'} size={24} color={focused ? '#555' : '#aaa'} />;}}} component={ProfileScreen} />
                </Tab.Navigator>
            </NavigationContainer>
            : <Authorization />
        }
            <Toast />
        </Provider>
    );
}
