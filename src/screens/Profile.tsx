import {AppRegistry, FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useEffect, useRef, useState} from "react";
import {updateProfile} from 'firebase/auth'
import {auth} from "../firebase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EvilIcon from 'react-native-vector-icons/FontAwesome'
import {StyleSheet} from "react-native";
import Toast from "react-native-toast-message";
import Modal from "react-native-modal";
import {launchImageLibrary} from "react-native-image-picker";
import {StatusBar} from "expo-status-bar";
import Input from "../components/Input";
import {styles} from "../styles/authorization";
import ContinueButton from "../components/ContinueButton";
import App from "../../App";
import getAppKeys = AppRegistry.getAppKeys;

const updateName = async ({user, name}) => {
    await updateProfile(user,{displayName: name});
}
const updateImage = async({userInstance, user})=>{
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
        const uri = res?.assets && res.assets[0].base64;
       await updateProfile(userInstance, {photoURL: "https://freight.cargo.site/t/original/i/c511067eb5c64bbe81b3c66c11edbd2533233dcaff898525f899d158680a76ce/gasmask_someart_friendly_faces.jpg"});
        // user.photoURL=uri;
    } catch (e){
        console.log(e);
    }
}
const HeaderText = ({text,style, ...props}:{text:string, style?:any})=>{

    return <Text style={style || {...styles.subHeaderText, marginBottom: 4}} {...props}>
        {text}
    </Text>
}
const UserIcon = ({user, userInstance}) => {
    return <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{updateImage({userInstance:userInstance, user: user});}}>
        {user?.photoURL || userInstance?.photoURL ? <Image style={profileStyles.userPhoto} source={{uri: userInstance.photoURL || user.photoURL}} /> : <Icon style={{alignItems:'center', justifyContent: 'center',padding:5,backgroundColor: '#aaa',borderRadius: 50}} name={'account'} size={86} />}
    <EvilIcon name={'gear'} style={{padding: 0, margin: 0, position:'absolute', right:-2,top:4}} color={"#8a7064"} size={24}/>
    </TouchableOpacity>
}

const AnswerComponent =({text, isDisplayed})=>{
    return <View style={{display:isDisplayed?'flex': 'none', marginBottom:14,marginHorizontal: 5}}>
        <Text>
            {text}
        </Text>
    </View>
}

const UserNameAndIcon = ({ userInfo, userInstance, userName, setUserName})=>{

    const userNameInput = useRef(null);
    const [isUserNameChanged, handleUsernameChange] = useState(false);
    const [isUserNameValid, handleUserNameValid] = useState(true);
    useEffect(() => {
        handleUsernameChange(userName!==userInfo.displayName);
        handleUserNameValid(userName.length>0 && (userName.length<12 || userName.length < userInfo.displayName));
    }, [userName]);
    const handleUserNameChangeSubmit = () =>{
        if(isUserNameChanged && isUserNameValid) {
            updateName({user:userInstance, name: userName});
            Toast.show({type:'success', text1:'Name changed!', swipeable: true, visibilityTime:800});
            userNameInput.current.blur();
        } else {
            if(!isUserNameValid) {
                setUserName(userInfo.displayName);
                Toast.show({type:'info', text1:'Name isn`t valid!', swipeable: true, visibilityTime:800});
                return;
            }
            if(!isUserNameChanged) {
                if(userNameInput.current.isFocused()) {
                    userNameInput.current.blur();
                } else {
                    userNameInput.current.focus()
                }
            }
        }
    }
    return <View style={{flexDirection: 'row', alignItems:'center',width:'100%'}}>
        <UserIcon user={userInfo} userInstance={userInstance} />
        <View style={{gap: 5, flexGrow: 1,alignItems:'center', justifyContent: 'center'}}>
            <View style={{flexDirection: 'row'}}>
                <TextInput ref={userNameInput}  onSubmitEditing={()=>{handleUserNameChangeSubmit()}} value={userName} onChangeText={(text)=>{(text.length<13 || text.length < userName.length) && setUserName(text)}} style={profileStyles.headerText} />
                <TouchableOpacity onPress={()=>{handleUserNameChangeSubmit()}}>
                    <Icon style={{padding: 0,marginLeft:5}} color={isUserNameChanged ? isUserNameValid ? '#56a10b' : '#f55' : '#5e3520'} name={isUserNameChanged ? isUserNameValid ? 'check' : 'close' :'pencil'} size={18}/>
                </TouchableOpacity>
            </View>
            <Text style={profileStyles.subText}>
                I Love ToyApp!
            </Text>
        </View>
    </View>
}

