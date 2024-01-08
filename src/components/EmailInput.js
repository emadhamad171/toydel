import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from '../styles/authorization';
import ContinueButton from "./ContinueButton";
const EmailInput = ({isRegister, setRegister, handleContinueClick}) => {
    return <View style={{gap: 10, width: 320}}>
        <TextInput style={{backgroundColor: '#b593d9',color:'#0d0117', borderRadius: 10,width: '100%', padding: 10}} placeholderTextColor={"#864cb4"} placeholder={'email@example.com'}/>
        <TextInput style={{backgroundColor: '#b593d9', color:'#0d0117', borderRadius: 10,width: '100%', padding: 10}} placeholderTextColor={"#864cb4"} placeholder={'password'}/>
        {isRegister && <TextInput style={{backgroundColor: '#b593d9', color:'#0d0117', borderRadius: 10,width: '100%', padding: 10}} placeholderTextColor={"#864cb4"} placeholder={'confirm password'}/>}
        <TouchableOpacity>
            <Text style={{marginTop: -5, marginLeft: 5}} onPress={()=>{setRegister(!isRegister)}}>
                {isRegister ? "Login" : "Register"}
            </Text>
        </TouchableOpacity>
        <ContinueButton handleContinueClick={handleContinueClick} />
    </View>
}

export default EmailInput;
