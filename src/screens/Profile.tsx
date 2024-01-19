import { ScrollView, View } from "react-native";
import {useEffect, useState} from "react";
import {auth} from "../firebase";
import Toast from "react-native-toast-message";
import WrapperComponent from "../components/WrapperComponent";
import {launchImageLibrary} from "react-native-image-picker";
import {updateUserImage} from "../firebase/firebaseAPI";
import UserButton from "../components/UserButton";
import { FaqModal, FavoriteItemsModal, PremiumPlansModal, ReviewsModal, UserInfoModal } from '../modals/';
import UserNameAndIcon from "../components/UserNameAndIcon";

const updateImage = async({userInstance, setImage})=>{
    try {
        const options:any = {
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: true,
            width: 65,
            height: 65,
            quality: 0.1,
        };
        const res = await launchImageLibrary(options);
        const uri = res?.assets && res.assets[0].uri;
        await updateUserImage({userInstance, uri});
        setImage(uri);
    } catch (e){
        console.log(e);
    }
}

const Profile = ({user, setUser}) => {
    const [userInstance, setUserInstance] = useState(user);
    const [userInfo, setUserInfo] = useState(user?.providerData[0]);
    const [userName, setUserName] = useState('');
    const [CustomModal, setModal] = useState(null);
    const [currentModalName, setModalName] = useState('');
    const [userImage, setUserImage] = useState(userInstance.photoURL || user.photoURL ||'');
    const onPressLogout = () => {
            auth.signOut();
            setUser(null);
            Toast.show({type: 'success', text1: 'Sign out successful'});
    }

    useEffect(() => {
        const name = user.displayName || userInfo?.displayName || userInfo?.email || user ?.email || user?.phoneNumber;
        setUserInfo((userInfo)=>{return{...userInfo, displayName:  name}});
        setUserName((userName)=>name);
        }, [user]);

    return <><WrapperComponent ItemModal={CustomModal} setModal={setModal} modalName={currentModalName} />
        <ScrollView style={{flex:1,backgroundColor:'#fff',paddingTop:24}}>
        <View style={{justifyContent:'center', flex: 1, width:350, alignSelf: 'center', maxWidth: '100%', alignItems: 'center', gap: 25,marginHorizontal:15}}>
            <UserNameAndIcon userInfo={userInfo} setUserImage={setUserImage} userInstance={userInstance} userName={userName} userImage={userImage} setUserName={setUserName} updateImage={updateImage}/>
        <View style={{gap: 5}}>

            <UserButton icon={'account'} onPressAction={()=>{
                setModal(()=>{return ()=><UserInfoModal props={{userInstance, setUserName, userName, userInfo,setUserImage,userImage,updateImage}}/>})
                setModalName("Personal Info");
            }} placeholder={"Personal Info"} />
            <UserButton icon={'progress-question'} iconSize={24} onPressAction={()=>{
                setModal(()=>{return ()=><FaqModal />})
                setModalName("Faq");
            }} placeholder={"FAQ"} />
            <UserButton icon={'star'} iconSize={24} onPressAction={()=>{
                setModal(()=>{return ()=><ReviewsModal />})
                setModalName("Reviews");
            }} placeholder={"Reviews"} />
        </View>
        <View style={{gap: 5}}>
            <UserButton icon={'layers'} onPressAction={()=>{
                setModal(()=>{return ()=><PremiumPlansModal user={userInstance} />})
                setModalName("Plans");
            }} placeholder={"Plans"} />
            <UserButton icon={'heart'} iconSize={24} onPressAction={()=>{
                setModal(()=>{return ()=><FavoriteItemsModal user={userInstance} />});
                setModalName("Favorite");
            }} placeholder={"Favorite"} />
            <UserButton icon={''} onPressAction={onPressLogout} placeholder={""} />
        </View>
        <View style={{gap: 5}}>
            <UserButton icon={''} onPressAction={onPressLogout} placeholder={""} />
            <UserButton icon={''} iconSize={24} onPressAction={onPressLogout} placeholder={""} />
        </View>
        <UserButton icon={'logout'} onPressAction={onPressLogout} placeholder={"Logout"} />
    </View>
        </ScrollView></>;
}


export default Profile;
