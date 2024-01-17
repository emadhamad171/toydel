import { StatusBar } from 'expo-status-bar';
import {StyleSheet} from 'react-native';
import Authorization from "./src/screens/Authorization";
import {useEffect, useState} from "react";
import * as firebase_auth from "firebase/auth";
import Toast from "react-native-toast-message";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db, fStorage} from "./src/firebase";
import Profile from "./src/screens/Profile";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "./src/screens/Home";
import {collection, getDocs, query, where} from "firebase/firestore";

const Tab = createBottomTabNavigator();
const screenOptions = {
    headerShown: false,
    tabBarShowLabel:false,
    tabBarStyle: {
        height: 50
    }
};

export default function App() {
    const [user, setUser] = useState<firebase_auth.User>();
    useEffect(() => {
        onAuthStateChanged(auth, (userInstance) => {
            if(!!userInstance){
                try {
                    const userDBInstance = query(collection(fStorage, "users"), where('id', '==', userInstance.uid));
                    getDocs(userDBInstance).then((favoriteDocs)=>{
                        const fetchedUserInstance = favoriteDocs.docs.map(el=>{return {...el.data(), id:el.id}});
                        if(!fetchedUserInstance.length){
                            const userDBInstanceCreate = {
                                id: userInstance.uid,
                                favoriteList: ['']
                            }
                            db.collection('users').doc(userInstance.uid).set(userDBInstanceCreate);
                        }
                    })
                    setUser(userInstance);
                    Toast.show({
                        type: 'success',
                        text1: 'Log in successfully!',
                        text2: '',
                        position: 'top',
                        swipeable: true
                    });
                } catch (e){

                }
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
                        return <Icon name={'format-list-bulleted'} size={24} color={focused ? '#555' : '#aaa'} />;}}} component={ProfileScreen} />
                <Tab.Screen name="Notifications" options={{tabBarIcon: ({focused})=>{
                        return <Icon name={ focused ? 'bell' : 'bell-outline'} size={24} color={focused ? '#555' : '#aaa'} />;}}} component={ProfileScreen} />
                <Tab.Screen name="Profile" options={{tabBarIcon: ({focused})=>{
                    return <Icon name={'account'} size={24} color={focused ? '#555' : '#aaa'} />;}}} component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
            : <Authorization />}
            <Toast />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});
