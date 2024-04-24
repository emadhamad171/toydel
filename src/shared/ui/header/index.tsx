import {Text} from "react-native";
import {normalize} from "../../lib";

export const Header = ({children, mb=0, color="#141314"}:{children: string, mb?: number, color?: string}) => {

    return <Text style={{
        fontFamily: 'Cera-Pro-Bold',
        marginBottom: mb,
        lineHeight: normalize(56),
        fontSize: normalize(42),
        color: color
    }}>{children}</Text>
}
