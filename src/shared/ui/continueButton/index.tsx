import {Text, TouchableOpacity} from "react-native";
import {normalize} from "../../lib";
import {LinearGradient} from "expo-linear-gradient";

export const ContinueButton = ({isValid = true, children, onPress, mv = 0}: {isValid?: boolean, children: string, onPress: ()=>void, mv?: number | "auto"}) => {
    return <LinearGradient colors={isValid ? ["#8B78FF", "#5451D6"] : ['#bebada','#9a93c4']}>
        <TouchableOpacity
        style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: normalize(21),
            marginVertical: mv
        }}
        activeOpacity={isValid ? .5 : 1}
        onPress={isValid ? onPress : void 0}>
        <Text style={{
            textTransform: 'uppercase',
            fontFamily: 'Cera-Pro-Black',
            letterSpacing: .3,
            fontSize: 14,
            color: '#FBF7F0'
        }}>{children}</Text>
    </TouchableOpacity>
    </LinearGradient>
}
