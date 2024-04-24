import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, {useRef} from "react";
import {View, Animated, TouchableOpacity} from "react-native";
import {useAppDispatch, useAppSelector, normalize, appToggleTheme} from "@shared";

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
    const isDarkTheme = useAppSelector((state)=>state.config.isDarkTheme);
    const dispatch = useAppDispatch();
    const toggleColorTheme = () => {
        dispatch(appToggleTheme());
    }
    const theme= isDarkTheme ? themes.dark : themes.light;

    const leftPos = useRef(new Animated.Value(isDarkTheme ? 0 : normalize(70))).current;
    const handleClick = ()=> {
        toggleColorTheme();
        moveButton();
    }
    const moveButton = () =>{
        if(leftPos)
            Animated.spring(leftPos,{
                    toValue: isDarkTheme ? normalize(75) : 0,
                    useNativeDriver: false,
                }
            ).start();
    }

    return (
        <TouchableOpacity onPress={handleClick}>
            <ButtonContainer theme={theme}>
                <Animated.View style={{transform: [{ translateX: leftPos }]}}>
                    <StyledIcon theme={theme} callback={handleClick} btnSize={btnSize}/>
                </Animated.View>
            </ButtonContainer>
        </TouchableOpacity>
    );
}

export default ChangeThemeButton;
