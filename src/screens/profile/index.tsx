import {
    auth,
    ContinueButton, defaultPhoto, Description,
    DetailInput,
    emailValidator, ErrorMessageText,
    Header, itemType,
    normalize, passwordValidator, updateUserField, useAppDispatch,
    useAppSelector,
    useModal, userSet,
    userType, userUpdateField, wait, windowHeight, windowWidth
} from "@shared";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    Platform,
    BackHandler,
    Linking, FlatList, ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Feather";
import BrandIcon from "react-native-vector-icons/FontAwesome"
import {useEffect, useState} from "react";
import {SafeAreaView as SAView} from "react-native-safe-area-context";
import {updateEmail} from 'firebase/auth'
import Toast from "react-native-toast-message";
import {reauthenticateWithCredential, EmailAuthProvider, updatePassword} from 'firebase/auth'
import {LinearGradient} from "expo-linear-gradient";

const UserIcon = ({uri}) => <Image source={{uri}} style={{width: normalize(108), height: normalize(108), borderRadius: 50}}/>
const UserNameAndIcon = ({mb=0}:{mb?:number}) => {
    const user: userType= useAppSelector(state=>state.user.user);

    return <View style={{flexDirection: 'row', alignItems: 'center', gap: normalize(24), marginBottom: mb}}>
        <UserIcon uri={user.photoURL}/>
        <Header fontSize={normalize(32)}>{user.displayName}</Header>
    </View>
}

const ProfileButton = ({source, title, secondTitle, onPress}:{source?: any, title: string, secondTitle?: string, onPress: ()=>void}) => {

    return <TouchableOpacity onPress={onPress} style={{width: '100%', flexDirection: 'row', borderBottomWidth: .5,padding: normalize(12), paddingVertical: normalize(18),alignItems:'center',borderColor: '#E0DFEE', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: normalize(18)}}>
            {/*<Icon name={iconName} color={"#32207A"} size={normalize(38)}/>*/}
            {source && <Image source={source} style={{width: normalize(28), height: normalize(28), objectFit: 'contain'}}/>}
            <Text style={{fontFamily:'Manrope-SemiBold', fontSize: normalize(20)}}>{title}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center',gap:normalize(18), justifyContent: 'center'}}>
            {secondTitle && <Description>{secondTitle}</Description>}
            <Icon name={'chevron-small-right'} size={normalize(34)} color={'#707070'}/>
        </View>
    </TouchableOpacity>
}

const DefaultModalHeader = ({text, onClickBack, onExitGoBack = false}: {text: string, onClickBack?: ()=>void, onExitGoBack?: boolean}) => {
    const {
        closeModal,
        goBack
    } = useModal();

    useEffect(() => {
        const handler = BackHandler.addEventListener("hardwareBackPress", ()=>{
            onClickBack ? onClickBack() : onExitGoBack ? goBack() : closeModal();
            return true;
        });
        return ()=>handler.remove();
    }, []);

    return <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative', width: '100%'}}>
        <TouchableOpacity style={{flex: 1}} onPress={onClickBack ? onClickBack : onExitGoBack ? goBack : closeModal}>
            <Icon name={"chevron-small-left"} size={42}/>
        </TouchableOpacity>

        <View style={{flex: 3, justifyContent:'center', alignItems: 'center'}}>
            <Text style={{alignSelf: 'center', textAlign:'center', fontFamily: 'Cera-Pro-Bold', fontSize: normalize(28)}}>
                {text}
            </Text>
        </View>

        <View style={{flex: 1}} />
    </View>
}

