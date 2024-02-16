import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {View, Animated, Text, Platform, TouchableOpacity, useColorScheme} from "react-native";
import {normalize} from "../helpers";

const ButtonContainer =({children, theme})=> <View style={{
    borderRadius: 25,
    borderColor: theme.button.border,
    borderStyle: "solid",
    borderWidth: 2,
    marginLeft: -25,
    flexDirection: "row",
    width: 124,
    paddingVertical: 5,
    paddingHorizontal: 10,
    position: "relative"
}}>{children}</View>
const StyledIcon = ({theme, callback, btnSize} :{theme: any, callback: ()=>void, btnSize: number}) =>{
    return  <Icon name={theme.buttonIcon.iconName} size={normalize(btnSize)} color={theme.buttonIcon.color}/>
}
ButtonContainer.defaultProps ={
    theme: {
        button: {
            border: '#aaf'
        }
    }
};
const themes = {
    dark:{
        button: {
            border: '#aaf'
        },
        buttonIcon: {
            color: '#7669b0',
            bgColor: "#5e554e",
            iconName: "moon-waxing-crescent"
        }
    },
    light:{
        button: {
            border: '#adf'
        },
        buttonIcon: {
            color: '#f1c779',
            bgColor: "#EBD4AB",
            iconName: 'white-balance-sunny'
        }
    }
};
const ChangeThemeButton = ({btnSize = 40}) => {
    const [isDarkTheme, setTheme]= useState(useColorScheme() === 'dark');
    const theme= isDarkTheme ? themes.dark : themes.light;

    const leftPos = useRef(new Animated.Value(isDarkTheme ? 0 : normalize(70))).current;
    const handleClick = ()=> {
        setTheme(prevState => !prevState);
        moveButton();
    }
    const moveButton = () =>{
        if(leftPos)
            Animated.spring(leftPos,{
                    toValue: isDarkTheme ? 0 : normalize(75),
                    useNativeDriver: false,
                }
            ).start();
    }

    return (
        <TouchableOpacity onPress={handleClick}>
            <ButtonContainer theme={theme}>
                <Animated.View style={{transform: [{ translateX: leftPos }]}}>
                    <StyledIcon theme={theme} callback={handleClick} btnSize={40}/>
                </Animated.View>
            </ButtonContainer>
        </TouchableOpacity>
    );
}

export default ChangeThemeButton;
