import {appSetConnection, normalize, useAppDispatch, wait} from "@shared";
import React, {useState} from "react";
import useTimer from "../../shared/lib/hooks/useTimer";
import * as Network from "expo-network";
import {ActivityIndicator, Text, View} from "react-native";

const NetworkProblemScreen = () => {
    const dispatch = useAppDispatch();
    const [isConnected, setConnecting] = useState(false);
    const {
        time
    } = useTimer({minutes: 0, seconds: 30, onTimerOut:()=>{
            Network.getNetworkStateAsync().then(async (status)=>{
                if(status.isConnected){
                    setConnecting(true);
                    await wait();
                    dispatch(appSetConnection(true))
                }
                console.log(status.isConnected);
            })
        }, autoRefresh:true })

    return <View
        style={{
            flex: 1,
            gap: normalize(12),
            justifyContent: "center",
            alignItems: 'center',
            backgroundColor: '#FBF7F0'
        }}>
        <Text
            style={{
                fontFamily: 'Cera-Pro-Bold',
                fontSize: normalize(24)
            }}>
            {isConnected ? "Підключення відновлене!" : "Проблема з підключенням."}

        </Text>
        <ActivityIndicator />
        <Text
            style={{
                fontFamily: 'Manrope',
                fontSize: normalize(18)
            }}>
            {!isConnected && `Наступна перевірка підключення через: ${time}`}
        </Text>
    </View>
}

export default NetworkProblemScreen;
