import {GradientText} from "@shared";
import {TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import React from "react";

export const CustomTabLabel = (props) => (
    <GradientText
        text={props.name}
        fontSize={12}
        isGradientFill
        {...props}
        gradientColors={
            props.focused
                ? ["#8B78FF", "#5451D6"]
                : ["rgba(0,0,0,0.5)", "rgba(0,0,0,0.5)"]
        }
    />
);
export const CustomTabButton = (props) => (
    <TouchableOpacity {...props}>
        <View>
            <LinearGradient
                colors={["#a091ff", "#5451D6"]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
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

export * from "./TabBarIcons";
