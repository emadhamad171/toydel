import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import profileStyles from "../styles/profile";
import {normalize} from "../helpers";

const UserButton = ({placeholder,chevronIcon='chevron-right',iconColor='#000', icon, iconSize=22, iconProps={}, buttonProps={}, onPressAction,iconStyle=defaultStyle.icon, buttonStyle=defaultStyle.button})=> {
    return <TouchableOpacity style={buttonStyle} onPress={onPressAction} {...buttonProps}>

    <View style={{...iconStyle}}>
    <Icon {...iconProps} style={{padding: 0, margin: 0}} color={iconColor} name={icon} size={iconSize}/>
    </View>
    <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'space-between',flexGrow:1}}>
    <Text style={profileStyles.baseText}> {placeholder} </Text>
        <Icon name={chevronIcon} size={16}/>
    </View>
    </TouchableOpacity>
}
const defaultStyle = StyleSheet.create({
    icon:{
        borderRadius: 55,
        backgroundColor: '#eee',
        alignItems: 'center',
        width:36,
        height:36,
        justifyContent: 'center'
    },
    button:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(10),
        width:'100%',
        paddingHorizontal:normalize(18),
        paddingVertical: normalize(10),
        borderRadius: 10,
        backgroundColor:'#dcdada'
    }
})
export default UserButton;
