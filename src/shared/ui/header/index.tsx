import {Text} from "react-native";

export const Header = ({children, mb=0}:{children: string, mb?: number}) => {

    return <Text style={{
        fontWeight: 'bold',
        marginBottom: mb,
        fontSize: 24,
        color: '#141314'
    }}>{children}</Text>
}