const PersonalDataModal = () => {
    const user: userType = useAppSelector(state=>state.user.user);
    const [name, setName] = useState<string>(user.displayName.split(' ')[0]);
    const [surname, setSurname] = useState<string>(user.displayName.split(' ')[1]);
    const [address, setAddress] = useState<string>(user.location);
    const [email, setEmail] = useState<string>(user.email);
    const [password, setPassword] = useState('');
    const [isPasswordValid, setPasswordValid] = useState(true);

    const [isEmailValid, setIsEmailValid] = useState(true);


    const dispatch = useAppDispatch();

    const onPressChange = async () => {
        const userID = user.id
        if (email!==user.email) {
            const isValid = emailValidator.test(email);
            if(!isValid){
                setIsEmailValid(false);
                return;
            }

            const cred = EmailAuthProvider.credential(user.email, password);
            const newCred = EmailAuthProvider.credential(email, password);
            reauthenticateWithCredential(auth.currentUser, cred).then(()=>{
                updateEmail(auth.currentUser, email).then(()=>{
                    updateUserField({updatedField: {email}, userID})
                    dispatch(userUpdateField({field: "email", value: email}));
                    reauthenticateWithCredential(auth.currentUser, newCred);
                }).catch(e=>{
                    console.log(e);
                    setIsEmailValid(false);
                });
            }).catch((e)=>{
                console.log(e);
                setPassword('');
                setPasswordValid(false);
            })
        }
        if(!!name && !!surname && !!address && (user.location !== address || user.displayName !== name+" "+surname)) {
            const updatedField = {
                location: address,
                displayName: name+" "+surname
            }
            try {
                await updateUserField({
                    updatedField,
                    userID
                });
                user.location !== address && dispatch(userUpdateField({
                    field: "location",
                    value: address
                }));
                user.displayName !== name+" "+surname && dispatch(userUpdateField({
                    field: "displayName",
                    value: name+" "+surname
                }));
            } catch (e){
                Toast.show({type: 'error', text1: 'Щось пішло не так!'});
                return;
            }
            Toast.show({type: 'success', text1: 'Дані успішно змінені.'});
        }
    }
    return <SAView style={{flex: 1}}>
        <SafeAreaView style={{ flex: 1, zIndex: 955, margin: normalize(16)}}>
            <DefaultModalHeader text={"Персональні дані"} />
            <View style={{flex: 1, gap: normalize(12)}}>
                <View style={{alignSelf: 'center', alignItems: 'center'}}>
                    <UserIcon uri={user.photoURL} />
                    <Header fontSize={normalize(28)}>{user.displayName}</Header>
                </View>
                <View style={{flexGrow: 1, gap: normalize(8)}}>
                    <DetailInput placeholder={"Ваше прізвище"} description={"Прізвище"} isValid={!!surname} onChangeText={setSurname} value={surname} />
                    <DetailInput placeholder={"Ваше ім'я"} isValid={!!name} description={"Ім'я"} onChangeText={setName} value={name} />
                    <DetailInput placeholder={"Ваша адреса"} description={"Адреса"} isValid={!!address} onChangeText={setAddress} value={address} />
                    <DetailInput errorText={"Електронна пошта повинна бути у форматі example123@domain.com"} placeholder={"Електронна пошта"} description={"Ваша електронна пошта"} isValid={!!email && isEmailValid} setIsValid={setIsEmailValid} onChangeText={setEmail} value={email} />
                    {
                        email !==user.email && <View>
                        <DetailInput placeholder={"Ваш пароль"} description={"Пароль"} onChangeText={setPassword} value={password} isValid={isPasswordValid} setIsValid={setPasswordValid} isPassword/>
                        <Description>
                            Для зміни пошти або пароля, потрібно ввести старий пароль.
                        </Description>
                        </View>
                    }
                </View>
                <View style={{marginBottom: normalize(Platform.OS==="ios" ? 8 : 32)}}>
                    <ContinueButton isValid={!!name && !!surname && !!address && !!email && isEmailValid} onPress={onPressChange} >Змінити</ContinueButton>
                </View>
            </View>
    </SafeAreaView>
    </SAView>
}

