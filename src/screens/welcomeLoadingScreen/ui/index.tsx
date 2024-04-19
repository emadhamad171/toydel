import {MotiView} from "moti";
import {Image, Text} from "react-native";
import {useEffect} from "react";
import {wait} from "@shared";

export const WelcomeLoading = ({closeLoading}:{closeLoading: ()=>void}) =>{
    useEffect(() => {
        wait(2600).then(closeLoading);
    }, []);
    return <MotiView
        from={{
            scale: 5,
        }}
        animate={{
            scale: 1,
        }}
        transition={{
            type: 'timing',
            duration: 2500
        }}
        style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#7664e7'
        }}
        >
        <MotiView
            from={{
                opacity: 0,
                scale: 0
            }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            transition={{
                type: 'timing',
                duration: 2500
            }}
            style={{
                zIndex: 55,
            }}
        >
            <Text style={{
                zIndex: 99,
                color: '#fff',
                fontFamily: "Shantell-Sans",
                fontSize: 48
            }}>TOYBOX</Text>
        </MotiView>

        <Image source={require('../../../../assets/splash-clear.png')} style={{
            position: 'absolute',
            width: '100%',
            height: '100%'
        }} />
    </MotiView>
}
