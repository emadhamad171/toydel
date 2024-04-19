import {useRef, useState} from "react";
import {KeyboardAvoidingView, View} from "react-native";
import {PhoneNumberInput} from "../../components";
import {BottomText} from './ui';
import {
    appSetLoading,
    auth, ContinueButton, Description,
    firebaseConfig, Header, RDSSA,
    useAppDispatch,
    useFirebaseLogin as useFirebaseOTPLogin,
} from "@shared";

const RegisterScreen = ({setIsLogin, formattedValue, setFormattedValue, setOtpCodeId} :{setIsLogin: RDSSA<boolean>,formattedValue:string, setFormattedValue: RDSSA<string>, setOtpCodeId: RDSSA<string>}) => {
    const phoneInput = useRef(null);
    const [value, setValue] = useState("");
    const dispatch = useAppDispatch();

    const {
        recaptcha
        ,sendOtp
    } = useFirebaseOTPLogin({auth: auth, firebaseConfig:firebaseConfig});

    const onClickSend = async () => {
        dispatch(appSetLoading(true));
        try {
            const otpCode = await sendOtp(formattedValue);
            dispatch(appSetLoading(false));
            setOtpCodeId(otpCode);
        } catch (e){
            console.log(e);
            dispatch(appSetLoading(false));
        }
    }
    return <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 24}}>
        <KeyboardAvoidingView keyboardVerticalOffset={1} behavior="padding"
            style={{
                padding: 6,
                flexGrow: 1,
                flexShrink: 1,
                justifyContent: 'center'
        }}>
            <View style={{gap: 40}}>
            <Header mb={-20}>Реєстрація</Header>
            <Description>Будь ласка, введіть свій мобільний номер, щоб отримати код підтвердження.</Description>
            <PhoneNumberInput phoneNumberIsValid={false} phoneInput={phoneInput} value={value} setValue={setValue} setFormattedValue={setFormattedValue} />
            <ContinueButton onPress={onClickSend}>Зареєструватись</ContinueButton>
            </View>
        </KeyboardAvoidingView>
        <BottomText setIsLogin={setIsLogin}/>
        {recaptcha}
    </View>
}

export default RegisterScreen;
