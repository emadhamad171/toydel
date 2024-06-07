import {Text} from "react-native";
import {normalize} from "../../lib";

export const Description = ({children,mb=0, numberOfLines = undefined, color="#2D2D30", fontSize = normalize(18), lineHeight = normalize(28)}:{children: string, mb?: number, color?: string, fontSize?: number, lineHeight?: number, numberOfLines?:number}) => {
    return <Text
        numberOfLines={numberOfLines}
        ellipsizeMode={'tail'}
        style={{
            fontSize: fontSize,
            letterSpacing: 1.1,
            lineHeight: lineHeight,
            fontFamily: "Manrope",
            marginBottom: mb,
            color: color
        }}>
        {children}
    </Text>
}
