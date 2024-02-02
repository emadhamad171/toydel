import {RefreshControl, ScrollView, TouchableOpacity, View, Text, LogBox} from "react-native";
import Input from "../components/Input";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useCallback, useEffect, useState } from "react";
import {CommonActions, useNavigation} from "@react-navigation/native";
import { auth } from "../firebase";
import {
    loadUser,
    loadItems,
    firstLoadItems,
    loadItemsInNextPage,
    loadItemsInPreviousPage
} from '../firebase/firebaseAPI'
import WrapperComponent from "../components/WrapperComponent";
import ItemComponent from "../components/ItemComponent";
import PremiumPlansModal from "../modals/PremiumPlansModal";
import {itemsStackSample} from "../helpers";

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
            <TouchableOpacity onPress={()=>navigation.navigate('Profile' as never)}>
                <MaterialIcon name={'not-listed-location'} size={28} color={"#fff2ee"}/>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', gap: 15, marginRight: 10}}>
            <TouchableOpacity onPress={()=>navigation.navigate('Notifications' as never)}>
            <Icon name={'bell-outline'} size={28} color={'#362270'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate({name: 'Cart'} as never)}>
                <Icon name={'cart-outline'} size={28} color={'#362270'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate({name: 'Profile'} as never)}>
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

const loadData = async ({ setListItems, setRefreshing, setFavoriteList, userID, isFirst=false, isReload = false, isNext= false, setPointSnap, pointSnap}) =>{
    if(isNext && pointSnap.isLastPage){
        setRefreshing(false);
        return;
    }
    const user = await loadUser({userID});
    const path = 'items'
    const listItems = isFirst ? await firstLoadItems({path}) :
        isReload ? await pointSnap.reloadSnap() :
            isNext ? await loadItemsInNextPage({path, lastSnap: pointSnap.lastSnap}) :
                await loadItemsInPreviousPage({path, firstSnap: pointSnap.firstSnap});

    setListItems(listItems.data);
    setPointSnap(listItems.snaps);
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
const [pageNumber, setPageNumber] = useState(1);
const [fetchedListItems, setFetchedListItems] = useState(itemsStackSample);
const [isRefreshing, setRefreshing] = useState(true);
const [userID, setUserID] = useState(auth.currentUser.uid);
const [favoriteList, setFavoriteList] = useState<string[]>([]);
const [selectedCategories, setChoosedCategory] = useState<string[]>([]);
const [CustomModal, setModal] = useState(null);
const [currentModalName, setModalName] = useState('');
const [pointSnap, setPointSnap] = useState(null);
const [searchString, setSearch] = useState('');
    useEffect(() => {
        loadData({setListItems: setFetchedListItems, setRefreshing, setFavoriteList, userID, isFirst: true, pointSnap, setPointSnap})
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadData({setListItems: setFetchedListItems,setRefreshing, setFavoriteList, userID, isReload: true, pointSnap, setPointSnap});
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
                    .map(item=><ItemComponent key={item.id} item={item} isLoading={isRefreshing} setFavoriteToyList={setFavoriteList} isFavorite={favoriteList && favoriteList.includes(item.id)}/>)
                }
                <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems:'center', paddingBottom:8, marginVertical: 12}}>
                    <TouchableOpacity onPress={()=>{
                        if(pageNumber>1) {
                            setRefreshing(true);
                            loadData({
                                setListItems: (items) => {
                                    setFetchedListItems(items)
                                }, setRefreshing, setFavoriteList, userID, pointSnap, setPointSnap
                            });
                            setPageNumber((prev) => prev - 1)
                        }
                    }}
                        style={{width:144,height:48,alignItems:'center', justifyContent:'center', paddingVertical:8, paddingHorizontal:16, borderRadius: 15, backgroundColor: '#b37de8'}}>
                        <Text style={{fontSize:16}}>
                            Previous Page
                        </Text>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row',gap:4,}}>
                        <Text style={{color:'#777'}}>
                            {pageNumber-1}
                        </Text>
                        <Text style={{fontSize: 16}}>
                            {pageNumber}
                        </Text>
                        <Text style={{color:'#777'}}>
                            {pointSnap?.isLastPage ? '' : pageNumber+1}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={()=>{
                        if(pointSnap.isLastPage){
                            return;
                        }
                        setRefreshing(true);
                        loadData({setListItems: (items)=> {setFetchedListItems(items)},setRefreshing, setFavoriteList, userID, isNext: true, pointSnap, setPointSnap});
                        setPageNumber((prev)=>prev+1)
                    }}
                        style={{width:144,height:48,alignItems:'center',justifyContent:'center', paddingVertical:8, paddingHorizontal:16, borderRadius: 15, backgroundColor: '#b37de8'}}>
                        <Text style={{fontSize:16}}>
                            Next Page
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    </>
}

export default Home;
