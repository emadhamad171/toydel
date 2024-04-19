import {Text} from "react-native";

export const Description = ({children,mb=0, color="#2d2d30"}:{children: string, mb?: number, color?: string}) => {
    return <Text
        style={{
            fontSize: 14,
            fontFamily: "Manrope",
            marginBottom: mb,
            color: color
        }}>
        {children}
    </Text>
}
