import {Text} from "react-native";
import {normalize} from "../../lib";

export const Header = ({children, mb=0,ml=0, color="#141314", fontSize=normalize(42), lineHeight=normalize(56), fontFamily='Cera-Pro-Bold'}:{fontSize?: number, lineHeight?: number, children: string, mb?: number,ml?: number, color?: string, fontFamily?: string}) => {

    return <Text style={{
        fontFamily: fontFamily,
        marginBottom: mb,
        marginLeft: ml,
        lineHeight: lineHeight,
        fontSize: fontSize,
        color: color
    }}>{children}</Text>
}
