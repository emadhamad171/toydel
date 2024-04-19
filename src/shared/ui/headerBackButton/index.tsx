import {TouchableOpacity} from "react-native";
import {normalize} from "@shared";
import Icon from "react-native-vector-icons/MaterialIcons";

export const HeaderBackButton = ({onPress}:{onPress: ()=>void}) => {
    return <TouchableOpacity style={{position: 'absolute', top: normalize(72), left: 24, zIndex: 999}} onPress={onPress}>
        <Icon name={'chevron-left'} size={32}/>
    </TouchableOpacity>
}
