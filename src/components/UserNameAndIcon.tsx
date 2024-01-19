import {useEffect, useRef, useState} from "react";
import {updateUserName} from "../firebase/firebaseAPI";
import Toast from "react-native-toast-message";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import UserIcon from "./UserIcon";
import profileStyles from "../styles/profile";

const UserNameAndIcon = ({userImage, setUserImage, userInfo, userInstance, userName, setUserName, updateImage})=>{

    const userNameInput = useRef(null);
    const [isUserNameChanged, handleUsernameChange] = useState(false);
    const [isUserNameValid, handleUserNameValid] = useState(true);
    useEffect(() => {
        handleUsernameChange(userName!==userInfo.displayName);
        handleUserNameValid(userName.length>0 && (userName.length<12 || userName.length < userInfo.displayName));
    }, [userName]);
    const handleUserNameChangeSubmit = () =>{
        if(isUserNameChanged && isUserNameValid) {
            updateUserName({user:userInstance, name: userName});
            Toast.show({type:'success', text1:'Name changed!', swipeable: true, visibilityTime:800});
            userNameInput.current.blur();
        } else {
            if(!isUserNameValid) {
                setUserName(userInfo.displayName);
                Toast.show({type:'info', text1:'Name isn`t valid!', swipeable: true, visibilityTime:800});
                return;
            }
            if(!isUserNameChanged) {
                if(userNameInput.current.isFocused()) {
                    userNameInput.current.blur();
                } else {
                    userNameInput.current.focus()
                }
            }
        }
    }

    return <View style={{flexDirection: 'row', alignItems:'center',width:'100%'}}>
        <UserIcon userImage={userImage} setUserImage={setUserImage} userInstance={userInstance} updateImage={updateImage} />
        <View style={{gap: 5, flexGrow: 1,alignItems:'center', justifyContent: 'center'}}>
            <View style={{flexDirection: 'row'}}>
                <TextInput ref={userNameInput}  onSubmitEditing={()=>{handleUserNameChangeSubmit()}} value={userName} onChangeText={(text)=>{(text.length<13 || text.length < userName.length) && setUserName(text)}} style={profileStyles.headerText} />
                <TouchableOpacity onPress={()=>{handleUserNameChangeSubmit()}}>
                    <Icon style={{padding: 0,marginLeft:5}} color={isUserNameChanged ? isUserNameValid ? '#56a10b' : '#f55' : '#5e3520'} name={isUserNameChanged ? isUserNameValid ? 'check' : 'close' :'pencil'} size={18}/>
                </TouchableOpacity>
            </View>
            <Text style={profileStyles.subText}>
                I Love ToyApp!
            </Text>
        </View>
    </View>
}

export default UserNameAndIcon;
