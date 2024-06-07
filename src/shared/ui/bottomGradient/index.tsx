import {TouchableOpacity} from "react-native";
import {windowHeight, windowWidth} from "@shared";
import {LinearGradient} from "expo-linear-gradient";
import React from "react";

export const BottomGradient = ({height = windowHeight*0.3, colors = ["rgba(255,255,255, 0)", "rgba(255,255,255, 1)"]}:{height?: number, colors?: string[]}) => {
    return <TouchableOpacity disabled style={{
        position: 'absolute',
        width: windowWidth,
        height: height,
        bottom: 0,
        zIndex: 997,
        pointerEvents: 'none'
    }}>
        <LinearGradient colors={colors} style={{flex: 1}}/>
    </TouchableOpacity>
}

export const TopGradient = ({height = windowHeight*0.3, colors = ["rgba(255,255,255, 0)", "rgba(255,255,255, 1)"]}:{height?: number, colors?: string[]}) => {
    return <TouchableOpacity disabled style={{
        position: 'absolute',
        width: windowWidth,
        height: height,
        top: 0,
        zIndex: 997,
        pointerEvents: 'none'
    }}>
        <LinearGradient colors={colors} style={{flex: 1}}/>
    </TouchableOpacity>
}
