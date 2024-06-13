import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {Cart, Notifications} from "../../screens";
import Profile from "../../screens/profile/index";
import SetupDetails from "../../screens/setupDetails";
import {useAppSelector, screenOptions} from "@shared";
import MainScreen from "../../screens/main";
import {
    HomeIcon,
    CatalogIcon,
    FavouriteIcon,
    ProfileIcon,
    CustomTabLabel,
    CustomTabButton,
} from "./ui";

const Tab = createBottomTabNavigator();

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
                        options={{tabBarStyle: {display: "none"}}}
                        component={SetupDetails}
                    />
                )}
                <Tab.Screen
                    name="Home"
                    options={{
                        tabBarButton: CustomTabButton,
                        tabBarLabel: (props) => <CustomTabLabel name={"Home"} {...props} />,
                        tabBarIcon: (props) => (
                            <HomeIcon isActive={props.focused} {...props} />
                        ),
                    }}
                    component={MainScreen}
                />
                <Tab.Screen
                    name="Catalog"
                    options={{
                        tabBarLabel: (props) => (
                            <CustomTabLabel name={"Каталог"} {...props} />
                        ),
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
                        tabBarLabel: (props) => (
                            <CustomTabLabel name={"Обране"} {...props} />
                        ),
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
                        tabBarLabel: (props) => (
                            <CustomTabLabel name={"Профіль"} {...props} />
                        ),
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
