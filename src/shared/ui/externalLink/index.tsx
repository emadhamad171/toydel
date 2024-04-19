import {Linking, Text, TouchableOpacity} from "react-native";

export const ExternalLink = (props) => {
    const { url, children, style = {}  } = props;

    const onPress = () => Linking.canOpenURL(url).then(() => {
        Linking.openURL(url);
    });

    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[{color: "#32207A", fontFamily: 'Manrope'}, style]}>{children}</Text>
        </TouchableOpacity>
    );
};
