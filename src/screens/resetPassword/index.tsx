import {
    appSetIsResetPassword, appSetOobCode,
    auth,
    ContinueButton, Description,
    DetailInput,
    Header,
    normalize,
    passwordValidator,
    useAppDispatch,
    useAppSelector, windowHeight, windowWidth
} from "@shared";
import {useState} from "react";
import {SafeAreaView, View} from "react-native";
import {confirmPasswordReset} from "firebase/auth";
import Toast from "react-native-toast-message";
import {AnimatePresence} from "moti";
import Icon from "react-native-vector-icons/Entypo";
import {AnimatedView, Circle, Cloud, Star} from "./ui";

enum advices {
    default = 'Обидва паролі повинні збігатися',
    protect = 'Пароль складатись що найменше з 6 символів, 1 великої, 1 малої літер та 1 цифри'
}
const ResetPasswordScreen = () => {
    const dispatch = useAppDispatch();
    const oobCode = useAppSelector(state=>state.config.oobCode);
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [advice, setAdvice] = useState(advices.default);
    const [isReset, setReset] = useState(false);

    return <SafeAreaView style={{flex: 1, justifyContent: 'center', marginHorizontal: normalize(32)}}>
        <AnimatePresence exitBeforeEnter>
            {
                !isReset && <AnimatedView
                    style={{
                        width: windowWidth,
                        height: windowHeight,
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                        left: -normalize(32),
                        zIndex: 555,
                        backgroundColor: '#fff'
                    }} >

                    <Circle>
                        <AnimatePresence exitBeforeEnter>
                            <Star top={-normalize(84)} left={-normalize(32)} duration={5600} />
                            <Star top={-normalize(48)} left={normalize(64)} duration={3400}/>
                            <Star top={normalize(32)} left={-normalize(48)} duration={2500}/>
                            <Star top={normalize(48)} left={normalize(152)} duration={4200}/>
                            <Cloud top={-normalize(148)} left={normalize(138)} duration={2000}/>
                            <Cloud top={-normalize(82)} left={-normalize(158)} duration={2000} width={normalize(92)} fromLeft/>

                            <Icon name="check" color="#fff" size={normalize(48)} />
                        </AnimatePresence>
                    </Circle>
                    <Header>Пароль змінено!</Header>
                    <View style={{width: '100%', position: 'absolute',paddingHorizontal: normalize(32), bottom: normalize(32)}}>
                        <ContinueButton onPress={()=>{
                            dispatch(appSetOobCode(''));
                            dispatch(appSetIsResetPassword(false));
                        }}>УВІЙТИ</ContinueButton>
                    </View>
                    </AnimatedView>
            }
        </AnimatePresence>
        <View style={{gap: normalize(24)}}>
            <Header>Змінити пароль</Header>
            <DetailInput placeholder={"Новий пароль"} description={"Новий пароль"} onChangeText={setPassword} value={password} isPassword isValid={isValid} setIsValid={setIsValid}/>
            <DetailInput placeholder={"Новий пароль"} description={"Новий пароль"} onChangeText={setRepeatPassword} value={repeatPassword} isPassword isValid={isValid} setIsValid={setIsValid}/>
            <ContinueButton
                isValid={isValid && !isReset}
                onPress={()=>{
                    const isPasswordSame = password === repeatPassword;
                    if(!isPasswordSame) {
                        setIsValid(false);
                        setAdvice(advices.default);
                        return;
                    }
                    const isPasswordValid = passwordValidator.test(password);
                    if(!isPasswordValid) {
                        setIsValid(false);
                        setAdvice(advices.protect)
                        return;
                    }

                    confirmPasswordReset(auth, oobCode, password).then(()=>{
                        setReset(true);
                    }).catch((e)=>{
                        const message = typeof e === "string" ? e :
                            typeof e?.message === "string" ? e.message
                                : e?.message?.() || '';
                        console.log(message);
                        switch (message){
                            case "Firebase: Error (auth/expired-action-code).":
                                Toast.show({type: 'error', text1: 'Посилання більше не дійсне.'});
                                dispatch(appSetIsResetPassword(false));
                                break;
                            case "Firebase: Error (auth/invalid-action-code).":
                                Toast.show({type: 'error', text1: 'Посилання не валідне.'});
                                dispatch(appSetIsResetPassword(false));
                                break;
                            default:
                                break;
                        }
                        console.log(e);
                    });
                }}
            >
                ЗМІНИТИ
            </ContinueButton>
            <Description color={isValid ? '#000' : '#F20909'}>
                {
                    advice
                }
            </Description>
        </View>
    </SafeAreaView>;
}

export default ResetPasswordScreen;
