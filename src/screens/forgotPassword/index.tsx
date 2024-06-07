import {
    appSetLoading,
    auth, ContinueButton, Description, DetailInput,
    emailValidator,
    Header,
    isPhoneNumberValidator,
    normalize,
    RDSSA,
    useAppDispatch
} from "@shared";
import {useState} from "react";
import {getEmailByPhoneNumber} from "../loginScreen/api";
import {sendPasswordResetEmail} from "firebase/auth";
import Toast from "react-native-toast-message";
import {SafeAreaView, View} from "react-native";

const ForgotPassword = ({setIsForgotPassword}:{setIsForgotPassword: RDSSA<boolean>}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [emailOrPhone, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [isSend, setIsSend] = useState(false);

    const dispatch = useAppDispatch();
    const hideLoading = () => dispatch(appSetLoading(false));
    const handleClick = async () => {
        const isEmail = isPhoneNumberValidator.test(emailOrPhone);
        let email: string;
        try {
            email = !isEmail ? await getEmailByPhoneNumber(emailOrPhone) : emailOrPhone
        } catch (e){
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
            setIsValid(false);
            hideLoading();
            return;
        }
        const isEmailValid = emailValidator.test(email);
        if (!isEmailValid) {
            setIsValid(false);
            setErrorMessage(isEmail ? 'Електронна адреса хибна.' : 'Щось пішло не так. Спробуйте пізніше.')
            hideLoading();
            return;
        }

        const actionCodeSettings = {
            handleCodeInApp: true,
            url: 'https://example.com/',
            iOS: {
                bundleId: 'com.toydelapp',
            },
            android: {
                packageName: 'com.toydelapp',
                installApp: true,
                minimumVersion: '0',
            },
        };

        sendPasswordResetEmail(auth, email, actionCodeSettings).then(data=>{
            setIsSend(true);
        }).catch((e)=>{
            console.log(e);
            Toast.show({
                type: 'error',
                text1: 'Щось пішло не так!',
                position: 'top',
                swipeable: true
            });
        }).finally(()=>{
            hideLoading();
        })
    }

    return <SafeAreaView style={{flex: 1, justifyContent: 'center', paddingHorizontal: normalize(32)}}>
        { isSend ? <View style={{gap: normalize(32)}}>
                <Header>Відправлено лист відновлення!</Header>
                <Description mb={normalize(14)} fontSize={normalize(22)}>
                    Будь ласка, перевірте свою електронну пошту, щоб дізнатися про подальші кроки зі зміни пароля.
                </Description>
                <ContinueButton onPress={()=>{
                    setIsForgotPassword(false);
                }}>
                    ОК
                </ContinueButton>
            </View>
            : <View style={{gap: normalize(42)}}>
                <Header mb={normalize(-12)} fontSize={normalize(42)}>Скинути пароль</Header>
                <Description fontSize={normalize(18)}>Введіть зареєстровану адресу електронної пошти
                    або номер телефону, щоб скинути пароль</Description>
                <DetailInput isValid={isValid} setIsValid={setIsValid} errorText={errorMessage}
                             placeholder={"Ел. пошта або номер телефону"} description={"Ел. пошта або номер телефону"}
                             onChangeText={setEmail} value={emailOrPhone} textContentType={'emailAddress'}/>
                <ContinueButton onPress={handleClick}> Надіслати </ContinueButton>
            </View>
        }
    </SafeAreaView>
}

export default ForgotPassword;
