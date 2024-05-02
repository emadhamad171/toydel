import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {Cart, Notifications} from "../../screens";
import Profile from '../../screens/profile/index'
import Icon from "react-native-vector-icons/AntDesign";
import SetupDetails from "../../screens/setupDetails";
import {useAppSelector, screenOptions, normalize} from "@shared";
import {Text, View} from "react-native";
import MainScreen from "../../screens/main";
const Tab = createBottomTabNavigator();

const TabBarIcon = ({name, focused, placeholder}) => {
    return <View style={{paddingVertical: normalize(12), gap: normalize(8), alignItems: 'center', justifyContent: 'center'}}>
        <View style={{borderRadius: 30,backgroundColor: focused ? '#5753D8' : '#fff', alignItems: 'center', justifyContent: 'center'}}>
            <Icon name={name} size={24} style={{paddingVertical: 5, paddingHorizontal: 14, borderRadius: 30}} color={focused ? "#fff" : "#5753D8"} />
        </View>
        <Text style={{color: "#5753D8", fontFamily: focused ? 'Manrope-Bold' : 'Manrope'}}>
            {placeholder}
        </Text>
    </View>
}

export function Application() {
    const user = useAppSelector((state)=>state.user.user);


    return <NavigationContainer>
            <Tab.Navigator initialRouteName={user.isOnboarded ? 'Profile' : 'Onboarding'} screenOptions={screenOptions}>
                {!user.isOnboarded && <Tab.Screen name={'Onboarding'} options={{tabBarStyle: {display:'none'}}} component={SetupDetails}/>}
                <Tab.Screen name="Home" options={{tabBarIcon: ({focused})=>{
                        return <TabBarIcon placeholder={"Головна"} name="home" focused={focused} />;}}} component={MainScreen} />
                <Tab.Screen name="Cart" options={{tabBarIcon: ({focused})=>{
                        return <TabBarIcon placeholder={"Каталог"} name={'appstore-o'} focused={focused}/>;}}} component={Cart} />
                <Tab.Screen name="Notifications" options={{tabBarIcon: ({focused})=>{
                        return <TabBarIcon placeholder={"Обране"} name={'hearto'} focused={focused} />;}}} component={Notifications} />
                <Tab.Screen name="Profile" options={{tabBarIcon: ({focused})=>{
                        return <TabBarIcon placeholder={"Профіль"} name={'user'} focused={focused} />;}}} component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>
}
