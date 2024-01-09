import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from '../styles/authorization';
const EmailInput = ({setIsPasswordSame, isEmailValid, onChangeEmail,onChangePassword,onChangeConfirmPassword,isPasswordSame, isRegister, setRegister}) => {
    return <View style={{gap: 10, width: 320}}>
        <TextInput onChangeText={onChangeEmail} style={{...styles.emailInput, borderWidth: isEmailValid ? 0 : 1}} placeholderTextColor={"#864cb4"} placeholder={'email@example.com'}/>
        <TextInput onChangeText={onChangePassword} style={{...styles.emailInput, borderWidth: isPasswordSame ? 0 : 1}} placeholderTextColor={"#864cb4"} placeholder={'password'}/>
        {isRegister && <TextInput onChangeText={onChangeConfirmPassword} style={{...styles.emailInput, borderWidth: isPasswordSame ? 0 : 1}} placeholderTextColor={"#864cb4"} placeholder={'confirm password'}/>}
        <TouchableOpacity>
            <Text style={{marginTop: -5, marginLeft: 5}} onPress={()=>{
                setRegister(!isRegister);
                setIsPasswordSame(true);
                onChangeConfirmPassword('');
            }}>
                {isRegister ? "Login" : "Register"}
            </Text>
        </TouchableOpacity>
    </View>
}

export default EmailInput;
