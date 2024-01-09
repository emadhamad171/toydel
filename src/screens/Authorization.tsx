import {ActivityIndicator, Animated, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import Toast from 'react-native-toast-message';
import {isValidNumber} from "react-native-phone-number-input";
import 'react-native-webview';

import {
    hideLoading,
    hideAuthScreen,
    showAuth,
    showLoading
} from './Animations';

import EmailInput from "../components/EmailInput";
import PhoneNumberInput from "../components/PhoneNumberInput";
import {styles} from '../styles/authorization';
import {useFirebaseLogin as useFirebaseOTPLogin} from "@itzsunny/firebase-login";
import {auth, firebaseConfig} from "../firebase";
import * as firebase_auth from "firebase/auth";
import ContinueButton from "../components/ContinueButton";

const GoogleButton = () => {
    return (
        <TouchableOpacity style={styles.otherWayButton}>
            <Icon name={"google"} size={28} style={{marginLeft: 10, position: 'absolute', left: 10, top: 6.5}}/>
            <Text style={{alignSelf: 'center', fontWeight: '600', fontSize: 16}}>
                Google
            </Text>
        </TouchableOpacity>
    );
}
const OtherLoginWayButton = ({loginType, setLoginType}) => {
    return (
        <TouchableOpacity style={styles.otherWayButton} onPress={() => {
            setLoginType(loginType !== 'email' ? "email" : 'phone');
        }}>
            <Icon name={loginType !== 'email' ? "gmail" : 'phone'} size={28}
                  style={{marginLeft: 10, position: 'absolute', left: 10, top: 6.5}}/>
            <Text style={{alignSelf: 'center', fontWeight: '600', fontSize: 16}}>
                {loginType !== 'email' ? "Email" : "Phone"}
            </Text>
        </TouchableOpacity>
    );
}
const FooterText = () => {
    return (
        <Text style={styles.footerText}>
            By continuing, you automatically accept our Terms & Conditions, Privacy Policy adn Cookies policy.
        </Text>
    );
}
const LineSectionDivider = () => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 15}}>
            <LineView width={130} color={'#d0d3da'}/>
            <Text style={{alignSelf: 'center', textAlign: 'center', textAlignVertical: 'center', fontSize: 16}}>or
                with</Text>
            <LineView width={130} color={'#d0d3da'}/>
        </View>
    );
}
const LogoSection = ({isLoading, marginTop}) => {
    return (
        <Animated.View style={{...styles.logoContainer, marginVertical: marginTop}}>
            <View style={styles.logoTextContainer}>
                {isLoading.current &&
                    <ActivityIndicator style={{zIndex: 2, position: 'absolute', left: -50}} size={260}
                                       color={"#864cb4"}/>}
                <Text style={styles.logoText}>ToyDel </Text>
                <Icon name={"teddy-bear"} style={styles.logoIcon} size={52}/>
            </View>
        </Animated.View>)
        ;
}
const AuthScreen = ({setUserCred}) => {
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
    const {recaptcha,recaptchaBanner,sendOtp,verifyOtp} = useFirebaseOTPLogin({auth: auth, firebaseConfig:firebaseConfig});
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    const [isCodeSend, setCodeStatus] = useState(false);
    const handleContinueOTPClick = async () => {
        const isValid = phoneInput.current?.isValidNumber(value);
        Toast.show({type: 'error', text1: "Phone number isn't valid!.", text2: "Try again!",topOffset: 10})

        if(!isValid){
            Toast.show({type: 'error', text1: "Phone number isn't valid!.", text2: "Try again!",topOffset: 10})
            return;
        }
        if(!verificationId) {
            const verificationOTP = await sendOtp(formattedValue);
            setVerificationId(verificationOTP);
            return;
        }
        const verificated = await verifyOtp(verificationId, code);
        if(verificated) {
            Toast.show({type: 'success', text1: "Login successfully", text2: 'Enjoy app'});
            setUserCred(verificated);
        } else {
            Toast.show({type: 'error', text1: "Wrong OTP code!.", text2: "Try again!",topOffset: 10})
        }
        return;
    }

    const handleContinueEmailClick = () => {

    }

    useEffect(() => {
        showAuth({topPos, marginTop});
    }, [[]]);

    //loginType === 'phone' && !!!verificationId
    return (
        <Animated.View style={{...styles.body, transform: [{translateX: posBody}]}}>

            <LogoSection isLoading={isLoading} marginTop={marginTop}/>

            <Animated.View style={{...styles.authContainer, transform: [{translateY: topPos}]}}>
                <Text style={styles.headerText}>Welcome</Text>
                <Text style={styles.subHeaderText}>Let's {isRegister ? 'start' : 'continue'} with
                    your {loginType === 'email' ? 'email' : "phone number"}</Text>

                {loginType === 'phone' &&
                    <PhoneNumberInput phoneInput={phoneInput} setFormattedValue={setFormattedValue} setValue={setValue}
                                      value={value} handleContinueClick={handleContinueOTPClick} />}
                {loginType === 'phone' && !!verificationId &&
                    <View style={{marginTop: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: 330}}>
                        <TextInput placeholder={"123456"} onChangeText={(text)=>{setCode(text)}} value={code} style={{backgroundColor: '#c9aaff', width: 150, padding: 10, borderRadius: 10}} />
                        <Icon name={'key'} size={36} color={'#48218c'} style={{marginLeft: -48}}/>
                    </View>}
                {loginType === 'email' &&
                    <EmailInput handleContinueClick={handleContinueEmailClick} isRegister={isRegister}
                                setRegister={setRegister}/>}
                <ContinueButton handleContinueClick={loginType ==='phone' ? handleContinueOTPClick : handleContinueEmailClick} />
                <LineSectionDivider/>

                <GoogleButton/>

                <View style={{alignItems: 'center', justifyContent: 'space-between', flexGrow: 1}}>
                    <OtherLoginWayButton loginType={loginType} setLoginType={setLoginType}/>
                    <FooterText/>
                    {recaptcha}
                </View>
            </Animated.View>
        </Animated.View>);
}


const LineView = ({width, color = '#000'}) => {
    return <View style={{height: 1, width: width, backgroundColor: color, marginTop: 2}}></View>
}

export default AuthScreen;
