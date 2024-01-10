import {TextInput} from "react-native";

const Input = ({onChangeAction, style, placeholder='', placeholderTextColor = '#000', ...props}) => {
    return <TextInput onChangeText={onChangeAction} style={style} placeholderTextColor={placeholderTextColor} placeholder={placeholder} {...props}/>;

}
export default Input;
