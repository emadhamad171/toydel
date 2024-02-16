import { ScrollView, View,SafeAreaView} from "react-native";
import { useState } from "react";
import { FaqModal, FavoriteItemsModal, PremiumPlansModal, ReviewsModal, UserInfoModal, SupportModal, SettingsModal} from '../modals/';
import { onPressLogout} from "../firebase/firebaseAPI";
import {WrapperComponent, UserNameAndIcon, UserButton} from "../components";
import {normalize, updateImage} from "../helpers";


const Profile =({user, setUser,updateUser}) =>{
    const [CustomModal, setModal] = useState(null);
    const [currentModalName, setModalName] = useState('');
    const [userName, setUserName] = useState(user.displayName);
    const [userImage, setUserImage] = useState(user.photoURL);


    return <>
        <WrapperComponent ItemModal={CustomModal} setModal={setModal} modalName={currentModalName} />
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center',paddingVertical: normalize(20)}} style={{flex:1, backgroundColor:'#fff'}}>
            <View style={{ maxWidth:350, alignSelf: 'center', width: '95%', alignItems: 'center', gap: normalize(28), marginHorizontal:15}}>
                <UserNameAndIcon user={user} userName={userName} setUserName={setUserName} updateImage={()=>updateImage({setUserImage})}/>
                <View style={{gap: 5}}>
                    <UserButton icon={'account'} onPressAction={()=>{
                        setModal(()=>{return ()=><UserInfoModal props={{user, setUserName, userName, userInfo: user,setUserImage,userImage,updateImage: ()=>updateImage({setUserImage})}}/>})
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
                        setModal(()=>{return ()=><PremiumPlansModal user={user} updateUser={updateUser}/>})
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
                    <UserButton icon={'cog-outline'} iconSize={24} onPressAction={()=>{
                        setModal(()=>{return ()=><SettingsModal />})
                        setModalName("Settings");
                    }} placeholder={"Settings"} />
                </View>
                <UserButton icon={'logout'} onPressAction={()=>onPressLogout({setUser: setUser})} placeholder={"Logout"} />
            </View>
        </ScrollView>
        </SafeAreaView>
    </>;
}

export default Profile;
