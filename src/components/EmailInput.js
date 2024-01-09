import {Text, TextInput, TouchableOpacity, View} from "react-native";

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
    </View>
}

export default EmailInput;
