import {appSetLoading, auth, firebaseConfig, useAppDispatch, useFirebaseLogin as useFirebaseOTPLogin} from "@shared";
import {useState} from "react";
import useTimer from "../../shared/lib/hooks/useTimer";
import {KeyboardAvoidingView, Text, View} from "react-native";
import {ContinueButton, Description, Header} from "../registerScreen/ui";
import {OtpInput} from "react-native-otp-entry";

const VerificationScreen = ({otpCodeId}:{otpCodeId: string}) => {
    const { verifyOtp } = useFirebaseOTPLogin({auth: auth, firebaseConfig:firebaseConfig});
    const [isWrongCode, setWrongCode] = useState(false);
    const [otpCode, setOtpCode] = useState('');
    const dispatch = useAppDispatch();

    const {
        time
    } = useTimer({minutes: 3});

    const onClickContinue = async () => {
        dispatch(appSetLoading(true));
        const res = await verifyOtp(otpCodeId, otpCode);
        console.log(res);
        dispatch(appSetLoading(false));
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
                <Header mb={-20}>Верифікація</Header>
                <Description>Будь ласка, введіть код підтвердження, який ми надіслали на ваш мобільний номер</Description>
                <OtpInput
                    textInputProps={{
                        style: {
                            color: '#faa'
                        }
                    }}
                    theme={{
                        pinCodeTextStyle: {
                            color: isWrongCode ? '#F20909' : '#141314',
                        }
                    }}
                    numberOfDigits={6}
                    onTextChange={(text) => setOtpCode(text)}
                />
                <ContinueButton onPress={onClickContinue}>Перевірити</ContinueButton>
                <Text style={{fontFamily: 'Cera-Pro'}}>Термін коду закінчиться через {time}</Text>
            </View>
        </KeyboardAvoidingView>
    </View>;
}
export default VerificationScreen;
