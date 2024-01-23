import { StatusBar } from 'expo-status-bar';
import Authorization from "./src/screens/Authorization";
import {useEffect, useState} from "react";
import Toast from "react-native-toast-message";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "./src/firebase";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import {loadUser} from "./src/firebase/firebaseAPI";

const Tab = createBottomTabNavigator();
const screenOptions = {
    headerShown: false,
    tabBarShowLabel:false,
    tabBarStyle: {
        height: 50
    }
};
const signInSuccessfulToast = () =>{
    Toast.show({
        type: 'success',
        text1: 'Log in successfully!',
        text2: '',
        position: 'top',
        swipeable: true
    });
}
const signInWarningToast = () =>{
    Toast.show({
        type: 'error',
        text1: 'Something went wrong.',
        text2: 'Try again',
        position: 'top',
        swipeable: true
    });
}
const loadOrCreateUser = async ({userInstance, setUser})=>{
    const user = await loadUser({userID: userInstance.uid});
    if (user?.length){
        setUser(user[0]);
        return;
    }
    const userCreateInstance = {
        id: userInstance.uid,
        displayName: userInstance?.displayName || 'Set Name',
        email: userInstance?.email || "",
        phoneNumber: userInstance?.phoneNumber || '',
        favoriteList: [''],
        plan: 'default',
        photoURL: userInstance?.photoURL || '',
        bio: 'I Love Toy App!',
        location: null
    }
    await db.collection('users').doc(userInstance.uid).set(userCreateInstance);
    setUser(userCreateInstance);
}

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (userInstance) => {
            if(!!userInstance){
                loadOrCreateUser({userInstance, setUser}).then(()=>{
                    signInSuccessfulToast();
                }).catch((e)=>{
                    signInWarningToast();
                    console.log(e);
                });
            }
        });
    }, []);

    const ProfileScreen = ()=> <Profile user={user} setUser={setUser} />;

    return (<>
            <StatusBar style="auto" hidden={true}/>
        {user ?
        <NavigationContainer>
            <Tab.Navigator initialRouteName={'Profile'} screenOptions={screenOptions}>
                <Tab.Screen name="Home" options={{tabBarIcon: ({focused})=>{
                        return <Icon name={'apple-keyboard-command'} size={24} color={focused ? '#555' : '#aaa'} />;}}} component={Home} />
                <Tab.Screen name="Cart" options={{tabBarIcon: ({focused})=>{
                        return <Icon name={'format-list-bulleted'} size={24} color={focused ? '#555' : '#aaa'} />;}}} component={Profile} />
                <Tab.Screen name="Notifications" options={{tabBarIcon: ({focused})=>{
                        return <Icon name={ focused ? 'bell' : 'bell-outline'} size={24} color={focused ? '#555' : '#aaa'} />;}}} component={Profile} />
                <Tab.Screen name="Profile" options={{tabBarIcon: ({focused})=>{
                    return <Icon name={'account'} size={24} color={focused ? '#555' : '#aaa'} />;}}} component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
            : <Authorization />}
            <Toast />
        </>
    );
}
