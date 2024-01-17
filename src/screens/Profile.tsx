import {
    FlatList,
    Image,
    ScrollView,
    StyleProp,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {useEffect, useRef, useState} from "react";
import {updateProfile} from 'firebase/auth'
import {auth, fStorage} from "../firebase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EvilIcon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet} from "react-native";
import Toast from "react-native-toast-message";
import Modal from "react-native-modal";
import {launchImageLibrary} from "react-native-image-picker";
import Input from "../components/Input";
import {styles} from "../styles/authorization";
import ContinueButton from "../components/ContinueButton";

import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {imgStorage} from "../firebase";
import {v4} from 'uuid'
import {collection, getDocs, query, where} from "firebase/firestore";
const updateName = async ({user, name}) => {
    await updateProfile(user,{displayName: name});
}
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
        const imgs = ref(imgStorage,`profile/pictures${v4()}`);
        const img = await fetch(uri);
        const bytes = await img.blob();
        uploadBytes(imgs, bytes).then(data =>
            getDownloadURL(data.ref).then(
                url => updateProfile(userInstance, {photoURL: url}).then(
                    ()=>{setImage(url);}
                )
            )
        )
    } catch (e){
        console.log(e);
    }
}

const Star = ({color = '#e5b600', size=16, starName = 'star'}) =><Icon name={starName} color={color} size={size} />
const HeaderText = ({text,style, ...props}:{text:string, style?:any})=>{

    return <Text style={style || {...styles.subHeaderText, marginBottom: 4}} {...props}>
        {text}
    </Text>
}
const UserIcon = ({userInstance,userImage, setUserImage}) => {
    return <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{updateImage({userInstance:userInstance, setImage:setUserImage});}}>
        {userImage ? <Image style={profileStyles.userPhoto} source={{uri: userImage}} /> : <Icon style={{alignItems:'center', justifyContent: 'center',padding:5,backgroundColor: '#aaa',borderRadius: 50}} name={'account'} size={86} />}
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

const UserNameAndIcon = ({userImage, setUserImage, userInfo, userInstance, userName, setUserName})=>{

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
        <UserIcon userImage={userImage} setUserImage={setUserImage} userInstance={userInstance} />
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
    const {userInstance, userInfo, userName, setUserName,setUserImage, userImage} = props;
    const [userModalName, setUserModalName]=useState(userName);
    const handleModalNameChange = (name:string) =>{
        setUserModalName(name);
        setUserName(name);
    }
    return <ScrollView style={{flex: 1}}>
        <View style={{gap: 15, flex: 1,justifyContent:'center', marginTop:14}}>
        <UserNameAndIcon setUserImage={setUserImage} userImage={userImage} userInfo={userInfo} userInstance={userInstance} userName={userModalName} setUserName={handleModalNameChange}/>
        <View>
            <HeaderText text={"Email"} />
        <Input onChangeAction={()=>{}} placeholder={userInfo?.email || 'Nothing'} readOnly={true} style={{...styles.emailInput, backgroundColor: '#eee'}}/>
        </View>
        <View>
            <HeaderText text={"Phone Number"} />
            <Input onChangeAction={()=>{}} placeholder={userInfo?.phoneNumber || '+0-(123)-45-678-9123'} readOnly={true} style={{...styles.emailInput, backgroundColor: '#eee'}}/>
        </View>
            <View>
                <HeaderText text={"Location"} />
                <Input onChangeAction={()=>{}} placeholder={'Kiyv, st. Vasylya Stusa 35B'} readOnly={true} style={{...styles.emailInput, backgroundColor: '#eee'}}/>
            </View>
        <View>
            <HeaderText text={"Bio"} />
            <Input onChangeAction={()=>{}} placeholder={userInfo?.phoneNumber || 'Bio'} multiline={true} style={{...styles.emailInput, backgroundColor: '#eee'}}/>
        </View>
        <ContinueButton text={"Save"} style={{backgroundColor:'#7c108d',marginTop: 5}} handleContinueClick={()=>{}}/>
        </View>
    </ScrollView>
}

