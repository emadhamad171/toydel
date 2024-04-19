import {Text, TouchableOpacity} from "react-native";

export const ContinueButton = ({children, onPress, mv = 0, color='#FBF7F0'}: {children: string, onPress: ()=>void, mv?: number | "auto", color?: string}) => {
    return <TouchableOpacity
        style={{
            backgroundColor: '#7065EB',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 16,
            marginVertical: mv
        }}
        onPress={onPress}>
        <Text style={{
            textTransform: 'uppercase',
            fontFamily: 'Cera-Pro-Black',
            letterSpacing: .3,
            fontSize: 14,
            color: '#FBF7F0'
        }}>{children}</Text>
    </TouchableOpacity>
}
