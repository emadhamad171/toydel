import {ReactElement, useEffect, useRef, useState} from "react";
import {updateUserField, updateUserName} from "../firebase/firebaseAPI";
import Toast from "react-native-toast-message";
import {ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Input from "../components/Input";
import {styles} from "../styles/authorization";
import ContinueButton from "../components/ContinueButton";
import UserNameAndIcon from "../components/UserNameAndIcon";

import LocationInput from "../components/LocationInput";
import {normalize} from "../helpers";

const HeaderText = ({text,style, ...props}:{text:string, style?:any})=>{

    return <Text style={style || {...styles.subHeaderText, marginBottom: 4}} {...props}>
        {text}
    </Text>
}
const InfoModal = ({props}) =>{
    const {userName, setUserName, user, updateImage} = props;
    const [userModalName, setUserModalName]=useState(userName);
    const [userBio, setUserBio] = useState(user.bio);
    const [location, setLocation] = useState(user?.location);
    const handleModalNameChange = (name:string) =>{
        setUserModalName(name);
        setUserName(name);
    }
    return <>
    <ScrollView style={{flex: 1}} keyboardShouldPersistTaps={'handled'}>
    <View style={{gap: 15, flex: 1,justifyContent:'center', marginTop:14,paddingHorizontal: 12}}>

        <UserNameAndIcon user={user} userName={userModalName} setUserName={handleModalNameChange} updateImage={updateImage}/>

        <View>
            <HeaderText text={"Location"} />
            <LocationInput placeholder={location?.formatted_address || location?.description || 'Set location'} setLocation={setLocation} />
        </View>

        <View>
    <HeaderText text={"Email"} />
    <Input onChangeAction={()=>{}} placeholder={user?.email || 'Nothing'} readOnly={true} style={{...styles.emailInput, backgroundColor: '#eee'}}/>
    </View>

    <View>
    <HeaderText text={"Phone Number"} />
    <Input onChangeAction={()=>{}} placeholder={user?.phoneNumber || '+380 12 34 567 89'} readOnly={true} style={{...styles.emailInput, backgroundColor: '#eee'}}/>
    </View>

    <View>
    <HeaderText text={"Bio"} />
    <Input onChangeAction={(text:string)=>{setUserBio(text)}} placeholder={user?.bio || 'Bio'} multiline={true} style={{...styles.emailInput, backgroundColor: '#eee', paddingBottom: normalize(32), paddingTop: normalize(12)}}/>
    </View>

    <ContinueButton text={"Save"} style={{backgroundColor:'#7c108d',marginTop: 5}} handleContinueClick={()=>{
        if(!!!user?.bio || (user?.bio !== userBio)) {
            updateUserField({updatedField: {bio: userBio}, userID: user.id});
        }
        if(!!!user?.location?.description || (user.location.bio !== location.description)) {
            updateUserField({updatedField: {location}, userID: user.id});
        }
    }}/>

    </View>
    </ScrollView></>
}
export default InfoModal;
