import {useState} from "react";
import {
    appSetLoading,
    auth,
    DetailInput,
    emailValidator,
    isPhoneNumberValidator,
    normalize,
    passwordValidator,
    useAppDispatch,
    ContinueButton,
    Description,
    Header, ErrorMessageText, RDSSA, windowWidth
} from "@shared";
import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {getEmailByPhoneNumber} from "./api";
import {signInWithEmailAndPassword} from "firebase/auth";
import ForgotPassword from "../forgotPassword";


const LoginScreen = ({setIsLogin} :{setIsLogin: RDSSA<boolean>}) => {
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [emailOrPhoneNumber, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsMailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [isGlobalErrorShown, setIsGlobalErrorShown] = useState(false);
    const [globalErrorMessage, setGlobalErrorMessage] = useState('');
    const dispatch = useAppDispatch();
    const hideLoading = () => dispatch(appSetLoading(false));

    const onClickContinue = async () => {
        dispatch(appSetLoading(true));
        const isEmail = isPhoneNumberValidator.test(emailOrPhoneNumber);
        let email: string;
        try {
            email = !isEmail ? await getEmailByPhoneNumber(emailOrPhoneNumber) : emailOrPhoneNumber
        } catch (e){
            console.log(e);
            const message = e?.message() || '';
            switch (message) {
                case "USER-NOT-FOUND":
                    setErrorMessage('Номер телефону не зареєстровано.');
                    break
                case "PHONE-NUMBER-INVALID":
                    setErrorMessage('Номер телефону хибний.')
                    break;
                default:
                    setErrorMessage('Щось пішло не так, спробуйте пізніше.')
                    break;
            }
            setIsMailValid(false);
            hideLoading();
            return;
        }
        const isEmailValid = emailValidator.test(email);
        if (!isEmailValid) {
            setIsMailValid(false);
            setErrorMessage(isEmail ? 'Електронна адреса хибна.' : 'Щось пішло не так. Спробуйте пізніше.')
            hideLoading();
            return;
        }
        const isPasswordValid = passwordValidator.test(password);

        if(!isPasswordValid){
            setIsPasswordValid(false);
            setPasswordErrorMessage('Пароль повинен містити що найменше 1 цифру, малу та великі літери.');
            hideLoading();
            return;
        }

        signInWithEmailAndPassword(auth, email, password).then(()=>{
        }).catch((er)=>{
            console.log(er);
            setIsGlobalErrorShown(true);
            setIsPasswordValid(false);
            setGlobalErrorMessage('Неправильно введені дані, спробуйте ще раз');
            setPasswordErrorMessage('');
        }).finally(()=>{
            hideLoading();
        })
    }

    if (isForgotPassword)
        return <ForgotPassword setIsForgotPassword={setIsForgotPassword} />

    return <SafeAreaView style={{flex: 1, justifyContent: 'center', paddingHorizontal: normalize(32)}}>
        <View style={{gap: normalize(24)}}>
            <Header mb={normalize(12)}>Авторизація</Header>
            <DetailInput errorText={errorMessage} value={emailOrPhoneNumber} setIsValid={setIsMailValid} isValid={isEmailValid} onChangeText={setEmailOrPhone} placeholder={"Ел.Пошта або номер телефону"} description={"Ел. Пошта або номер телефону"} textContentType={"emailAddress"} />
            <DetailInput errorText={passwordErrorMessage} value={password} setIsValid={setIsPasswordValid} isValid={isPasswordValid} onChangeText={setPassword} placeholder={"Пароль"} description={"Пароль"} textContentType={"password"} isPassword/>
            <ContinueButton onPress={onClickContinue} >УВІЙТИ</ContinueButton>
            <ErrorMessageText shown={!isPasswordValid && isGlobalErrorShown} text={globalErrorMessage}/>
            <TouchableOpacity
                onPress={()=>{
                    setIsForgotPassword(true);
                }} >
                <Text style={{
                    color: "#32207A",
                    textDecorationLine: 'underline',
                    fontFamily: 'Cera-Pro-Bold'
                }}>
                    Забули пароль?
                </Text>
            </TouchableOpacity>
        </View>
        <View style={{
            flexDirection: 'row',
            gap: normalize(16),
            position: 'absolute',
            bottom: 16,
            alignItems: 'center',
            justifyContent: 'center',
            width: windowWidth
        }}
        >
            <Description fontSize={normalize(20)}>
                Ще немає акаунту?
            </Description>
            <TouchableOpacity
                onPress={()=>{
                    setIsLogin(false);
                }} >
                <Text style={{
                    color: "#32207A",
                    textDecorationLine: 'underline',
                    fontFamily: 'Cera-Pro-Bold',
                    fontSize: normalize(20)
                }}>
                    Тицьни сюди
                </Text>
            </TouchableOpacity>
        </View>

    </SafeAreaView>
}

export default LoginScreen;
