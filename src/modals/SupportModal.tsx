import {useEffect, useState} from "react";
import {
    useChatById,
    getCurrentUser,
    loadOrCreateChat,
    sendMessage,
    setChatActive,
    uploadImage,
    useAppSelector,
    chatType,
    messageType
} from "@shared";
import {FlatList, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialIcons";
import {launchImageLibrary} from "react-native-image-picker";


const uploadPhoto = async () => {
    try {
        const userInstance = getCurrentUser();
        const options: any = {
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: true,
        };

        const res = await launchImageLibrary(options);
        const uri = res?.assets && res.assets[0].uri;

        const imageURL = await uploadImage({uri, path: 'chats/pictures/'});
        return imageURL;
    } catch (e) {
        console.log(e);
    }
    return '';
}

const ChatItem = (message: messageType) => {
    const [isOpen, setOpen] = useState(false);
    if (message?.isFromSystem) {
        return <View style={{alignSelf: 'center'}}><Text>{!message.isEndMessage && message.text}</Text></View>
    }
    return <TouchableOpacity
        style={{
            marginHorizontal: 4,
            padding: 12,
            marginBottom: 12,
            backgroundColor: '#d0bee3',
            borderRadius: 10,
            maxWidth: '75%',
            alignItems: `flex-${message?.isFromAdmin ? 'start' : 'end'}`,
            alignSelf: `flex-${message?.isFromAdmin ? 'start' : 'end'}`,
        }}
        onPress={()=>{
        setOpen((prevState)=>!prevState);
    }}>
            <View style={{}}>
                {
                    message.photoURL && <Image source={{uri: message.photoURL}} style={{minWidth: 152, minHeight: 152, width: '100%'}}/>
                }
            <Text>{message.text}</Text>
        </View>
        {isOpen && <Text style={{
            marginTop: 8,
            fontSize: 12,
            alignSelf: `flex-${message?.isFromAdmin ? 'start' : 'end'}`,
        }}>{isOpen && message.date}</Text> }
    </TouchableOpacity>
}

const ChatInput = ({chat}:{chat: chatType}) => {
    const user = useAppSelector((state) => state.user.user);
    const [text, setText] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [isPhotoShown,setPhotoShown] = useState(false);

    return <View style={{
        width: "100%",
        alignItems: 'flex-start',
        backgroundColor: '#e1dede'
    }}>
        {
            isPhotoShown && photoURL && <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', padding: 4}}>
            <TouchableOpacity onPress={()=>{
                setPhotoURL('');
                setPhotoShown(false);
            }} style={{
                borderRadius: 10,
                paddingHorizontal: 18,
                paddingVertical: 9,
                backgroundColor: '#ffc8c8'
            }}>
                <Text>
                    Remove
                </Text>
            </TouchableOpacity>
                <Image source={{uri: photoURL}} style={{width: 128, height: 128}} />
                <TouchableOpacity
                    style={{
                        borderRadius: 10,
                        paddingHorizontal: 18,
                        paddingVertical: 9,
                        backgroundColor: '#bfb1e7'
                    }}
                    onPress={()=>{
                    uploadPhoto().then((url: string)=>{
                        setPhotoURL(url);
                    })
                }}>
                    <Text>
                        Change
                    </Text>
                </TouchableOpacity>
            </View>
        }
    <View style={{
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 64,
        backgroundColor: '#e7d7e8'
    }}>
        <View>
        <TouchableOpacity onPress={()=>{
            if(photoURL){
                setPhotoShown((prevState)=>!prevState)
                return;
            }
            uploadPhoto().then((url: string)=>{
                    setPhotoURL(url);
                })
        }}>
            <Icon size={28} name={'insert-photo'} />
            {
                photoURL && <View style={{borderRadius: 50,backgroundColor: '#333', padding: 4, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: '#FFF'}}>1</Text>
                </View>
            }

        </TouchableOpacity>
        </View>
        <TextInput
            multiline
            onChangeText={setText}
            value={text}
            style={{
            borderWidth: .5,
            borderRadius: 5,
            borderColor: '#796f7a',
            padding: 5,
            width: '70%',
            height: 62
        }}/>

        <TouchableOpacity onPress={()=>{
            const textToSend = text.replaceAll('\n', '');
            if(textToSend.replaceAll(' ', '')) {
                sendMessage(textToSend, chat?.messages, user, photoURL).then(() => {
                    setText('');
                    setPhotoURL('');
                });
                return;
            }
            Toast.show({type: 'error', text1: 'Message is empty'})
        }}>
            <Icon size={28} name={'send'} />
        </TouchableOpacity>
    </View>
    </View>
}

const Chat = () => {
    const user = useAppSelector((state)=>state.user.user);
    const chat = useChatById(user);
    let listRef: any;

    const endMessage : messageType = {
        text: 'EOC',
        isFromSystem: true,
        isEndMessage: true,
        date: '',
        from: 'System'
    }

    useEffect(() => {
        setTimeout(()=>listRef.scrollToEnd({animated: true}), 0)
    }, [chat, listRef]);

    return <View style={{width: '100%', flex: 1}}>
        <FlatList
            ref={(ref)=> {
                listRef = ref;
                }
            }
            data={chat?.messages ? [...chat.messages, endMessage] : []} renderItem={({item})=><ChatItem {...item}/>} />
        <ChatInput chat={chat} />
    </View>;
}

const SupportChat = () => {
    const [isLoading, setLoading] = useState(true);
    const [isChatActive, setActive] = useState(false);
    const [text, setText] = useState('');

    const user = useAppSelector((state)=>state.user.user);

    useEffect(() => {
        loadOrCreateChat(user).then((isActive)=>{
            setLoading(false);
            setActive(isActive);
        });
    }, []);
    const onClickStart = () => {
        if(!text){
            Toast.show({type: 'error', text1: 'Error!', text2: 'First message is empty.'});
            return;
        }
        setLoading(()=>true)
        setChatActive(user.id, text, user).then(()=>{
            setLoading(()=>false);
            setActive(()=>true)
        });
    }

    return <View style={{flex: 1, alignItems: isChatActive ? "flex-start" : "center", justifyContent: isChatActive ? "flex-start" : 'center'}}>
        {
            isLoading ? <Text>Loading...</Text> :
                isChatActive ? <Chat /> : <View style={{
                    width: 280,
                    gap: 4,
                    paddingHorizontal: 12,
                    paddingVertical: 24,
                    borderRadius: 10,
                    backgroundColor: '#f3f3f3'
                }}>
                    <Text style={{fontSize: 18, alignSelf: 'center', marginBottom: 12}}>Support chat</Text>
                    <Text>Write your question: </Text>
                    <TextInput onChangeText={setText} value={text} multiline style={{borderWidth: .4, borderRadius: 5, padding: 5}} />
                    <TouchableOpacity onPress={onClickStart} style={{padding: 5, alignSelf: 'center', borderRadius: 10, backgroundColor: '#d9acac', marginTop: 12}}>
                        <Text style={{fontSize: 18}}>
                            Start chat
                        </Text>
                    </TouchableOpacity>
            </View>
        }
    </View>
}

export default SupportChat;
