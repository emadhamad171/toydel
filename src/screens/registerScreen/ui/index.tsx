import {SetStateAction} from "react";
import {Platform, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {Description, ExternalLink, normalize, windowWidth} from "@shared";

export const BottomText = ({setIsLogin} :{setIsLogin: React.Dispatch<SetStateAction<boolean>>}) => {

    return <View style={{position: 'absolute', left: 24, bottom: 0, gap: normalize(22), paddingBottom: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8}}>
            <Text style={{fontFamily: 'Cera-Pro', color: '#2D2D30'}}>Вже є акаунт?</Text>
            <TouchableOpacity
                onPress={()=>{
                    setIsLogin(true);
                }} >
                <Text style={{
                    color: "#32207A",
                    textDecorationLine: 'underline',
                    fontFamily: 'Cera-Pro-Bold'
                }}>
                    Тицьни сюди
                </Text>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', width: windowWidth, flexWrap: 'wrap', marginLeft: -24, justifyContent: 'center'}}>
            <Description>Створюючи обліковий запис, ви приймаєте наші</Description>
            <ExternalLink url={"https://google.com"}>Умови та положення, </ExternalLink>
            <Description>а також ознайомлюєтеся з нашою</Description>
            <ExternalLink url={"https://google.com"}>Політикою конфіденційності.</ExternalLink>
        </View>
    </View>
}
