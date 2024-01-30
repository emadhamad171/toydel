import { RefreshControl, ScrollView, TouchableOpacity, View, Text, LogBox } from "react-native";
import Input from "../components/Input";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { loadUser, loadItems } from '../firebase/firebaseAPI'
import WrapperComponent from "../components/WrapperComponent";
import ItemComponent from "../components/ItemComponent";
import PremiumPlansModal from "../modals/PremiumPlansModal";

const HeaderComponent = ({setModal, setModalName, user}) =>{
    const navigation = useNavigation();
    return <View style={{backgroundColor: '#a333ff',width: '100%', paddingVertical: 10, paddingHorizontal:10, flexDirection: 'row', justifyContent:'space-between'}}>
        <View style={{flexDirection: 'row', gap: 15, marginLeft: 5}}>
        <Icon name={'teddy-bear'} size={32} color={"#4f0bb2"}/>
        <TouchableOpacity style={{alignSelf:'center', backgroundColor: '#c29cff', borderRadius: 5, padding: 5}} onPress={()=>{
            setModal(()=>{return ()=><PremiumPlansModal user={user} />})
            setModalName("Plans");
        }}>
            <Text>View Plans</Text>
        </TouchableOpacity>
            <TouchableOpacity >
                <MaterialIcon name={'not-listed-location'} size={28} color={"#fff2ee"}/>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', gap: 15, marginRight: 10}}>
            <TouchableOpacity onPress={()=>navigation.navigate('Notifications')}>
            <Icon name={'bell-outline'} size={28} color={'#362270'}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name={'cart-outline'} size={28} color={'#362270'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
                <Icon name={'account-outline'} size={28} color={'#362270'}/>
            </TouchableOpacity>
        </View>
    </View>
}
const SearchComponent = ({ searchString, setSearch }) =>{
    return <View style={{backgroundColor: '#a333ff', borderBottomStartRadius:10, borderBottomEndRadius:10,width: '100%', paddingBottom: 50, paddingTop:30}}>
        <View style={{flexDirection: 'row', position:'relative', maxWidth: 330,display: 'flex',alignSelf: 'center'}}>
        <Input placeholder={"Find your toy."} onChangeAction={(text:string)=>{
            setSearch(()=>text);
        }} value={searchString} style={{backgroundColor: '#c9aaff',borderRadius: 10, width: 330, padding: 10, borderColor: '#f11'}} />
            <TouchableOpacity><Icon name={'magnify'} size={24} style={{position:'absolute', right: 5, bottom: '25%'}}/></TouchableOpacity>
        </View>
    </View>
}

const loadData = async ({ setListItems, setRefreshing, setFavoriteList, userID}) =>{
    const user = await loadUser({userID});
    const listItems = await loadItems({path: 'items'});

    setListItems(listItems);
    setFavoriteList(user[0].favoriteList);
    setRefreshing(false);
}

const CategoryItem = ({ name, isSelected, onPressAction }) => {
    return <TouchableOpacity onPress={()=>onPressAction(isSelected)}><Text style={{fontSize: 18}}> <Icon name={isSelected? 'checkbox-marked-outline' : 'checkbox-blank-outline'} size={24}/> {name}</Text></TouchableOpacity>
}
const FilterModal = ({ setModal, setSelectedCategory, selectedCategories }) =>{
    const [categories, setCategories] = useState<string[]>(selectedCategories);
    const removeCategory = (name : string)=> {setCategories(categories.filter(el=>{if(el!=name) return el;}))};
    const addCategory = (name : string) => {setCategories(prevState => [...prevState, name])};

    return <View>
        <CategoryItem name={'Fun'} isSelected={categories.includes('Fun')} onPressAction={(isSelected:boolean)=>{isSelected ? removeCategory('Fun') : addCategory('Fun')}}/>
        <CategoryItem name={'Games'} isSelected={categories.includes('Games')} onPressAction={(isSelected:boolean)=>{isSelected ? removeCategory('Games') : addCategory('Games')}}/>
        <TouchableOpacity style={{paddingVertical: 5,paddingHorizontal:10, alignSelf: 'center', borderRadius: 25, borderWidth: 1}}
                          onPress={()=>{
                                setSelectedCategory(categories);
                                setModal(null);
                            }}>

            <Text style={{fontSize: 24}}>Filter</Text>
        </TouchableOpacity>
    </View>;
}
const searchByString = ({fetchedListItems, searchString}) => {
    return fetchedListItems.filter(item=>{return item&&item.name&&(item.name.toLowerCase().includes(searchString.toLowerCase()) ||item.description.toLowerCase().includes(searchString.toLowerCase()) )});
}
const Home = () =>{
const [pageNumber, setPageNumber] = useState(0);
const [fetchedListItems, setFetchedListItems] = useState([]);
const [isRefreshing, setRefreshing] = useState(true);
const [userID, setUserID] = useState(auth.currentUser.uid);
const [favoriteList, setFavoriteList] = useState<string[]>([]);
const [selectedCategories, setChoosedCategory] = useState<string[]>([]);
const [CustomModal, setModal] = useState(null);
const [currentModalName, setModalName] = useState('');
const [searchString, setSearch] = useState('');
    useEffect(() => {
        loadData({setListItems: setFetchedListItems, setRefreshing, setFavoriteList, userID})
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadData({setListItems: (items)=> {setFetchedListItems(items)},setRefreshing, setFavoriteList, userID});
    }, []);

    return <>
        <WrapperComponent ItemModal={CustomModal} setModal={setModal} modalName={currentModalName} />
        <View style={{paddingBottom: 50}}>
            <HeaderComponent setModal={setModal} setModalName={setModalName} user={userID} />
            <ScrollView refreshControl={
                <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }>
                <SearchComponent setSearch={setSearch} searchString={searchString}/>
                <View style={{flexDirection:'row', flexGrow: 1, alignItems: 'center',justifyContent: 'space-between'}}>
                    <Text style={{marginTop:10,marginLeft: 10, fontSize: 18}}>Toys</Text>
                    <TouchableOpacity style={{alignSelf: 'flex-end', flexDirection:'row',alignItems:'center', marginRight: 15, marginTop:10, borderWidth:1,padding:5, borderRadius: 10}} onPress={()=>{
                        setModal(()=>{return ()=><FilterModal setModal={setModal} selectedCategories={selectedCategories} setSelectedCategory={setChoosedCategory}/>})
                        setModalName("Filter");
                    }}>
                        <Text> <Icon name={'filter-variant'} size={24}/> </Text>
                        <Text>Filter</Text>
                    </TouchableOpacity>
                </View>
                {
                    searchByString({fetchedListItems, searchString})
                    .filter(item => {if (item.category.some(category => selectedCategories.includes(category)) || selectedCategories.length===0) return item;})
                    .map(item=><ItemComponent key={item.id} item={item} setFavoriteToyList={setFavoriteList} isFavorite={favoriteList && favoriteList.includes(item.id)}/>)
                }
            </ScrollView>
        </View>
    </>
}

export default Home;
