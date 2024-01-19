import {ReactElement, useEffect, useRef, useState} from "react";
import {updateUserName} from "../firebase/firebaseAPI";
import Toast from "react-native-toast-message";
import {ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Input from "../components/Input";
import {styles} from "../styles/authorization";
import ContinueButton from "../components/ContinueButton";
import UserNameAndIcon from "../components/UserNameAndIcon";
const HeaderText = ({text,style, ...props}:{text:string, style?:any})=>{

    return <Text style={style || {...styles.subHeaderText, marginBottom: 4}} {...props}>
        {text}
    </Text>
}
const InfoModal = ({props}) =>{
    const {userInstance, userInfo, userName, setUserName,setUserImage, userImage, updateImage} = props;
    const [userModalName, setUserModalName]=useState(userName);
    const handleModalNameChange = (name:string) =>{
        setUserModalName(name);
        setUserName(name);
    }
    return <ScrollView style={{flex: 1}}>
    <View style={{gap: 15, flex: 1,justifyContent:'center', marginTop:14}}>
    <UserNameAndIcon setUserImage={setUserImage} userImage={userImage} userInfo={userInfo} userInstance={userInstance} userName={userModalName} setUserName={handleModalNameChange} updateImage={updateImage}/>
    <View>
    <HeaderText text={"Email"} />
    <Input onChangeAction={()=>{}} placeholder={userInfo?.email || 'Nothing'} readOnly={true} style={{...styles.emailInput, backgroundColor: '#eee'}}/>
    </View>
    <View>
    <HeaderText text={"Phone Number"} />
    <Input onChangeAction={()=>{}} placeholder={userInfo?.phoneNumber || '+0-(123)-45-678-9123'} readOnly={true} style={{...styles.emailInput, backgroundColor: '#eee'}}/>
    </View>
    <View>
    <HeaderText text={"Location"} />
    <Input onChangeAction={()=>{}} placeholder={'Kiyv, st. Vasylya Stusa 35B'} readOnly={true} style={{...styles.emailInput, backgroundColor: '#eee'}}/>
    </View>
    <View>
    <HeaderText text={"Bio"} />
    <Input onChangeAction={()=>{}} placeholder={userInfo?.phoneNumber || 'Bio'} multiline={true} style={{...styles.emailInput, backgroundColor: '#eee'}}/>
    </View>
    <ContinueButton text={"Save"} style={{backgroundColor:'#7c108d',marginTop: 5}} handleContinueClick={()=>{}}/>
    </View>
    </ScrollView>
}
export default InfoModal;
