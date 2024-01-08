import {TextInput, View} from "react-native";
import PhoneInput from "react-native-phone-number-input";

import {styles} from '../styles/authorization';
import ContinueButton from "./ContinueButton";

const PhoneNumberInput = ({phoneInput,setFormattedValue,setValue,value, handleContinueClick}) => {
    return (<View style={{gap: 10,width:330, alignItems: 'center', justifyContent:'center'}}>
        <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode={"UA"}
            layout={"first"}
            containerStyle={{height: 70, padding: 0, borderRadius: 20, backgroundColor: '#b593d9'}}
            textContainerStyle={{height: 70, borderRadius: 20, padding: 0, backgroundColor: '#c9aaff', alignItems: 'center', alignContent: 'center'}}
            codeTextStyle={{padding: 0}}
            textInputStyle={{
                padding:0,
                color: '#0d0117'
            }}
            onChangeText={(text) => {
                setValue(text);
            }}
            onChangeFormattedText={(text) => {
                setFormattedValue(text);
            }}
            textInputProps={{ placeholderTextColor: '#864cb4', }}
        />
        <ContinueButton handleContinueClick={handleContinueClick} />
    </View>);
}

export default PhoneNumberInput;
