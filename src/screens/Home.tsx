import {RefreshControl, ScrollView, TouchableOpacity, View, Text, Image, FlatList, LogBox} from "react-native";
import Input from "../components/Input";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {useCallback, useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {launchImageLibrary} from "react-native-image-picker";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {fStorage, imgStorage} from "../firebase";
import {v4} from 'uuid'
import ContinueButton from "../components/ContinueButton";
import {addDoc, collection,getDocs} from 'firebase/firestore'
import Toast from "react-native-toast-message";
const FavoriteComponent = ({list,setFavoriteToyList,item}) =>{
    const {name, brand, category, id ,description, price, rentPrice, isIncludedInPlan, photo} = item;
    const removeItemFromFavoriteList = () =>{
        setFavoriteToyList(list.filter((listItem)=>{if(listItem.id!==id) return listItem;}))
    }
    return <View style={{flexDirection: 'row', padding: 10, borderRadius: 15}}>
        <TouchableOpacity onPress={removeItemFromFavoriteList} style={{position: 'absolute', zIndex: 4, top: 15, left:15}}><Icon name={'heart-outline'} style={{zIndex: 4, borderRadius: 50, padding: 5, backgroundColor: '#ccc'}} color={'#522d7e'} size={22}/></TouchableOpacity>
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
const addItem = async({name, description, price, rate,listItems, setListItems})=>{
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
        const id = v4();
        const imgs = ref(imgStorage,`item/pictures/${id}`);
        const img = await fetch(uri);
        const bytes = await img.blob();
        uploadBytes(imgs, bytes).then(data =>
            getDownloadURL(data.ref).then(
                url=> {
                    const itemRef = collection(fStorage, 'items');
                    const item = {name,description,price,rate,brand:'aboba', category: ['Fun', 'MacBook'],isIncludedInPlan: true,photo: url,id: id };
                    addDoc(itemRef,  item);
                    Toast.show({type:'success', text1:'Added successfully'});
                    setListItems([...listItems, item]);
                }
            )
        )
    } catch (e){
        console.log(e);
    }
}
const AddItem = ({setListItems,listItems}) => {
    const [name, setName] = useState('');
    const [description, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [rate, setRate] = useState('');
    return <View style={{alignItems: 'center', gap: 5, padding: 10, borderRadius: 10, backgroundColor: '#aaa', marginHorizontal: 10, marginTop: 10}}>
        <Input placeholder={"Name"} onChangeAction={(text:string)=>{setName(text)}} value={name} style={{backgroundColor: '#c9aaff',borderRadius: 10, width: 330, padding: 10, borderColor: '#f11'}} />
        <Input placeholder={"Description"} onChangeAction={(text:string)=>{setDesc(text)}} value={description} style={{backgroundColor: '#c9aaff',borderRadius: 10, width: 330, padding: 10, borderColor: '#f11'}} />
        <Input placeholder={"Price"} onChangeAction={(text:string)=>{setPrice(text)}} value={price} style={{backgroundColor: '#c9aaff',borderRadius: 10, width: 330, padding: 10, borderColor: '#f11'}} />
        <Input placeholder={"Rate: from 1 to 5"} onChangeAction={(text:string)=>{setRate(text)}} value={rate} style={{backgroundColor: '#c9aaff',borderRadius: 10, width: 330, padding: 10, borderColor: '#f11'}} />
        <ContinueButton handleContinueClick={()=>{addItem({name, description, price, rate, setListItems, listItems,})}} />
    </View>
}


const HeaderComponent = ({}) =>{
    const navigation = useNavigation();
    return <View style={{backgroundColor: '#a333ff',width: '100%', paddingVertical: 10, paddingHorizontal:10, flexDirection: 'row', justifyContent:'space-between'}}>
        <View style={{flexDirection: 'row', gap: 15, marginLeft: 5}}>
        <Icon name={'teddy-bear'} size={32} color={"#4f0bb2"}/>
        <TouchableOpacity style={{alignSelf:'center', backgroundColor: '#c29cff', borderRadius: 5, padding: 5}}>
            <Text>View Plans</Text>
        </TouchableOpacity>
            <TouchableOpacity >
                <MaterialIcon name={'not-listed-location'} size={28} color={"#fff2ee"}/>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', gap: 15, marginRight: 10}}>
            <TouchableOpacity>
            <Icon name={'bell-outline'} size={28} color={'#362270'}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name={'cart-outline'} size={28} color={'#362270'}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name={'account-outline'} size={28} color={'#362270'}/>
            </TouchableOpacity>
        </View>
    </View>
}
const SearchComponent = () =>{

    return <View style={{backgroundColor: '#a333ff', borderBottomStartRadius:10, borderBottomEndRadius:10,width: '100%', paddingBottom: 50, paddingTop:30}}>
        <View style={{flexDirection: 'row', position:'relative', maxWidth: 330,display: 'flex',alignSelf: 'center'}}>
        <Input placeholder={"Find your toy."} onChangeAction={(text:string)=>{}} value={''} style={{backgroundColor: '#c9aaff',borderRadius: 10, width: 330, padding: 10, borderColor: '#f11'}} />
        <Icon name={'magnify'} size={24} style={{position:'absolute', right: 5, bottom: '25%'}}/>
        </View>
    </View>
}

const loadData = async ({setListItems,setRefreshing = (state:boolean)=>{}}) =>{
    const itemRef=collection(fStorage, 'items');
    getDocs(itemRef).then((docs)=>{
        const fetchedData = docs.docs.map(el=>{return {...el.data(),id: el.id}});
        setListItems(fetchedData);
        setRefreshing(false);
    })

}

const Home = () =>{
const [pageNumber, setPageNumber] = useState(0);
const [listItems, setListItems] = useState([]);
const [isRefreshing, setRefreshing] = useState(true);

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
        loadData({setListItems, setRefreshing})
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadData({setListItems,setRefreshing});
        // setTimeout(() => {
        //     setRefreshing(false);
        // }, 2000);
    }, []);
    return <View><HeaderComponent />
    <ScrollView refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
    }>
        <SearchComponent />
        {listItems.map(item=><FavoriteComponent key={item.id} item={item} list={listItems} setFavoriteToyList={setListItems} />)}
    </ScrollView>
    </View>
}

export default Home;