const ReviewComponent = ({item})=>{
    const filledStars = new Array(Math.floor(item.rate)).fill(<Star />);
    const starRate = [...filledStars]
    const unfiledStars = new Array(5-Math.round(item.rate)).fill(<Star starName={'star-outline'} />);
    if(item.rate%1) starRate.push(<Star starName={'star-half-full'}/>)
    starRate.push(unfiledStars);
return <View style={{flexDirection: 'row', gap :18, marginTop: 24}}>
    <Image source={{uri: item.photo}} style={{borderRadius: 50, width: 50, height: 50}} />
    <View style={{backgroundColor:'#e0e0e0', borderRadius: 30, padding: 15, width: 270}}>
        <View style={{flexGrow:1, flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{color: '#5d5d5d'}}>{item.date}</Text>
            <TouchableOpacity onPress={()=>{}}>
            <MaterialIcon name={'more-horiz'} size={24} style={{padding: 0, margin: 0}}/>
            </TouchableOpacity>
        </View>
        <Text style={{...styles.subHeaderText, marginBottom: 2}}>{item.name}</Text>
        <Text>{starRate}</Text>
        <Text>{item.text}</Text>
    </View>
</View>
}
const ReviewModal = ()=>{
    const reviews =[
        {
            date: '2023/03/16',
            photo: 'https://www.siasat.com/wp-content/uploads/2022/02/IMG_18022022_181903_1200_x_900_pixel.jpg',
            rate: 4.5,
            name: 'Huan',
            text: 'Very good!'
        },
        {
            date: '2023/03/19',
            photo: 'https://www.siasat.com/wp-content/uploads/2022/02/IMG_18022022_181903_1200_x_900_pixel.jpg',
            rate: 4,
            name: 'Samir',
            text: 'I was a poor and hungry man, but after this app came into my life, I became a multi-millionaire! Thank you!'
        },
        {
            date: '2023/03/15',
            photo: 'https://www.siasat.com/wp-content/uploads/2022/02/IMG_18022022_181903_1200_x_900_pixel.jpg',
            rate: 5,
            name: 'Roman',
            text: 'Very nice!'
        }
    ]
    return <View style={{marginTop: 24}}>
        <FlatList data={reviews} renderItem={({item})=><ReviewComponent item={item}/>} />
    </View>
}

const PlanComponent = ({backgroundColor, price, name, description, features, style, PlanSign,...props}:{backgroundColor:string, price:number, name:string, description:string, features:string[], style?:StyleProp<View>, PlanSign?:any})=>{


    return <View style={{...profileStyles.defaultPlanContainer, backgroundColor: backgroundColor || '#999'}}>
        <Text style={{...profileStyles.headerText, alignSelf: 'center'}}>{name}</Text>
        <View style={{flexDirection: 'row', justifyContent:'space-between',marginTop: 14}}>
            <FlatList data={features} renderItem={({item})=><Text style={{fontSize: 16}}><Icon name={"check"} color={'#4c4'} size={16} /> {item} </Text>} />
            <View>
         <Text style={{...profileStyles.baseText,alignSelf:'flex-end', textDecorationLine:'line-through', fontSize:12, color:'#555'}}>{price}$</Text>
            <Text style={{...profileStyles.baseText,alignSelf:'flex-end', fontWeight:'400', color:'#111'}}>{price*0.85}$</Text>
            </View>
        </View>
        <Text style={{...profileStyles.subText, marginTop: 12}}>{description}</Text>
        <ContinueButton handleContinueClick={()=>{}} text={'Buy'} style={{marginTop: 14,marginBottom: 0, borderRadius:15, backgroundColor: '#4d4d4d'}}  />
        {!!PlanSign && <PlanSign />}
    </View>
}
const PlanTopSign = ({backgroundColor, text, iconName,iconSize, style, ...props}:{backgroundColor?:string, text?:'string', iconName?:string,iconSize?:number, style?:any})=>{
    return <View style={{...profileStyles.defaultPlanSign, backgroundColor: backgroundColor || '#cca732'}}>
        {!!iconName && <Text style={{marginRight: -2}}><Icon name={iconName} style={{margin: 0, padding: 0}} padding={0} size={iconSize || 18} /> </Text>}
    </View>
}
const PlansModal = ({user}) => {
    //TODO: Get current user plan
    const [currentPlan,setCurrentPlan] = useState(null);
    //TODO: Get plans from database
    const plans = [{
        price: 400,
        backgroundColor: '#d29f6c',
        name: 'Bronze',
        description: 'Regular plan and blablabla bla blabla blaalb a lab blabla. Some bla bla bla and blablabla.',
        features: ['1 toy per month', 'Change toys some times', 'Big boss required'],
        Sign: ()=><PlanTopSign iconName={'star-outline'}/>
    },{
        price: 960,
        backgroundColor: '#ffe44b',
        name: 'Gold',
        description: 'Regular plan and blablabla bla blabla blaalb a lab blabla. Some bla bla bla and blablabla.',
        features: ['4 toy per month', 'Change toys every week', 'You are big boss'],
        Sign: ()=><PlanTopSign backgroundColor={"#d66"} iconName={'check-decagram-outline'}/>
    },{
        price: 780,
        backgroundColor: '#d6e1e3',
        name: 'Silver',
        description: 'Regular plan and blablabla bla blabla blaalb a lab blabla. Some bla bla bla and blablabla.',
        features: ['2 toy per month', 'Change toys some times', 'Big boss required'],
        Sign: ()=><PlanTopSign iconName={'star'}/>
    }]

    return <View style={{marginTop: 14}}>
    <FlatList style={{paddingBottom:14}} data={plans} renderItem={({item})=><PlanComponent backgroundColor={item.backgroundColor} price={item.price} name={item.name} description={item.description} features={item.features} PlanSign={item.Sign} />} />
    </View>
}
const loadData = async ({setFavoriteList, userID}) =>{
    const favoriteItemsRef= query(collection(fStorage, "users"), where('id','==',userID));
        getDocs(favoriteItemsRef).then((favoriteDocsIds)=>{
            const fetchedFavoriteData :{id:string, favoriteList:string[]} = favoriteDocsIds.docs.map(el=>{return {...el.data(), id:el.id}});
            const itemRef=query(collection(fStorage, "items"), where('id','in',fetchedFavoriteData[0].favoriteList));
            getDocs(itemRef).then((favoriteItems)=>{
                const fetchedItems = favoriteItems.docs.map(el=>{
                    return {...el.data(), id: el.id};
                });
                setFavoriteList(fetchedItems);
            })
        });
}
const FavoriteComponent = ({list,setFavoriteToyList,item}) =>{
    const {name, brand, category, id ,description, price, rentPrice, isIncludedInPlan, photo} = item;
    const removeItemFromFavoriteList = () =>{
        setFavoriteToyList(list.filter((listItem)=>{if(listItem.id!==id) return listItem;}))
    }
    return <View style={{flexDirection: 'row', padding: 10, borderRadius: 15}}>
        <TouchableOpacity onPress={removeItemFromFavoriteList} style={{position: 'absolute', zIndex: 4, top: 15, left:15}}><Icon name={'heart'} style={{zIndex: 4, borderRadius: 50, padding: 5, backgroundColor: '#ccc'}} color={'#522d7e'} size={22}/></TouchableOpacity>
        <Image style={{width: 150, height: 150, borderRadius: 10, zIndex:2,borderColor:'#cccccc', borderWidth: 2}} source={{uri: photo}} />
        <View style={{backgroundColor:'#cccccc',borderColor:'#cccccc', borderWidth: 1,paddingRight: 15, width:'100%', maxWidth: 220, marginLeft: -10, borderTopRightRadius: 15, borderBottomRightRadius: 10, paddingLeft:20, paddingTop: 10}}>
            <Text numberOfLines={1} ellipsizeMode={"tail"} style={{fontSize: 16,color: '#522d7e', alignSelf: 'flex-start'}}>{name}</Text>
            <Text numberOfLines={2} ellipsizeMode={'tail'} style={{fontSize: 12, color: '#333',marginTop: 5}}>{description}</Text>
            <View style={{width: '100%', borderStyle: "dashed", borderWidth: 1, borderColor: '#555', borderRadius: 5, marginVertical: 8}}></View>
            <Text style={{fontSize: 12}}>Brand: {brand} </Text>
            <Text numberOfLines={1} ellipsizeMode={'clip'} style={{fontSize: 12}}>Category: {category.join(', ')}</Text>
            <Text style={{fontSize: 12, color: '#1f4f1a'}}>{isIncludedInPlan ? 'Included in base plan' : 'You can order it from us'}</Text>
        </View>
    </View>
}

const FavoriteModal = ({user}) =>{
    const [favoriteToyList, setFavoriteToyList] = useState(null);

    useEffect(() => {
        loadData({setFavoriteList: setFavoriteToyList, userID: user.uid})
    }, []);
    return <View style={{flex: 1, marginTop: 14}}>
        <FlatList data={favoriteToyList} renderItem={({item})=><FavoriteComponent list={favoriteToyList} setFavoriteToyList={setFavoriteToyList} item={item} /> } />
    </View>
}
function WrapperComponent({ItemModal, setModal, modalName}) {
    return (
            <Modal propagateSwipe style={{padding: 0, margin: 0, flex:1}} swipeDirection="left" onSwipeComplete={()=>{setModal(null)}} animationInTiming={600} animationOutTiming={500} animationOut={'slideOutDown'} coverScreen={false} backdropOpacity={0} isVisible={!!ItemModal} onBackdropPress={() => setModal(null)}>
                <View style={{backgroundColor: '#fff',borderRadius:0,paddingHorizontal:10,paddingTop:20, width:"100%", height: '100%'}}>
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
            <UserNameAndIcon userInfo={userInfo} setUserImage={setUserImage} userInstance={userInstance} userName={userName} userImage={userImage} setUserName={setUserName}/>
        <View style={{gap: 5}}>

            <UserButton icon={'account'} onPressAction={()=>{
                setModal(()=>{return ()=><InfoModal props={{userInstance, setUserName, userName, userInfo,setUserImage,userImage}}/>})
                setModalName("Personal Info");
            }} placeholder={"Personal Info"} />
            <UserButton icon={'progress-question'} iconSize={24} onPressAction={()=>{
                setModal(()=>{return ()=><FaqModal />})
                setModalName("Faq");
            }} placeholder={"FAQ"} />
            <UserButton icon={'star'} iconSize={24} onPressAction={()=>{
                setModal(()=>{return ()=><ReviewModal />})
                setModalName("Reviews");
            }} placeholder={"Reviews"} />
        </View>
        <View style={{gap: 5}}>
            <UserButton icon={'layers'} onPressAction={()=>{
                setModal(()=>{return ()=><PlansModal user={userInstance} />})
                setModalName("Plans");
            }} placeholder={"Plans"} />
            <UserButton icon={'heart'} iconSize={24} onPressAction={()=>{
                setModal(()=>{return ()=><FavoriteModal user={userInstance} />});
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
    },
    defaultPlanContainer: {
        alignSelf:'center',
        paddingHorizontal: 10,
        paddingTop: 10,
        marginBottom: 12,
        width: '100%',
        maxWidth: 330,
        borderRadius: 15,
        backgroundColor: '#999'
    },
    defaultPlanSign: {
        backgroundColor: '#ffd22d',
        position:'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top:0,
        right: 0,
        borderRadius: 50,
        padding: 5
    },
})

export default Profile;
