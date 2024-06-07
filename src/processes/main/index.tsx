import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Cart, Notifications } from "../../screens";
import Profile from "../../screens/profile/index";
import SetupDetails from "../../screens/setupDetails";
import { useAppSelector, screenOptions } from "@shared";
import MainScreen from "../../screens/main";
import {
  HomeIcon,
  CatalogIcon,
  FavouriteIcon,
  ProfileIcon,
  TabBarLabel,
} from "./ui/TabBarIcons";
import { TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Tab = createBottomTabNavigator();

const CustomTabButton = (props) => (
  <TouchableOpacity {...props}>
    <View>
      <LinearGradient
        colors={["#a091ff", "#5451D6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: 64,
          height: props.accessibilityState.selected ? 2 : 0,
          alignSelf: "center",
          marginBottom: 6,
        }}
      />
      {props.children}
    </View>
  </TouchableOpacity>
);
export function Application() {
  const user = useAppSelector((state) => state.user.user);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={user.isOnboarded ? "Profile" : "Onboarding"}
        screenOptions={screenOptions}
      >
        {!user.isOnboarded && (
          <Tab.Screen
            name={"Onboarding"}
            options={{ tabBarStyle: { display: "none" } }}
            component={SetupDetails}
          />
        )}
        <Tab.Screen
          name="Home"
          options={{
            tabBarButton: CustomTabButton,
            tabBarLabel: (props) => (
              <TabBarLabel isActive={props.focused} {...props} text={"Home"} />
            ),
            tabBarIcon: (props) => (
              <HomeIcon isActive={props.focused} {...props} />
            ),
          }}
          component={MainScreen}
        />
        <Tab.Screen
          name="Catalog"
          options={{
            tabBarLabel: "Каталог",
            tabBarButton: CustomTabButton,
            tabBarIcon: (props) => (
              <CatalogIcon isActive={props.focused} {...props} />
            ),
          }}
          component={Cart}
        />
        <Tab.Screen
          name="Favourite"
          options={{
            tabBarLabel: "Обране",
            tabBarButton: CustomTabButton,
            tabBarIcon: (props) => (
              <FavouriteIcon isActive={props.focused} {...props} />
            ),
          }}
          component={Notifications}
        />
        <Tab.Screen
          name="Profile"
          options={{
            tabBarLabel: "Профіль",
            tabBarButton: CustomTabButton,
            tabBarIcon: (props) => (
              <ProfileIcon isActive={props.focused} {...props} />
            ),
          }}
          component={Profile}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
