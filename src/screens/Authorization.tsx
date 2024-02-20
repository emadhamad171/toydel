import {Animated, Text, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useEffect, useRef, useState} from "react";
import Toast from 'react-native-toast-message';
import 'react-native-webview';

import {
    hideLoading,
    showAuth, showLoading
} from './Animations';

import PhoneNumberInput from "../components/PhoneNumberInput";
import {styles} from '../styles/authorization';
import {useFirebaseLogin as useFirebaseOTPLogin} from "@itzsunny/firebase-login";
import {auth, firebaseConfig} from "../firebase";
import {signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithCredential, sendEmailVerification} from 'firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import ContinueButton from "../components/ContinueButton";
import {GoogleAuthProvider} from 'firebase/auth'
import Input from "../components/Input";

import {GOOGLE_WEB_CLIENT_ID} from 'react-native-dotenv'
import {normalize, signInWarningToast, wait} from "../helpers";
import {SafeAreaView} from "moti";
import {useSelector} from "react-redux";
import {RootState} from "../store";

const GoogleButton = ({handleGoogleClick}) => {
    return (
        <TouchableOpacity onPress={handleGoogleClick} style={styles.otherWayButton}>
            <Icon name={"google"} size={28} style={{marginLeft: 10, position: 'absolute', left: 10, top: 6.5}}/>
            <Text style={{alignSelf: 'center', fontWeight: '600', fontSize: 16}}>
                Google
            </Text>
        </TouchableOpacity>
    );
}
const OtherLoginWayButton = ({loginType, setLoginType, setRecovery}) => {
    return (
        <TouchableOpacity style={styles.otherWayButton} onPress={() => {
            setLoginType(loginType !== 'email' ? "email" : 'phone');
            setRecovery(false);
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
            By continuing, you automatically accept our Terms & Conditions, Privacy Policy and Cookies policy.
        </Text>
    );
}
const LineSectionDivider = () => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: normalize(12)}}>
            <LineView width={130} color={'#d0d3da'}/>
            <Text style={{alignSelf: 'center', textAlign: 'center', textAlignVertical: 'center', fontSize: 16}}>or
                with</Text>
            <LineView width={130} color={'#d0d3da'}/>
        </View>
    );
}
const LogoSection = ({marginTop}) => {
    return (
        <Animated.View style={{...styles.logoContainer, marginBottom: marginTop}}>
            <View style={styles.logoTextContainer}>
                <Text style={styles.logoText}>ToyDel </Text>
                <Icon name={"teddy-bear"} style={styles.logoIcon} size={52}/>
            </View>
        </Animated.View>)
        ;
}
const AuthScreen = () => {
    const isDarkTheme = useSelector((state:RootState)=>state.config.isDarkTheme);
//************ Component Config ***************/
    const topPos = useRef(new Animated.Value(normalize(-750))).current;
    const marginTop = useRef(new Animated.Value(normalize(270))).current;

    const [loginType, setLoginType] = useState('phone');
    const [isRegister, setRegister] = useState(false);
    const [isRecovery, setRecovery] = useState(false);

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
            showLoading({marginTop, topPos});
            await wait();
            const verified = await verifyOtp(verificationId, code);
            if(verified) {
                Toast.show({type: 'success', text1: "Login successfully", text2: 'Enjoy app'});
            } else {
                hideLoading({topPos, marginTop});
                Toast.show({type: 'error', text1: "Wrong OTP code!.", text2: "Try again!",topOffset: 10})
            }
        } catch (e) {
            hideLoading({topPos, marginTop});
            signInWarningToast();
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

    const validateEmail = () => {
        //**************** Email & Password Validation ***************/
        const emailValidation = emailValidator.test(email);
        setValidEmail(emailValidation);
        return emailValidation;
    }

    const handleContinueRecoveryPasswordClick = async ()=> {
        if(!validateEmail()) return;

        showLoading({topPos,marginTop});
        try{
            await sendPasswordResetEmail(auth,email);
            Toast.show({type: 'success', text1: 'Successful', text2: 'Password reset link was sent to your email.'});
            setRecovery(false);
            showAuth({topPos, marginTop});
        } catch (e){
            Toast.show(({type: 'error',text1: 'Something went wrong!', text2: e.code}));
        }

    }
    const handleContinueEmailClick = async () => {
        //**************** Email & Password Validation ***************/
        if(!validateEmail()) return;
        const passwordIsSame = password === confirmPassword || !isRegister;
        setIsPasswordSame(passwordIsSame);
        if(!passwordIsSame) return;

        //***************** Authorization with Email *********************
        showLoading({topPos,marginTop});
        await wait();
        let cred;
        try {
            if(isRegister){
                cred = await createUserWithEmailAndPassword(auth, email,password);
                await sendEmailVerification(cred.user);
            }
            await signInWithEmailAndPassword(auth,email,password);
            hideLoading({topPos,marginTop});
        } catch (e){
            const errorCode= e.code;

            signInWarningToast();
            hideLoading({topPos,marginTop});
            switch (errorCode) {
                //TODO: Process error code of authorization
                case 'auth/wrong-password':
                    console.log('Wrong password!');
                    break;
                case 'auth/user-not-found':
                    console.log('User in`t registered.');
                    break;
                case 'auth/email-already-in-use':
                    console.log('User already exist');
                    break;
                default:
                    console.log(errorCode, e);
                    console.log('Something went wrong.');
                    break;
            }
        }

        if(isRegister){

        }
    }

    //***************** Google Authorization *********************

    const handleContinueGoogleClick = async () => {
        GoogleSignin.configure({
            webClientId: GOOGLE_WEB_CLIENT_ID,
            offlineAccess: true,
        });
        try {
            await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
            showLoading({topPos,marginTop})
            await wait();
            let googleUser;
            try {
                googleUser = await GoogleSignin.signInSilently();
            } catch (e){
                try {
                    googleUser = await GoogleSignin.signIn();
                } catch (e) {
                    signInWarningToast(e.code);
                }
            }
            const {idToken} = googleUser;
            const googleCredential = GoogleAuthProvider.credential(idToken);
            await signInWithCredential(auth, googleCredential);
        } catch (e){
            hideLoading({topPos,marginTop})
            signInWarningToast(e.code);
            throw new Error(e); //Rethrow error for debugging.
            console.log(e);
        }
    }

    return (
        <View style={isDarkTheme ? styles.body_dark : styles.body_light}>
        <SafeAreaView style={isDarkTheme ? styles.body_dark : styles.body_light}>
            <LogoSection marginTop={marginTop}/>

            <Animated.View style={{...styles.authContainer, marginBottom: topPos}}>
                <Text style={styles.headerText}>Welcome</Text>
                <Text style={styles.subHeaderText}>Let's {isRegister ? 'start' : isRecovery ? 'reset password' : 'continue'} with
                    your {loginType === 'email' ? 'email' : "phone number"}</Text>

                {loginType === 'phone' &&
                    <PhoneNumberInput phoneNumberIsValid={phoneNumberIsValid} phoneInput={phoneInput} setFormattedValue={setFormattedValue} setValue={setValue}
                                      value={value} handleContinueClick={handleContinueOTPClick} />}
                {loginType === 'phone' && !!verificationId &&
                    <View style={{marginTop: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: 330}}>
                        <Input placeholder={"123456"} onChangeAction={(text:string)=>{setCode(text)}} value={code} style={{backgroundColor: '#c9aaff', width: 150, padding: 10, borderRadius: 10, borderColor: '#f11', borderWidth: isWrongCode ? 1 : 0}} />
                        <Icon name={'key'} size={36} color={'#48218c'} style={{marginLeft: -48}}/>
                    </View>}

                {loginType === 'email' && !isRecovery ? <View style={{gap: 10, width: 320}}>
                    <Input style={{...styles.emailInput, borderWidth: isValidEmail ? 0 : 1}} onSubmitEditing={()=>{}} placeholderTextColor={'#864cb4'} placeholder={'email@example.com'} onChangeAction={setEmail} />
                    <Input style={{...styles.emailInput, borderWidth: isPasswordSame ? 0 : 1}} placeholderTextColor={'#864cb4'} placeholder={'Password'} onChangeAction={setPassword} secureTextEntry={true}/>
                    {isRegister && <Input style={{...styles.emailInput, borderWidth: isPasswordSame ? 0 : 1}}  placeholderTextColor={'#864cb4'} placeholder={'Confirm password'} onChangeAction={setConfirmPassword} secureTextEntry={true}/>}
                    <View style={{flexDirection: 'row', justifyContent:'space-between', marginBottom: 2}}>
                    <TouchableOpacity>
                        <Text style={{marginTop: -5, marginLeft: 5}} onPress={()=>{
                            setRegister(!isRegister);
                            setIsPasswordSame(true);
                            setConfirmPassword('');
                        }}>
                            {isRegister ? "Login" : "Register"}
                        </Text>
                    </TouchableOpacity>
                        {
                            !isRegister && <TouchableOpacity onPress={()=>{
                                showLoading({topPos,marginTop, afterAnimate: ()=>{
                                            setRecovery(true);
                                            showAuth({topPos,marginTop});
                                    }});
                            }}>
                            <Text style={{marginTop: -5}}>
                                Forgot password?
                            </Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View> : loginType==='email'&& <View style={{gap: 10, width: 320}}>
                    <Input style={{...styles.emailInput, borderWidth: isValidEmail ? 0 : 1}} onSubmitEditing={()=>{}} placeholderTextColor={'#864cb4'} placeholder={'email@example.com'} onChangeAction={setEmail} />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity>
                        <Text style={{marginTop: -5, marginLeft: 5}} onPress={()=>{
                            setRegister(false);
                            setRecovery(false);
                            setIsPasswordSame(true);
                            setConfirmPassword('');
                        }}>
                            Login
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{marginTop: -5, marginLeft: 5}} onPress={()=>{
                            setRegister(true);
                            setRecovery(false);
                            setIsPasswordSame(true);
                            setConfirmPassword('');
                        }}>
                            Register
                        </Text>
                    </TouchableOpacity>
                    </View>
                </View>}
                <ContinueButton handleContinueClick={loginType ==='phone' ? handleContinueOTPClick : isRecovery ? handleContinueRecoveryPasswordClick : handleContinueEmailClick} />
                <LineSectionDivider/>

                <GoogleButton handleGoogleClick={handleContinueGoogleClick}/>

                <View style={{alignItems: 'center', justifyContent: 'space-between', flexGrow: 1}}>
                    <OtherLoginWayButton loginType={loginType} setLoginType={setLoginType} setRecovery={setRecovery}/>
                    {recaptcha}
                </View>
            </Animated.View>
        </SafeAreaView>
        </View>);
}

const LineView = ({width, color = '#000'}) => {
    return <View style={{height: 1, width: width, backgroundColor: color, marginTop: 2}}></View>
}

export default AuthScreen;
