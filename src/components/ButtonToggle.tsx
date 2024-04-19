import {Animated, StyleSheet, TouchableOpacity, View} from "react-native";
import React, {useRef, useState} from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {normalize} from "@shared";

const StyledIcon = ({iconName, iconColor, btnSize} :{iconName: string, iconColor:string, btnSize: number}) =>{
    return  <Icon name={iconName} size={normalize(btnSize)} color={iconColor}/>
}
const moveButton = (leftPos : Animated.Value, previousState : boolean) =>{
    if(leftPos)
        Animated.spring(leftPos,{
                toValue: previousState ? 0 : normalize(70),
                useNativeDriver: false,
            }
        ).start();
}

const ButtonToggle = ({callback,initialState, iconOnName, iconOffName, btnSize=50}) => {
    const [isTurnedOn, setTurnedOn] = useState(initialState);
    const leftPos = useRef(new Animated.Value(isTurnedOn ? normalize(70) : 0)).current;

    const handleClick = ()=> {
        callback();
        moveButton(leftPos,isTurnedOn);
        setTurnedOn((prev:boolean)=>!prev);
    }

    return (
        <TouchableOpacity onPress={handleClick}>
            <View style={isTurnedOn ? styles.buttonContainer_light : styles.buttonContainer_dark}>
                <Animated.View style={{transform: [{ translateX: leftPos }]}}>
                    <StyledIcon iconName={isTurnedOn ? iconOnName : iconOffName} iconColor={isTurnedOn ? '#f1c779' :'#7669b0'} btnSize={normalize(btnSize)}/>
                </Animated.View>
            </View>
        </TouchableOpacity>
    );
}

const base_styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 25,
        borderStyle: "solid",
        borderWidth: 2,
        marginLeft: -25,
        flexDirection: "row",
        width: normalize(144),
        paddingVertical: 5,
        paddingHorizontal: 10,
        position: "relative"
    }
});

const styles = StyleSheet.create({
    buttonContainer_dark: {
        ...base_styles.buttonContainer,
        borderColor: '#aaf',
    },
    buttonContainer_light: {
        ...base_styles.buttonContainer,
        borderColor: '#adf',
    },

})
export default ButtonToggle;
