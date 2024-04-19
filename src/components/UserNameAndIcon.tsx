import {useEffect, useRef, useState} from "react";
import {updateUserName} from "@shared";
import Toast from "react-native-toast-message";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import UserIcon from "./UserIcon";
import profileStyles from "../styles/profile";

const UserNameAndIcon = ({user, userName, setUserName, updateImage})=>{

    const userNameInput = useRef(null);
    const [isUserNameChanged, handleUsernameChange] = useState(false);
    const [isUserNameValid, handleUserNameValid] = useState(true);

    const isValidName = (name:string) =>(name.length<12 || name.length < user.displayName.length);

    useEffect(() => {
        handleUsernameChange(userName!==user.displayName);
        handleUserNameValid(isValidName(userName));
    }, [userName]);

    const handleUserNameChangeSubmit = () =>{
        if(isUserNameChanged && isUserNameValid && userName.length) {
            updateUserName({name: userName});
            Toast.show({type:'success', text1:'Name changed!', swipeable: true, visibilityTime:800});
            handleUsernameChange(false);
            userNameInput.current.blur();
        } else {
            if(!isUserNameValid || !userName.length) {
                setUserName(user.displayName || 'Set Name');
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
        <UserIcon userImage={user.photoURL}  updateImage={updateImage} />
        <View style={{gap: 5, flexGrow: 1,alignItems:'center', justifyContent: 'center'}}>
            <View style={{flexDirection: 'row'}}>
                <TextInput ref={userNameInput}  onSubmitEditing={()=>{handleUserNameChangeSubmit()}} value={userName} onChangeText={(text)=>{isValidName(text) && setUserName(text)}} style={profileStyles.headerText} />
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