const FaqSection = ({index,item,currentId}) =>{
    return <View style={{gap: 10,marginTop: 5}}>
        <UserButton icon={'progress-question'} chevronIcon={index===currentId ? 'chevron-down' : 'chevron-right'} iconSize={24} onPressAction={item.question.onPressAction(index===currentId ? -1 : index)} placeholder={item.question.placeholder} />
        <AnswerComponent isDisplayed={index===currentId} text={item.answer.text} />

    </View>
}

const FaqModal = () => {
    const [answerDisplayedId, setAnswerDisplayed] = useState(-1);
    const QuestionsAndAnswers = [
        {
            question: {
                placeholder: 'Why ToyDel?',
                onPressAction: (id:number)=>{
                   return ()=>setAnswerDisplayed(id);
                }
            },
            answer: {
                text: 'Because asodmdoasmdo amdoasm odmasodmoa smdoasmdo amsdom asodm asom doasmd oams odmas dmaosm doasm doasmdo amso dmaso mdaos mdoam sodmao mdosa mdoams odmas omdo asmd oamsodma somdomasomom asdma odmaosm '
            }
        },
        {
            question: {
                placeholder: 'Payments',
                onPressAction: (id:number)=>{
                    return ()=>setAnswerDisplayed(id);
                }
            },
            answer: {
                text: 'Because asodmdoasmdo amdoasm odmasodmoa smdoasmdo amsdom asodm asom doasmd oams odmas dmaosm doasm doasmdo amso dmaso mdaos mdoam sodmao mdosa mdoams odmas omdo asmd oamsodma somdomasomom asdma odmaosm '
            }
        },
        {
            question: {
                placeholder: 'Security',
                onPressAction: (id:number)=>{
                    return ()=>setAnswerDisplayed(id);
                }
            },
            answer: {
                text: 'Because asodmdoasmdo amdoasm odmasodmoa smdoasmdo amsdom asodm asom doasmd oams odmas dmaosm doasm doasmdo amso dmaso mdaos mdoam sodmao mdosa mdoams odmas omdo asmd oamsodma somdomasomom asdma odmaosm '
            }
        },
        {
            question: {
                placeholder: 'Big Bob',
                onPressAction: (id:number)=>{
                    return ()=>setAnswerDisplayed(id);
                }
            },
            answer: {
                text: 'Because asodmdoasmdo amdoasm odmasodmoa smdoasmdo amsdom asodm asom doasmd oams odmas dmaosm doasm doasmdo amso dmaso mdaos mdoam sodmao mdosa mdoams odmas omdo asmd oamsodma somdomasomom asdma odmaosm '
            }
        },
        {
            question: {
                placeholder: 'Developers',
                onPressAction: (id:number)=>{
                    return ()=>setAnswerDisplayed(id);
                }
            },
            answer: {
                text: 'Because asodmdoasmdo amdoasm odmasodmoa smdoasmdo amsdom asodm asom doasmd oams odmas dmaosm doasm doasmdo amso dmaso mdaos mdoam sodmao mdosa mdoams odmas omdo asmd oamsodma somdomasomom asdma odmaosm '
            }
        }
    ]
    return <View style={{marginTop: 24}}>
        <FlatList data={QuestionsAndAnswers} renderItem={({item,index})=><FaqSection item={item} index={index} currentId={answerDisplayedId}/>} />
    </View>
}
const InfoModal = ({props}) =>{
    const {userInstance, userInfo, userName, setUserName} = props;
    const [userModalName, setUserModalName]=useState(userName);
    const handleModalNameChange = (name:string) =>{
        setUserModalName(name);
        setUserName(name);
    }
    return <ScrollView style={{flex: 1}}>
        <View style={{gap: 15, flex: 1,justifyContent:'center', marginTop:14}}>
        <UserNameAndIcon userInfo={userInfo} userInstance={userInstance} userName={userModalName} setUserName={handleModalNameChange}/>
        <View>
            <HeaderText text={"Email"} />
        <Input onChangeAction={()=>{}} placeholder={userInfo?.email || 'Nothing'} readOnly={true} style={{...styles.emailInput, backgroundColor: '#eee'}}/>
        </View>
        <View>
            <HeaderText text={"Phone Number"} />
            <Input onChangeAction={()=>{}} placeholder={userInfo?.phoneNumber || '+0-(123)-45-678-9123'} readOnly={true} style={{...styles.emailInput, backgroundColor: '#eee'}}/>
        </View>
        <View>
            <HeaderText text={"Bio"} />
            <Input onChangeAction={()=>{}} placeholder={userInfo?.phoneNumber || 'Bio'} multiline={true} style={{...styles.emailInput, backgroundColor: '#eee'}}/>
        </View>
        <ContinueButton text={"Save"} style={{backgroundColor:'#7c108d',marginTop: 5}} handleContinueClick={()=>{}}/>
        </View>
    </ScrollView>
}

