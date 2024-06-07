import {normalize, useModal} from "@shared";
import React, {useEffect} from "react";
import {BackHandler, Text, TouchableOpacity, View} from "react-native";
import EIcon from "react-native-vector-icons/Entypo";

export const DefaultModalHeader = ({text, onClickBack, textColor='#000', mb=0, onExitGoBack = false}: {text: string, mb?:number, textColor?:string, onClickBack?: ()=>void, onExitGoBack?: boolean}) => {
    const {
        closeModal,
        goBack
    } = useModal();

    useEffect(() => {
        const handler = BackHandler.addEventListener("hardwareBackPress", ()=>{
            onClickBack ? onClickBack() : onExitGoBack ? goBack() : closeModal();
            return true;
        });
        return ()=>handler.remove();
    }, []);

    return <View style={{flexDirection: 'row', justifyContent: 'center',marginBottom: mb, alignItems: 'center', position: 'relative', width: '100%', zIndex: 999}}>
        <TouchableOpacity style={{flex: 1}} onPress={onClickBack ? onClickBack : onExitGoBack ? goBack : closeModal}>
            <EIcon name={"chevron-left"} size={42} color={textColor}/>
        </TouchableOpacity>

        <View style={{flex: 3, justifyContent:'center', alignItems: 'center'}}>
            <Text style={{alignSelf: 'center', color: textColor, textAlign:'center', fontFamily: 'Cera-Pro-Bold', fontSize: normalize(28)}}>
                {text}
            </Text>
        </View>

        <View style={{flex: 1}} />
    </View>
}

