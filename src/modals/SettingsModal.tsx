import {View, SafeAreaView,Text} from "react-native";
import ButtonToggle from "../components/ButtonToggle";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {toggleNotificationsStatus, toggleTheme} from "../store/slices/configSlice";
import {normalize} from "../helpers";
import {registerIndieID, unregisterIndieDevice} from "../notifications";
import {getCurrentUser} from "../firebase/firebaseAPI";
import {notificationAppId, notificationAppToken} from "react-native-dotenv";



const SettingsModal = () => {
    const isDarkMode = useSelector((state:RootState)=>state.config.isDarkTheme);
    const isNotificationOff = useSelector((state:RootState)=>state.config.notificationOff);
    const dispatch = useDispatch();
    const onChangeTheme = () => {
        dispatch(toggleTheme());
    }
    const toggleNotifications = async () =>{
        try {
            if (isNotificationOff) {
                await unregisterIndieDevice(getCurrentUser(), notificationAppId, notificationAppToken);
            } else {
                await registerIndieID(getCurrentUser(), notificationAppId, notificationAppToken);
            }
        } catch(e){
            console.log(e);
        }
        dispatch(toggleNotificationsStatus());
    }
    return <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10}}>
            <View style={{flexDirection:'row', alignItems:'center',justifyContent: 'space-between', width:'100%'}}>
                <Text style={{fontSize: normalize(32)}}>
                    Notifications
                </Text>
                <ButtonToggle initialState={!isNotificationOff} iconOffName={'bell-cancel-outline'} iconOnName={'bell-outline'} callback={toggleNotifications} />
            </View>
        <ButtonToggle initialState={!isDarkMode} iconOnName={'white-balance-sunny'} iconOffName={'moon-waxing-crescent'} callback={onChangeTheme}/>
        </SafeAreaView>
    </View>
}
export default SettingsModal;
