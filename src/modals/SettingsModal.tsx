import {View, SafeAreaView,Text} from "react-native";
import ButtonToggle from "../components/ButtonToggle";
import {normalize, registerIndieID, unregisterIndieDevice, getCurrentUser, toggleNotificationsStatus, toggleTheme,useAppDispatch, useAppSelector} from "@shared";
import {notificationAppId, notificationAppToken} from "react-native-dotenv";



const SettingsModal = () => {
    const isDarkMode = useAppSelector((state)=>state.config.isDarkTheme);
    const isNotificationOff = useAppSelector((state)=>state.config.notificationOff);
    const dispatch = useAppDispatch();
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
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: normalize(24), paddingVertical: normalize(32)}}>
            <View style={{width: '100%', gap: normalize(24)}}>
            <View style={{flexDirection:'row', alignItems:'center',justifyContent: 'space-between', width:'100%'}}>
                <Text style={{fontSize: normalize(32)}}>
                    Notifications
                </Text>
                <ButtonToggle initialState={!isNotificationOff} iconOffName={'bell-cancel-outline'} iconOnName={'bell-outline'} callback={toggleNotifications} />
            </View>
            <View style={{flexDirection:'row', alignItems:'center',justifyContent: 'space-between', width:'100%'}}>
                <Text style={{fontSize: normalize(32)}}>
                    Geolocation
                </Text>
                <ButtonToggle initialState={!isNotificationOff} iconOffName={'window-close'} iconOnName={'check'} callback={toggleNotifications} />
            </View>
            <View style={{flexDirection:'row', alignItems:'center',justifyContent: 'space-between', width:'100%'}}>
                <Text style={{fontSize: normalize(32)}}>
                    Save Data
                </Text>
                <ButtonToggle initialState={!isNotificationOff} iconOffName={'window-close'} iconOnName={'check'} callback={toggleNotifications} />
            </View>
            </View>
        <ButtonToggle initialState={!isDarkMode} iconOnName={'white-balance-sunny'} iconOffName={'moon-waxing-crescent'} callback={onChangeTheme}/>
        </SafeAreaView>
    </View>
}
export default SettingsModal;



