import {ActivityIndicator, Animated, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import Toast from 'react-native-toast-message';
import {
    hideLoading,
    hideAuthScreen,
    showAuth,
    showLoading
} from './Animations';

import EmailInput from "../components/EmailInput";
import PhoneNumberInput from "../components/PhoneNumberInput";
import {styles} from '../styles/authorization';
const GoogleButton = () => {
    return (<TouchableOpacity style={styles.otherWayButton}>
        <Icon name={"google"} size={28} style={{marginLeft: 10, position:'absolute', left: 10, top: 6.5}}/>
        <Text style={{alignSelf: 'center', fontWeight: '600', fontSize: 16}}>
            Google
        </Text>
    </TouchableOpacity>);
}
const OtherLoginWayButton = ({loginType,setLoginType}) => {
    return (<TouchableOpacity style={styles.otherWayButton} onPress={()=>{setLoginType(loginType!=='email' ? "email" : 'phone');}}>
        <Icon name={loginType!=='email' ? "gmail" : 'phone'} size={28} style={{marginLeft: 10, position:'absolute', left: 10, top: 6.5}}/>
        <Text style={{alignSelf: 'center', fontWeight: '600', fontSize: 16}}>
            {loginType!=='email' ? "Email" : "Phone"}
        </Text>
    </TouchableOpacity>);
}
const FooterText = () => {
    return (<Text style={styles.footerText}>
        By continuing, you automatically accept our Terms & Conditions, Privacy Policy adn Cookies policy.
    </Text>);
}
const LineSectionDivider = () => {
    return (<View style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 15}}>
        <LineView width={130} color={'#d0d3da'} />
        <Text style={{alignSelf:'center', textAlign: 'center',textAlignVertical:'center',fontSize: 16}}>or with</Text>
        <LineView width={130} color={'#d0d3da'} />
    </View>);
}
const LogoSection = ({isLoading, marginTop}) => {
    return (<Animated.View style={{...styles.logoContainer, marginVertical: marginTop}}>
        <View style={styles.logoTextContainer}>
            {isLoading.current  && <ActivityIndicator style={{zIndex:2, position:'absolute', left: -50}} size={260} color={"#864cb4"} />}
            <Text style={styles.logoText}>ToyDel </Text>
            <Icon name={"teddy-bear"} style={styles.logoIcon} size={52}/>
        </View>
    </Animated.View>);
}
const AuthScreen = () => {
    // const {isDarkTheme} = useContext(ThemeContext);
    const topPos = useRef(new Animated.Value(650)).current;
    const posBody = useRef(new Animated.Value(0)).current;
    const marginTop = useRef(new Animated.Value(270)).current;
    const phoneInput = useRef(null);
    const [formattedValue, setFormattedValue] = useState("");
    const [value, setValue] = useState("");
    const isLoading = useRef(false);
    const [isRegister, setRegister] = useState(false);
    const [loginType, setLoginType] = useState('phone');
    const [confirmMobile, setConfirmMobile] = useState(null);

    //OTP Verification

    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    const [isCodeSend, setCodeStatus] = useState(false);

    const handleContinueOTPClick = () => {
        // isCodeSend ? confirmCode({verificationId,code, setCode}) : showLoading({topPos,marginTop, afterAnimate: async ()=> {
        //         await authOTPAction({formattedValue,recaptchaVerifier, setVerificationId, setFormattedValue});
        //         hideLoading({topPos, marginTop});
        //         setCodeStatus(true);
        //     }
        // });
    }

    const handleContinueEmailClick = () => {

    }

    useEffect(() => {
        showAuth({topPos,marginTop});
    }, [[]]);

    return (
        <Animated.View style={{...styles.body, transform: [{ translateX: posBody}]}}>

            <LogoSection isLoading={isLoading} marginTop={marginTop} />

            <Animated.View style={{...styles.authContainer, transform: [{ translateY: topPos }]}} >
                <Text style={styles.headerText}>Welcome</Text>
                <Text style={styles.subHeaderText}>Let's {isRegister ? 'start' : 'continue'} with your {loginType==='email' ? 'email' : "phone number"}</Text>

                {loginType==='phone' && <PhoneNumberInput phoneInput={phoneInput} setFormattedValue={setFormattedValue} setValue={setValue} value={value} handleContinueClick={handleContinueOTPClick} />}

                {loginType === 'email' && <EmailInput handleContinueClick={handleContinueEmailClick} isRegister={isRegister} setRegister={setRegister}/>}

                <LineSectionDivider />

                <GoogleButton />

                <View style={{alignItems: 'center', justifyContent: 'space-between',flexGrow:1}}>
                    <OtherLoginWayButton loginType={loginType} setLoginType={setLoginType} />
                    <FooterText />
                </View>
            </Animated.View>
        </Animated.View>);
}


const LineView = ({width, color='#000'}) => {
    return <View style={{height: 1, width: width, backgroundColor: color,marginTop: 2}}></View>
}

export default AuthScreen;
