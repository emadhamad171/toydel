import {Text, TouchableOpacity} from "react-native";
import {styles} from "../styles/authorization";

const ContinueButton = ({handleContinueClick, ...props}) => {
    return (<TouchableOpacity style={props?.style ? {...styles.continueButton, ...props.style} : styles.continueButton} onPress={handleContinueClick}>
        <Text style={styles.continueButtonText}>{props?.text || "Continue"}</Text>
    </TouchableOpacity>);
};
export default ContinueButton;
