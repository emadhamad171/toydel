import { TextInput, View } from "react-native";
import {normalize, Description, ErrorMessageText} from "@shared";
import { useState } from "react";
import IoIcon from "react-native-vector-icons/Ionicons";
import { DetailInputProps } from "./lib/types";

export * from './lib/types';
export const DetailInput = ({placeholder, description, onChangeText, textContentType = 'none', isPassword = false, isValid = true, setIsValid, value, errorText, coloredText = false}: DetailInputProps) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    return <View style={{gap: normalize(10)}}>
        <Description fontSize={normalize(14)} color={(isValid || (!isValid && coloredText)) ? "#9BA1B1" : '#F20909'}>{description}</Description>
        <View style={{position: 'relative'}}>
            <TextInput
                value={value}
                placeholderTextColor={"#5b585b"}
                secureTextEntry={!isPasswordVisible && isPassword}
                textContentType={textContentType}
                style={{
                    borderBottomColor: isValid ? "#bdbdc4" : '#F20909',
                    borderBottomWidth: .5,
                    paddingBottom: normalize(14),
                    fontFamily: 'Manrope-Bold',
                    color: isValid ? '#232123FF' : '#F20909'
                }}
                onChangeText={(text)=>{
                    onChangeText(text);
                    if(!isValid)
                        setIsValid && setIsValid(true);
                }}
                placeholder={placeholder} />
            {
                isPassword && <IoIcon onPress={()=>setPasswordVisible((prevState)=>!prevState)} name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={24} style={{position: 'absolute', right: 14}}/>
            }
            <ErrorMessageText shown={!isValid && !!errorText} text={errorText} />
        </View>
    </View>
}
