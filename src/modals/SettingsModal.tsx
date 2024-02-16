import {View, SafeAreaView} from "react-native";
import {ChangeThemeButton} from "../components";



const SettingsModal = () => {

    return <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
        <ChangeThemeButton btnSize={40} />
        </SafeAreaView>
    </View>
}
export default SettingsModal;
