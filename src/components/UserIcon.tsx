import {Image, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EvilIcon from "react-native-vector-icons/FontAwesome";
import profileStyles from "../styles/profile";

const UserIcon = ({userImage, updateImage}) => {
    return <TouchableOpacity style={{flexDirection: 'row'}} onPress={updateImage}>
        {userImage ? <Image style={profileStyles.userPhoto} source={{uri: userImage}} /> : <Icon style={{alignItems:'center', justifyContent: 'center',padding:5,backgroundColor: '#aaa',borderRadius: 50}} name={'account'} size={86} />}
        <EvilIcon name={'gear'} style={{padding: 0, margin: 0, position:'absolute', right:-2,top:4}} color={"#8a7064"} size={24}/>
    </TouchableOpacity>
}
export default UserIcon;
