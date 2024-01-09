import {ActivityIndicator, Animated, Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useEffect, useRef, useState} from "react";
import Toast from 'react-native-toast-message';
import 'react-native-webview';

import {
    showAuth
} from './Animations';

import EmailInput from "../components/EmailInput";
import PhoneNumberInput from "../components/PhoneNumberInput";
import {styles} from '../styles/authorization';
import {useFirebaseLogin as useFirebaseOTPLogin} from "@itzsunny/firebase-login";
import {auth, firebaseConfig} from "../firebase";
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
const AuthScreen = () => {
//************ Component Config ***************/
    const topPos = useRef(new Animated.Value(650)).current;
    const marginTop = useRef(new Animated.Value(270)).current;

    const isLoading = useRef(false);
    const [loginType, setLoginType] = useState('phone');
    const [isRegister, setRegister] = useState(false);

    useEffect(() => {
        showAuth({topPos, marginTop});
    }, [[]]);

//************ OTP Verification ***************/
    const phoneInput = useRef(null);
    const {recaptcha
        ,sendOtp,
        verifyOtp} = useFirebaseOTPLogin({auth: auth, firebaseConfig:firebaseConfig});

    const [formattedValue, setFormattedValue] = useState("");
    const [value, setValue] = useState("");
    const [phoneNumberIsValid, setNumberValid] = useState(true);

    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const [isWrongCode, setWrongCode] = useState(false);

    const handleContinueOTPClick = async () => {
        const isValid = phoneInput.current?.isValidNumber(value) || false;
        setNumberValid(isValid);

        if(!isValid){
            Toast.show({type: 'error', text1: "Phone number isn't valid!.", text2: "Try again!",topOffset: 10})
            return;
        }
        if(!verificationId) {
            const verificationOTP = await sendOtp(formattedValue);
            setVerificationId(verificationOTP);

            return;
        }

        try {
            const verified = await verifyOtp(verificationId, code);
            if(verified) {
                Toast.show({type: 'success', text1: "Login successfully", text2: 'Enjoy app'});
            } else {
                Toast.show({type: 'error', text1: "Wrong OTP code!.", text2: "Try again!",topOffset: 10})
            }
        } catch (e) {
            setWrongCode(true);
        }
        return;
    }

//************ Email Verification ***************/
    const [email, setEmail] = useState('');
    const [isValidEmail, setValidEmail] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordSame, setIsPasswordSame] = useState(true);
    const emailValidator =/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    const handleContinueEmailClick = () => {
        const emailValidation = emailValidator.test(email);
        setValidEmail(emailValidation);
        console.log(emailValidation);
        if(!emailValidation) return;
        const passwordIsSame = password === confirmPassword || !isRegister;
        setIsPasswordSame(passwordIsSame);
        if(!passwordIsSame) return;


    }


    return (
        <Animated.View style={{...styles.body }}>

            <LogoSection isLoading={isLoading} marginTop={marginTop}/>

            <Animated.View style={{...styles.authContainer, transform: [{translateY: topPos}]}}>
                <Text style={styles.headerText}>Welcome</Text>
                <Text style={styles.subHeaderText}>Let's {isRegister ? 'start' : 'continue'} with
                    your {loginType === 'email' ? 'email' : "phone number"}</Text>

                {loginType === 'phone' &&
                    <PhoneNumberInput phoneNumberIsValid={phoneNumberIsValid} phoneInput={phoneInput} setFormattedValue={setFormattedValue} setValue={setValue}
                                      value={value} handleContinueClick={handleContinueOTPClick} />}
                {loginType === 'phone' && !!verificationId &&
                    <View style={{marginTop: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: 330}}>
                        <TextInput placeholder={"123456"} onChangeText={(text)=>{setCode(text)}} value={code} style={{backgroundColor: '#c9aaff', width: 150, padding: 10, borderRadius: 10, borderColor: '#f11', borderWidth: isWrongCode ? 1 : 0}} />
                        <Icon name={'key'} size={36} color={'#48218c'} style={{marginLeft: -48}}/>
                    </View>}
                {loginType === 'email' &&
                    <EmailInput setIsPasswordSame={setIsPasswordSame} isEmailValid={isValidEmail} isPasswordSame={isPasswordSame} isRegister={isRegister}
                                setRegister={setRegister} onChangeEmail={(text:string)=>{setEmail(text);}} onChangeConfirmPassword={(text:string)=>{setConfirmPassword(text)}} onChangePassword={(text:string)=>{setPassword(text)}}/>}
                <ContinueButton handleContinueClick={loginType ==='phone' ? handleContinueOTPClick : handleContinueEmailClick} />
                <LineSectionDivider/>

                <GoogleButton/>

                <View style={{alignItems: 'center', justifyContent: 'space-between', flexGrow: 1}}>
                    <OtherLoginWayButton loginType={loginType} setLoginType={setLoginType}/>
                    {recaptcha}
                    <FooterText/>
                </View>
            </Animated.View>
        </Animated.View>);
}


const LineView = ({width, color = '#000'}) => {
    return <View style={{height: 1, width: width, backgroundColor: color, marginTop: 2}}></View>
}

export default AuthScreen;
