import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {Cart, Home, Notifications, Profile} from "../../screens";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SetupDetails from "../../screens/setupDetails";
import { useAppSelector, screenOptions } from "@shared";

const Tab = createBottomTabNavigator();

export function Application() {
    const user = useAppSelector((state)=>state.user.user);


    return <NavigationContainer>
            <Tab.Navigator initialRouteName={user.isOnboarded ? 'Profile' : 'Onboarding'} screenOptions={screenOptions}>
                {!user.isOnboarded && <Tab.Screen name={'Onboarding'} options={{tabBarStyle: {display:'none'}}} component={SetupDetails}/>}
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
}
