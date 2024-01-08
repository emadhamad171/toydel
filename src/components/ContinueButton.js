import {Text, TouchableOpacity} from "react-native";
import {styles} from "../styles/authorization";

const ContinueButton = ({handleContinueClick}) => {
    return (<TouchableOpacity style={styles.continueButton} onPress={handleContinueClick}>
        <Text style={styles.continueButtonText}>Continue</Text>
    </TouchableOpacity>);
};
export default ContinueButton;
