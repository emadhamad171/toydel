import {SetStateAction, useState} from "react";
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
    Header
} from "@shared";
import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {getEmailByPhoneNumber} from "./api";
import {signInWithEmailAndPassword} from "firebase/auth";


const LoginScreen = ({setIsLogin} :{setIsLogin: React.Dispatch<SetStateAction<boolean>>}) => {
    const [emailOrPhoneNumber, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsMailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const dispatch = useAppDispatch();
    const hideLoading = () => dispatch(appSetLoading(false));

    const onClickContinue = async () => {
        dispatch(appSetLoading(true));
        const isEmail = isPhoneNumberValidator.test(emailOrPhoneNumber);
        console.log(isEmail);
        let email: string;
        try {
            email = !isEmail ? await getEmailByPhoneNumber(emailOrPhoneNumber) : emailOrPhoneNumber
            console.log(email);
        } catch (e){
            console.log(e);
            setIsMailValid(false);
            setErrorMessage('Номер телефону хибний.')
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
        }

        await signInWithEmailAndPassword(auth, email, password)
        hideLoading();
    }


    return <SafeAreaView style={{flex: 1, justifyContent: 'center', paddingHorizontal: normalize(32)}}>
        <View style={{gap: normalize(24)}}>
            <Header mb={normalize(12)}>Авторизація</Header>
            <DetailInput errorText={errorMessage} value={emailOrPhoneNumber} setIsValid={setIsMailValid} isValid={isEmailValid} onChangeText={setEmailOrPhone} placeholder={"Ел.Пошта або номер телефону"} description={"Email"} textContentType={"emailAddress"} />
            <DetailInput errorText={passwordErrorMessage} value={password} setIsValid={setIsPasswordValid} isValid={isPasswordValid} onChangeText={setPassword} placeholder={"Пароль"} description={"Пароль"} textContentType={"password"} isPassword/>
            <ContinueButton onPress={onClickContinue} >УВІЙТИ</ContinueButton>
        </View>
        <View style={{
            flexDirection: 'row',
            gap: normalize(16),
            position: 'absolute',
            bottom: 16,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
        }}
        >
            <Description>
                Ще немає акаунту?
            </Description>
            <TouchableOpacity
                onPress={()=>{
                    setIsLogin(false);
                }} >
                <Text style={{
                    color: "#32207A",
                    textDecorationLine: 'underline',
                    fontFamily: 'Cera-Pro-Bold'
                }}>
                    Тицьни сюди
                </Text>
            </TouchableOpacity>
        </View>

    </SafeAreaView>
}

export default LoginScreen;
