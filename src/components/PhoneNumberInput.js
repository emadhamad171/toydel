import {View} from "react-native";
import PhoneInput from "../shared/ui/phoneNumberInput/lib/index";
const PhoneNumberInput = ({phoneNumberIsValid, phoneInput,setFormattedValue,setValue,value}) => {
    return (<View style={{width: 330, alignItems: 'center', justifyContent:'center'}}>
        <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="UA"
            layout="second"
            onChangeText={(text) => {
                setValue(text);
            }}
            onChangeFormattedText={(text) => {
                setFormattedValue(text);
            }}
            textInputProps={{ placeholderTextColor: '#999', }}
        />
    </View>);
}

export default PhoneNumberInput;
