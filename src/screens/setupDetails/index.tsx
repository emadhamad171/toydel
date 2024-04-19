import {SafeAreaView, TouchableOpacity, View} from "react-native";
import {
    auth,
    DetailInput,
    emailValidator,
    normalize,
    passwordValidator,
    updateUserField,
    useAppDispatch,
    userSet,
    ContinueButton,
    Description,
    Header
} from "@shared";
import Icon from "react-native-vector-icons/MaterialIcons";
import {useState} from "react";
import {EmailAuthProvider, linkWithCredential} from "firebase/auth"
const SetupDetails = () => {
    const dispatch = useAppDispatch();

    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isPasswordVerified, setPasswordVerified] = useState(true);
    const [isEmailVerified, setEmailVerified] = useState(true);
    const [isNameVerified, setNameVerified] = useState(true);
    const [isSurnameVerified, setSurnameVerified] = useState(true);
    const [isAddressVerified, setIsAddressVerified] = useState(true);
    const [isVerified, setVerified] = useState(true);

    const onClickContinue = async () => {
        const emailValid = emailValidator.test(email);
        if(!emailValid)
            setEmailVerified(false);
        const passwordValid = passwordValidator.test(password);
        if(!passwordValid)
            setPasswordVerified(false);

        if(!name.length)
            setNameVerified(false);
        if(!surname.length)
            setSurnameVerified(false);
        if(!address.length)
            setIsAddressVerified(false);

        if (emailValid && passwordValid && name.length && surname.length && address.length){
            const cred = EmailAuthProvider.credential(email, password);
            linkWithCredential(auth.currentUser, cred).then(async ()=>{
                await updateUserField({
                    updatedField: {
                        displayName: `${name} ${surname}`,
                        location: address,
                        email: email,
                        isOnboarded: true
                    },
                    userID: auth.currentUser.uid
                })
            }).catch(e=>console.log(e));
        }
    }

    return <SafeAreaView style={{flex: 1, marginHorizontal: normalize(24)}}>
        <TouchableOpacity style={{position: 'absolute', top: normalize(82), zIndex: 999}} onPress={()=>{
            auth.signOut();
            dispatch(userSet(null));
        }}>
            <Icon name={'chevron-left'} size={32}/>
        </TouchableOpacity>
        <View style={{flex: 1, justifyContent: 'center',gap:normalize(8)}}>
            <Header mb={normalize(24)}>Персональні дані</Header>
            <DetailInput setIsValid={setSurnameVerified} isValid={isSurnameVerified} value={surname} placeholder={"Ваше прізвище"} description={"Прізвише"} onChangeText={setSurname} textContentType={"middleName"}/>
            <DetailInput setIsValid={setNameVerified} isValid={isNameVerified} value={name} placeholder={"Ваше імʼя"} description={"Імʼя"} onChangeText={setName} textContentType={"name"}/>
            <DetailInput setIsValid={setIsAddressVerified} isValid={isAddressVerified} value={address} placeholder={"Адреса проживання"} description={"Вулиця, будинок, квартира"} onChangeText={setAddress} textContentType={"fullStreetAddress"}/>
            <DetailInput setIsValid={setEmailVerified} isValid={isEmailVerified} value={email} placeholder={"Електронна пошта"} description={"Ваша елекронна пошта"} onChangeText={setEmail} textContentType={'emailAddress'}/>
            <DetailInput setIsValid={setPasswordVerified} isValid={isPasswordVerified} value={password} placeholder={"Пароль"} description={"Пароль"} onChangeText={setPassword} textContentType={'password'} isPassword/>
            <Description>Пароль має бути щонайменше 6 символів, містити цифри та латинські літери, зокрема великі, і не повинен збігатися з ім'ям та ел. поштою </Description>
            <ContinueButton mv={normalize(32)} onPress={onClickContinue}>Зареєструватись</ContinueButton>
        </View>
    </SafeAreaView>
}

export default SetupDetails;
