import {SetStateAction} from "react";
import {Platform, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {Description, ExternalLink, normalize, windowWidth} from "@shared";

export const BottomText = ({setIsLogin} :{setIsLogin: React.Dispatch<SetStateAction<boolean>>}) => {

    return <View style={{position: 'absolute', left: 24, bottom: 0, gap: normalize(22), paddingBottom: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8}}>
            <Description fontSize={normalize(20)}>Вже є акаунт?</Description>
            <TouchableOpacity
                onPress={()=>{
                    setIsLogin(true);
                }} >
                <Text style={{
                    color: "#32207A",
                    textDecorationLine: 'underline',
                    fontFamily: 'Cera-Pro-Bold',
                    fontSize: normalize(20)
                }}>
                    Тицьни сюди
                </Text>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', width: windowWidth, flexWrap: 'wrap', marginLeft: -24,paddingHorizontal: 24, justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', flexWrap: 'wrap', alignItems: 'center'}}>
            <Description fontSize={normalize(16)}>Створюючи обліковий запис, ви приймаєте наші</Description>
            <ExternalLink url={"https://google.com"}>Умови та положення, </ExternalLink>
            <Description fontSize={normalize(16)}>а також ознайомлюєтеся з нашою</Description>
            <ExternalLink url={"https://google.com"}>Політикою конфіденційності.</ExternalLink>
            </Text>
        </View>
    </View>
}
