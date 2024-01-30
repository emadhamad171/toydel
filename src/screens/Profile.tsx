import { ScrollView, View } from "react-native";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import Toast from "react-native-toast-message";
import WrapperComponent from "../components/WrapperComponent";
import { launchImageLibrary } from "react-native-image-picker";
import { getCurrentUser, updateUserField, updateUserImage } from "../firebase/firebaseAPI";
import UserButton from "../components/UserButton";
import { FaqModal, FavoriteItemsModal, PremiumPlansModal, ReviewsModal, UserInfoModal } from '../modals/';
import UserNameAndIcon from "../components/UserNameAndIcon";
import { SupportModal } from "../modals";
import { unregisterIndieDevice } from "../notifications/index";


const Profile =({user, setUser}) =>{
    const [CustomModal, setModal] = useState(null);
    const [currentModalName, setModalName] = useState('');
    const [userName, setUserName] = useState(user.displayName);
    const [userImage, setUserImage] = useState(user.photoURL);

    const updateImage = async()=>{
        try {
            const userInstance = getCurrentUser();
            const options:any = {
                selectionLimit: 1,
                mediaType: 'photo',
                includeBase64: true,
            };
            const res = await launchImageLibrary(options);
            const uri = res?.assets && res.assets[0].uri;
            uri && await updateUserImage({userInstance, uri});
            uri && setUserImage(uri);
        } catch (e){
            console.log(e);
        }
    }

    const onPressLogout = async () => {
        await unregisterIndieDevice(auth.currentUser.uid, 19000, 'l5ddGPLeP7FdsO5c8gy4Dl');
        await auth.signOut();
        setUser(null);
        Toast.show({type: 'success', text1: 'Sign out successful'});
    }

    return <><WrapperComponent ItemModal={CustomModal} setModal={setModal} modalName={currentModalName} />
        <ScrollView style={{flex:1,backgroundColor:'#fff',paddingTop:24}}>
            <View style={{justifyContent:'center', flex: 1, width:350, alignSelf: 'center', maxWidth: '100%', alignItems: 'center', gap: 25,marginHorizontal:15}}>
                <UserNameAndIcon user={user} userName={userName} setUserName={setUserName} updateImage={updateImage}/>
                <View style={{gap: 5}}>
                    <UserButton icon={'account'} onPressAction={()=>{
                        setModal(()=>{return ()=><UserInfoModal props={{user, setUserName, userName, userInfo: user,setUserImage,userImage,updateImage}}/>})
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
                        setModal(()=>{return ()=><PremiumPlansModal user={user} />})
                        setModalName("Plans");
                    }} placeholder={"Plans"} />
                    <UserButton icon={'heart'} iconSize={24} onPressAction={()=>{
                        setModal(()=>{return ()=><FavoriteItemsModal user={user} />});
                        setModalName("Favorite");
                    }} placeholder={"Favorite"} />
                    <UserButton icon={''} onPressAction={onPressLogout} placeholder={""} />
                </View>
                <View style={{gap: 5}}>
                    <UserButton icon={'account-question'} onPressAction={()=>{
                        setModal(()=>{return ()=><SupportModal user={user} />})
                        setModalName("Support Chat");
                    }} placeholder={"Support"} />
                    <UserButton icon={''} iconSize={24} onPressAction={onPressLogout} placeholder={""} />
                </View>
                <UserButton icon={'logout'} onPressAction={onPressLogout} placeholder={"Logout"} />
            </View>
        </ScrollView></>;
}

export default Profile;