function WrapperComponent({ItemModal, setModal, modalName}) {
    return (
            <Modal propagateSwipe style={{padding: 0, margin: 0, flex:1}} swipeDirection="left" onSwipeComplete={()=>{setModal(null)}} animationInTiming={600} animationOutTiming={500} animationOut={'slideOutDown'} coverScreen={false} backdropOpacity={0} isVisible={!!ItemModal} onBackdropPress={() => setModal(null)}>
                <View style={{backgroundColor: '#fff',borderRadius:0, paddingTop:20,paddingHorizontal:25, width:"100%", height: '100%'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <TouchableOpacity style={{backgroundColor:'#ccc',borderRadius:50,width:40,height:40,alignItems:'center',justifyContent:'center', marginRight: 32}} onPress={()=>setModal(null)}>
                            <Icon name={'chevron-left'} size={32} />
                        </TouchableOpacity>
                        <Text style={{fontSize: 24}}>{modalName}</Text>
                    </View>
                    {!!ItemModal && <ItemModal />}
                </View>
            </Modal>
    );
}


const UserButton = ({placeholder,chevronIcon='chevron-right',iconColor='#000', icon, iconSize=22, iconProps={}, buttonProps={}, onPressAction,iconStyle={borderRadius: 55, backgroundColor: '#eee', alignItems: 'center', width:36,height:36,  justifyContent: 'center'}, buttonStyle = {flexDirection: 'row', alignItems: 'center',gap: 10,width:'100%', paddingHorizontal:16, paddingVertical: 8, borderRadius: 10, backgroundColor:'#dcdada'}})=> {
    return <TouchableOpacity style={buttonStyle} onPress={onPressAction} {...buttonProps}>

        <View style={{...iconStyle}}>
            <Icon {...iconProps} style={{padding: 0, margin: 0}} color={iconColor} name={icon} size={iconSize}/>
        </View>
        <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'space-between',flexGrow:1}}>
        <Text style={profileStyles.baseText}> {placeholder} </Text>
            <Icon name={chevronIcon} size={16}/>
        </View>
    </TouchableOpacity>
}
const Profile = ({user, setUser}) => {
    const [userInstance, setUserInstance] = useState(user);
    const [userInfo, setUserInfo] = useState(user?.providerData[0]);
    const [userName, setUserName] = useState('');
    const [CustomModal, setModal] = useState(null);
    const [currentModalName, setModalName] = useState('');

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
        <ScrollView style={{flex:1,backgroundColor:'#fff',marginTop:24}}>
        <View style={{justifyContent:'center', flex: 1, width:350, alignSelf: 'center', maxWidth: '100%', alignItems: 'center', gap: 25,marginHorizontal:15}}>
            <UserNameAndIcon userInfo={userInfo} userInstance={userInstance} userName={userName} setUserName={setUserName}/>
        <View style={{gap: 5}}>

            <UserButton icon={'account'} onPressAction={()=>{
                setModal(()=>{return ()=><InfoModal props={{userInstance, setUserName, userName, userInfo}}/>})
                setModalName("Personal Info");
            }} placeholder={"Personal Info"} />
            <UserButton icon={'progress-question'} iconSize={24} onPressAction={()=>{
                setModal(()=>{return ()=><FaqModal />})
                setModalName("Faq");
            }} placeholder={"FAQ"} />
            <UserButton icon={'star'} iconSize={24} onPressAction={()=>{
                setModal(()=>{return ()=><FaqModal />})
                setModalName("Reviews");
            }} placeholder={"Reviews"} />
        </View>
        <View style={{gap: 5}}>
            <UserButton icon={''} onPressAction={onPressLogout} placeholder={""} />
            <UserButton icon={''} iconSize={24} onPressAction={onPressLogout} placeholder={""} />
            <UserButton icon={''} onPressAction={onPressLogout} placeholder={""} />
        </View>
        <View style={{gap: 5}}>
            <UserButton icon={''} onPressAction={onPressLogout} placeholder={""} />
            <UserButton icon={''} iconSize={24} onPressAction={onPressLogout} placeholder={""} />
            <UserButton icon={''} onPressAction={onPressLogout} placeholder={""} />
        </View>
        <UserButton icon={'logout'} onPressAction={onPressLogout} placeholder={"Logout"} />
    </View>
        <StatusBar style="auto" hidden={true} />
        </ScrollView></>;
}

const profileStyles = StyleSheet.create({
    userPhoto: {
        borderRadius: 50,
        width: 100,
        height: 100,
        resizeMode: 'stretch'
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600'
    },
    baseText: {
        fontSize: 18,
    },
    subText: {
        fontSize: 16,
        fontWeight: '200'
    }
})

export default Profile;
