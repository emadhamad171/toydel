import {RefreshControl, ScrollView, TouchableOpacity, View, Text, Image, FlatList, LogBox} from "react-native";
import Input from "../components/Input";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {useCallback, useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {launchImageLibrary} from "react-native-image-picker";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {auth, db, fStorage, imgStorage} from "../firebase";
import {v4} from 'uuid'
import ContinueButton from "../components/ContinueButton";
import {addDoc, collection,getDocs,query, where} from 'firebase/firestore'
import Toast from "react-native-toast-message";
import Modal from "react-native-modal";
const ItemComponent = ({setFavoriteToyList,item, isFavorite}) =>{
    const {name, brand, category, id ,description, price, rentPrice, isIncludedInPlan, photo} = item;
    const removeItemFromFavoriteList = () =>{
        setFavoriteToyList((prevValue)=>{
            const updatedList =prevValue.filter((listItem)=>{ if(listItem !== item.id) return listItem});
            db.collection('users').doc(auth.currentUser.uid).update({favoriteList: updatedList})
            return updatedList;
        })
    }
    const addItemToFavoriteList = () => {
        setFavoriteToyList((prevValue)=>{
            const updatedList = [...prevValue, item.id];
            db.collection('users').doc(auth.currentUser.uid).update({favoriteList: updatedList})
            return updatedList;
        });
    }
    const handleFavoriteClick = () => {
        isFavorite ? removeItemFromFavoriteList() : addItemToFavoriteList();
    }
    return <View style={{flexDirection: 'row', padding: 10, borderRadius: 15}}>
        <TouchableOpacity onPress={handleFavoriteClick} style={{position: 'absolute', zIndex: 4, top: 15, left:15}}><Icon name={isFavorite ? 'heart' : 'heart-outline'} style={{zIndex: 4, borderRadius: 50, padding: 5, backgroundColor: '#ccc'}} color={'#522d7e'} size={22}/></TouchableOpacity>
        <Image style={{width: 150, height: 150, borderRadius: 10, zIndex:2,borderColor:'#cccccc', borderWidth: 2}} source={{uri: photo}} />
        <View style={{backgroundColor:'#cccccc',borderColor:'#cccccc', borderWidth: 1,paddingRight: 15, width:'100%', maxWidth: 220, marginLeft: -10, borderTopRightRadius: 15, borderBottomRightRadius: 10, paddingLeft:20, paddingTop: 10}}>
            <Text numberOfLines={1} ellipsizeMode={"tail"} style={{fontSize: 16,color: '#522d7e', alignSelf: 'flex-start'}}>{name}</Text>
            <Text numberOfLines={2} ellipsizeMode={'tail'} style={{fontSize: 12, color: '#333',marginTop: 5}}>{description}</Text>
            <View style={{width: '100%', borderStyle: "dashed", borderWidth: 1, borderColor: '#555', borderRadius: 5, marginVertical: 8}}></View>
            <Text style={{fontSize: 12}}>Brand: {brand} </Text>
            <Text numberOfLines={1} ellipsizeMode={'clip'} style={{fontSize: 12}}>Category: {category.join(', ')}</Text>
            <Text style={{fontSize: 12, color: isIncludedInPlan ? '#1f4f1a' : '#51297e'}}>{isIncludedInPlan ? 'Included in base plan' : 'You can order it from us'}</Text>
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
const SearchComponent = ({fetchedListItems, setListItems,searchString, setSearch}) =>{
    return <View style={{backgroundColor: '#a333ff', borderBottomStartRadius:10, borderBottomEndRadius:10,width: '100%', paddingBottom: 50, paddingTop:30}}>
        <View style={{flexDirection: 'row', position:'relative', maxWidth: 330,display: 'flex',alignSelf: 'center'}}>
        <Input placeholder={"Find your toy."} onChangeAction={(text:string)=>{
            setSearch(()=>text);
            setListItems((prevState)=>fetchedListItems.filter(item=>{return item&&item.name&&(item.name.toLowerCase().includes(text.toLowerCase()) ||item.description.toLowerCase().includes(text.toLowerCase()) )}));
        }} value={searchString} style={{backgroundColor: '#c9aaff',borderRadius: 10, width: 330, padding: 10, borderColor: '#f11'}} />
            <TouchableOpacity><Icon name={'magnify'} size={24} style={{position:'absolute', right: 5, bottom: '25%'}}/></TouchableOpacity>
        </View>
    </View>
}

const loadData = async ({setListItems,setRefreshing, setFavoriteList, userID}) =>{
    const itemRef=collection(fStorage, 'items');
    const favoriteItemsRef= query(collection(fStorage, "users"), where('id','==',userID));
    getDocs(itemRef).then((docs)=>{
        const fetchedData = docs.docs.map(el=>{return {...el.data()}});
        setListItems(fetchedData);
        getDocs(favoriteItemsRef).then((favoriteDocs)=>{
            const fetchedFavoriteData :{id:string, favoriteList:string[]} = favoriteDocs.docs.map(el=>{return {...el.data()}});
            setFavoriteList(fetchedFavoriteData[0].favoriteList);
            setRefreshing(false);
        })
    })

}

const CategoryItem = ({name, isSelected, onPressAction}) => {
    return <TouchableOpacity onPress={()=>onPressAction(isSelected)}><Text style={{fontSize: 18}}> <Icon name={isSelected? 'checkbox-marked-outline' : 'checkbox-blank-outline'} size={24}/> {name}</Text></TouchableOpacity>
}
const FilterModal = ({setModal, setListItems,fetchedList, setSelectedCategory, selectedCategories}) =>{
    const [categories, setCategories] = useState<string[]>(selectedCategories);
    const removeCategory = (name : string)=> {setCategories(categories.filter(el=>{if(el!=name) return el;}))};
    const addCategory = (name : string) => {setCategories(prevState => [...prevState, name])};

    return <View>
        <CategoryItem name={'Fun'} isSelected={categories.includes('Fun')} onPressAction={(isSelected:boolean)=>{isSelected ? removeCategory('Fun') : addCategory('Fun')}}/>
        <CategoryItem name={'Games'} isSelected={categories.includes('Games')} onPressAction={(isSelected:boolean)=>{isSelected ? removeCategory('Games') : addCategory('Games')}}/>
        <TouchableOpacity style={{paddingVertical: 5,paddingHorizontal:10, alignSelf: 'center', borderRadius: 25, borderWidth: 1}} onPress={()=>{
            if(categories.length) {
                setListItems((prevState) => {
                    return fetchedList.filter(item => {
                            if (item.category.some(category => categories.includes(category))) return item;
                        }
                    )
                });
            } else {
                setListItems(fetchedList);
            }
            setSelectedCategory(categories);
            setModal(null);
        }}>
            <Text style={{fontSize: 24}}>Filter</Text>
        </TouchableOpacity>
    </View>;
}
function WrapperComponent({ItemModal, setModal, modalName}) {
    return (
        <Modal propagateSwipe style={{padding: 0, margin: 0, flex:1}}  animationInTiming={600} animationOutTiming={500} animationOut={'slideOutDown'} coverScreen={false} backdropOpacity={0} isVisible={!!ItemModal} onBackdropPress={() => setModal(null)}>
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
const Home = () =>{
const [pageNumber, setPageNumber] = useState(0);
const [fetchedListItems, setFetchedListItems] = useState([]);
const [listItems, setListItems] = useState([]);
const [isRefreshing, setRefreshing] = useState(true);
const [userID, setUserID] = useState(auth.currentUser.uid);
const [favoriteList, setFavoriteList] = useState<string[]>([]);
const [selectedCategories, setChoosedCategory] = useState<string[]>([]);
const [CustomModal, setModal] = useState(null);
const [currentModalName, setModalName] = useState('');
const [searchString, setSearch] = useState('');
    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
        loadData({setListItems: (items) => {setFetchedListItems(items); setListItems(items)}, setRefreshing, setFavoriteList, userID})
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadData({setListItems: (items)=> {setFetchedListItems(items)},setRefreshing, setFavoriteList, userID});
    }, []);

    return <View style={{paddingBottom: 50}}>
        <WrapperComponent ItemModal={CustomModal} setModal={setModal} modalName={currentModalName} />
        <HeaderComponent />
    <ScrollView refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
    }>
        <SearchComponent setListItems={setListItems} fetchedListItems={fetchedListItems} setSearch={setSearch} searchString={searchString}/>
        <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center',justifyContent: 'space-between'}}>
        <Text style={{marginTop:10,marginLeft: 10, fontSize: 18}}>Toys</Text>
        <TouchableOpacity style={{alignSelf: 'flex-end', flexDirection:'row',alignItems:'center', marginRight: 15, marginTop:10, borderWidth:1,padding:5, borderRadius: 10}} onPress={()=>{
            setModal(()=>{return ()=><FilterModal setModal={setModal} setListItems={setListItems} fetchedList={fetchedListItems} selectedCategories={selectedCategories} setSelectedCategory={setChoosedCategory}/>})
            setModalName("Filter");
        }}>
            <Text> <Icon name={'filter-variant'} size={24}/> </Text>
            <Text>Filter</Text>
        </TouchableOpacity>
        </View>
        {listItems.map(item=><ItemComponent key={item.id} item={item} setFavoriteToyList={setFavoriteList} isFavorite={favoriteList && favoriteList.includes(item.id)}/>)}
    </ScrollView>
    </View>
}

export default Home;
