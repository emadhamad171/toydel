import { TextInput, View } from "react-native";
import { normalize, Description } from "@shared";
import { useState } from "react";
import IoIcon from "react-native-vector-icons/Ionicons";
import { DetailInputProps } from "./lib/types";

export * from './lib/types';
export const DetailInput = ({placeholder, description, onChangeText, textContentType = 'none', isPassword = false, isValid = true, setIsValid, value, errorText}: DetailInputProps) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    return <View style={{gap: normalize(10)}}>
        <Description color={"#9BA1B1"}>{description}</Description>
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
                        setIsValid(true);
                }}
                placeholder={placeholder} />
            {
                isPassword && <IoIcon onPress={()=>setPasswordVisible((prevState)=>!prevState)} name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={24} style={{position: 'absolute', right: 14}}/>
            }
            {
                !isValid && !!errorText && <Description color={"#F20909"}>
                    {errorText}
                </Description>
            }
        </View>
    </View>
}