enum warningMessages {
    weakPassword = "Пароль повинен містити що найменше 1 цифру, малу та великі літери",
    default = "Паролі повинні співпадати",
    invalidPassword = "Поточний пароль не вірний"
}
const ChangePasswordModal = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [isPasswordValid, setPasswordValid] = useState(true);
    const [isNewPasswordValid, setNewPasswordValid] = useState(true);
    const [warningMessage, setWarningMessage] = useState(warningMessages.default);

    const [isLoading, setLoading] = useState(false);

    const {
        goBack
    } = useModal();

    const onClickChange = () => {
        const isNPValid = passwordValidator.test(newPassword);

        if (!isNPValid) {
            setWarningMessage(warningMessages.weakPassword)
            setNewPasswordValid(false);
            return;
        }
        if (!isNPValid) {
            setWarningMessage(warningMessages.default)
            setNewPasswordValid(false);
            return;
        }
        const cred = EmailAuthProvider.credential(auth.currentUser.email, password);

        reauthenticateWithCredential(auth.currentUser, cred).then(()=>{
            updatePassword(auth.currentUser, newPassword).then(()=>{
                Toast.show({type: 'success', text1: 'Пароль успішно змінено'});
            }).catch((e)=>{
                console.log(e);
                Toast.show({type: 'error', text1: 'Щось пішло не так'});
            })
        }).catch(()=>{
            setLoading(false);
            setPasswordValid(false);
            setWarningMessage(warningMessages.invalidPassword);
        }).finally(()=>{
            setLoading(false);
        })
    }

return <SAView style={{flex: 1}}>
    <SafeAreaView style={{ flex: 1, zIndex: 955, margin: normalize(20), gap: 20}}>
        <DefaultModalHeader onClickBack={goBack} text={"Зміни пароля"} />
        <View style={{gap: 8, marginVertical: 12, flexGrow: 1}}>
            <DetailInput placeholder={"Поточний пароль"} description={"Пароль"} onChangeText={setPassword} value={password} isValid={isPasswordValid} setIsValid={setPasswordValid} isPassword />
            <DetailInput placeholder={"Новий пароль"} description={"Новий пароль"} onChangeText={setNewPassword} value={newPassword} isPassword />
            <DetailInput placeholder={"Підтвердити пароль"} description={"Підтвердити пароль"} onChangeText={setRepeatPassword} value={repeatPassword} isValid={isNewPasswordValid} setIsValid={setNewPasswordValid} isPassword />
            <ErrorMessageText shown color={'#000'} text={warningMessage} />
            <View style={{bottom: 12,position: 'absolute', width: '100%'}}>
               <ContinueButton isValid={isPasswordValid && isNewPasswordValid && !!password && !!newPassword && !!repeatPassword && !isLoading} onPress={onClickChange} >ЗМІНИТИ</ContinueButton>
            </View>
            </View>
        </SafeAreaView>
</SAView>
}

