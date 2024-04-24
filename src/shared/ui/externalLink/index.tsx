import {Linking, Text, TouchableOpacity} from "react-native";
import {normalize} from "../../lib";

export const ExternalLink = (props) => {
    const { url, children, style = {
        letterSpacing: 1.1,
        fontFamily: "Manrope",
        fontSize: normalize(16),
        lineHeight: normalize(26)
    }
    } = props;

    const onPress = () => Linking.canOpenURL(url).then(() => {
        Linking.openURL(url);
    });

    return (
        <TouchableOpacity onPress={onPress} style={{marginBottom: -2, padding: 0, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: "#32207A", fontFamily: 'Manrope', ...style}}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};
