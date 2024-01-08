import {TextInput} from "react-native";

const OTPCodeInput = ({setCode, code}) => {
    return <TextInput onChangeText={(text)=>{setCode(text);}} value={code} keyboardType={'number-pad'} />

}