const SettingsModal = () => {
    const dispatch = useAppDispatch();
    const {closeModal, openModal, hideModal} = useModal('')
    return <SAView style={{flex: 1}}>
        <SafeAreaView style={{ flex: 1, zIndex: 955, margin: normalize(20), gap: normalize(20)}}>
            <DefaultModalHeader text={"Налаштування"} />
            <View style={{gap: normalize(12)}}>
                <Description>Загальні</Description>
                <ProfileButton onPress={()=>{}} title={"Мова"} secondTitle={"Українська"}/>
                <ProfileButton onPress={()=>{}} title={"Контакти"} />
            </View>
            <View style={{gap: normalize(12)}}>
                <Description>Безпека</Description>
                <ProfileButton onPress={()=>{
                    hideModal();
                    wait(0).then(()=>{
                        openModal(()=><ChangePasswordModal />)
                    })
                }} title={"Змінити пароль"} />
                <ProfileButton onPress={()=>{}} title={"Політика конфіденційності"} />
            </View>
            <View style={{width: '100%', position: 'absolute', bottom: 24, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style={{flexDirection: 'row',alignSelf: 'center', alignItems: 'center', gap: 6,zIndex: 999}} onPress={()=>{
                    auth.signOut().then(()=>{
                        dispatch(userSet(null));
                        closeModal();
                    })
                }}>
                    <Text style={{
                        fontFamily: 'Manrope-SemiBold',
                        color: "#FF2828",
                        textAlign: 'center'
                    }}>Вийти з акаунта</Text>
                    <Image source={require("../../../assets/logOut.png")} style={{width: normalize(38), height: normalize(38), objectFit: 'contain'}}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    </SAView>
}

const PhoneContainer = ({description, phoneNumber}) => {

    return <TouchableOpacity onPress={()=>{
        Linking.canOpenURL(`tel:${phoneNumber}`)
            .then(supported => {
                if (!supported) {
                    console.warn("PHONE-NUMBER-DEEP-LINK-ERROR");
                } else {
                    return Linking.openURL(`tel:${phoneNumber.split(' ').join('')}`);
                }
            })
    }} style={{gap: normalize(10), borderBottomWidth: 1, padding: normalize(6), borderBottomColor: '#E0DFEE'}}>
        <Description fontSize={normalize(14)} color={"#9BA1B1"}>{description}</Description>
        <View style={{flexDirection: 'row', paddingVertical: normalize(12),
            alignItems: 'center',
            gap: normalize(24)}}>
            <FIcon name={"phone"} color={"#32207A"} size={normalize(28)} />
            <Text style={{
                fontFamily: 'Manrope-SemiBold',
                fontSize: normalize(24),
                color: '#000'
            }}>
                {phoneNumber}
            </Text>
        </View>
    </TouchableOpacity>
}
const TelegramPoster = ({link}) => {
return <TouchableOpacity style={{
    alignSelf: 'center',
    alignItems: 'center',
    gap: 8
}} onPress={()=>{
    Linking.canOpenURL(`tg:${link}`)
        .then(supported => {
            if (!supported) {
                console.warn("TELEGRAM-DEEP-LINK-ERROR");
            } else {
                return Linking.openURL(`tel:${link}`);
            }
        })
}}>
   <BrandIcon name={"telegram"} size={normalize(52)} color={"#2AABEE"}/>
    <Text style={{
        fontFamily: 'Manrope-SemiBold',
        fontSize: normalize(22)
    }}>
        Написати в Telegram
    </Text>
</TouchableOpacity>
}
const SupportModal = () => {
    return <SAView style={{flex: 1}}>
        <SafeAreaView style={{ flex: 1, zIndex: 955, margin: normalize(24), gap: normalize(24)}}>
            <DefaultModalHeader text={"Служба підтримки"} />
            <TelegramPoster link={'rromsky'}/>
            <PhoneContainer phoneNumber={"0 700 700 700"} description={"Для дзвінків по Україні (безкоштовно)"} />
            <PhoneContainer phoneNumber={"+380 44 000 00 00"} description={"Для дзвінків з інших країн"}/>
        </SafeAreaView>
    </SAView>
}
const OrderItem = ({item}:{item?: itemType}) => {
    const {openModal} = useModal();
    return <TouchableOpacity onPress={()=>{
            openModal(()=><OrderedItemModal item={item}/>)
        }}>
            <View style={{
                borderRadius: 10,
                flexDirection: 'row',
                padding: 4,
                backgroundColor: '#fff',
                gap: 8,
                marginBottom: 8,
            }}>
                <Image source={{uri: item.photo}} style={{
                    width: normalize(196),
                    height: normalize(144),
                    resizeMode: 'stretch',
                    borderRadius: 10
                }}/>
                <View style={{paddingVertical: normalize(4), gap: normalize(4), justifyContent: 'space-between'}}>
                    <View>
                        <Text numberOfLines={2} ellipsizeMode={'tail'} style={{fontFamily: 'Manrope-SemiBold', color: '#141314', maxWidth: '75%', fontSize: normalize(16)}}>
                            {item.name}
                        </Text>
                        <Text style={{fontSize: normalize(14), color: '#141314', fontFamily: 'Manrope'}}>
                            ₴{item ? item?.price : 1500} / місяць
                        </Text>
                    </View>
                    <Text style={{alignSelf: 'flex-start', fontFamily: "Manrope", fontSize: normalize(13), color: 'rgba(0,0,0,0.5)'}}>
                        19 Квітня, 2024, 15:11 Доставлено
                    </Text>
                </View>
            </View>
    </TouchableOpacity>
}
const BottomGradient = () => {
    return <TouchableOpacity disabled style={{
        position: 'absolute',
        width: windowWidth,
        height: windowHeight*0.4,
        bottom: 0,
        // backgroundColor: 'rgba(162,34,34,0.23)',
        zIndex: 999,
        pointerEvents: 'none'
    }}>
        <LinearGradient colors={["rgba(255,255,255, 0)", "rgba(255,255,255, 1)"]} style={{flex: 1}}/>
    </TouchableOpacity>
}
const OrderedItemModal = ({item}: {item: itemType}) => {
    return <SAView style={{flex: 1, backgroundColor: '#ecedf1'}}>
            <SafeAreaView style={{ flex: 1, zIndex: 955, gap: normalize(24)}}>
                <DefaultModalHeader text={item.name} onExitGoBack />
                    <Image source={{uri: item.photo}} style={{width: windowWidth, resizeMode: 'stretch', height: '40%'}}/>
                <ScrollView style={{marginHorizontal: normalize(24)}}>
                    <Header fontSize={18}>{item.name}</Header>
                    <Description>{item.description}</Description>
                </ScrollView>
            </SafeAreaView>
        </SAView>
}
const OrdersModal = () => {
    const data:{item:itemType}[] = new Array(5).fill(
        {
            brand: "Big Bang",
            category: ["Fun"],
            description: "Description of toy and even more. Some description about toy, some description about price, some description about toy price and other stuff idk. Some description about toy, some description about price, some description about toy price and other stuff idk. Some description about toy, some description about price, some description about toy price and other stuff idk. Some description about toy, some description about price, some description about toy price and other stuff idk. Some description about toy, some description about price, some description about toy price and other stuff idk. Some description about toy, some description about price, some description about toy price and other stuff idk.Some description about toy, some description about price, some description about toy price and other stuff idk.",
            id: "string",
            isIncludedInPlan: false,
            name: "Конструктор LEGO Speed Champion",
            photo: defaultPhoto,
            price: 500,
            rate: 5
        }
    );

    return <View style={{flex: 1, backgroundColor: '#ecedf1'}}>
        <SAView style={{flex: 1}}>
        <SafeAreaView style={{ flex: 1, zIndex: 955, margin: normalize(24), gap: normalize(24)}}>
            <DefaultModalHeader text={"Мої замовлення"} />
            <FlatList data={data} renderItem={({item})=><OrderItem item={item} />} />
        </SafeAreaView>
    </SAView>
        <BottomGradient />
    </View>
}

const Profile = () => {
    const {
        openModal
    } = useModal("Profile");

    return <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
    <View style={styles.container}>
        <UserNameAndIcon mb={normalize(36)} />
        <ProfileButton source={require("../../../assets/UserRounded.png")} title={"Персональні дані"} onPress={()=>{
            openModal(()=><PersonalDataModal />);
        }} />

        <ProfileButton source={require("../../../assets/BagOutline.png")} title={"Мої замовлення"} onPress={()=>{
            openModal(()=><OrdersModal />);
        }}/>

        <ProfileButton source={require("../../../assets/timer.png")} title={"Трекер"} onPress={()=>{
            openModal(()=><SettingsModal />);
        }}/>

        <ProfileButton source={require("../../../assets/credit-cards.png")} title={"Платіжні налаштування"} onPress={()=>{
            openModal(()=><SettingsModal />);
        }}/>

        <ProfileButton source={require("../../../assets/Messages.png")} title={"Служба підтримки"} onPress={()=>{
            openModal(()=><SupportModal />);
        }}/>

        <ProfileButton source={require("../../../assets/Gear.png")} title={"Налаштування"} onPress={()=>{
            openModal(()=><SettingsModal />);
        }}/>
    </View>
    </SafeAreaView>
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: normalize(22),
        backgroundColor: '#fff'
    }

})
