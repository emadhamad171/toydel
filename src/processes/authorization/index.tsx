import {useState} from "react";
import {
    SafeAreaView,
    Platform,
    StatusBar,
} from "react-native";
import RegisterFlow from "../registration";
import LoginScreen from "../../screens/loginScreen";
import LoginOnboardingScreen from "../../screens/loginOnboarding";
import {HeaderBackButton} from "../../shared/ui/headerBackButton";

const AuthorizationFlow = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isOnboarding, setIsOnboarding] = useState(true);

    if(isOnboarding)
        return <LoginOnboardingScreen setIsOnboarding={setIsOnboarding} setIsLogin={setIsLogin} />

    return <SafeAreaView
        style={{
            flex: 1,
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 ,
            backgroundColor: '#fff'
        }}>
            <HeaderBackButton onPress={()=>setIsOnboarding(()=>true)}/>
            {
                isLogin ? <LoginScreen setIsLogin={setIsLogin}/>
                    : <RegisterFlow setIsLogin={setIsLogin}/>
            }
        </SafeAreaView>;
}

export default AuthorizationFlow;
