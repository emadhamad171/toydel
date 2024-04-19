import {RefreshControl, TouchableOpacity, View, Text, FlatList} from "react-native";
import Input from "../components/Input";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import React, { useCallback, useEffect, useState } from "react";
import {useNavigation} from "@react-navigation/native";
import {

} from '@shared'
import WrapperComponent from "../components/WrapperComponent";
import ItemComponent from "../components/ItemComponent";
import PremiumPlansModal from "../modals/PremiumPlansModal";
import {itemsStackSample,
    loadUser,
    loadAllItems,
    userUpdate,
    useAppDispatch,
    useAppSelector,
    itemType,
} from "@shared";
import {SafeAreaView} from "moti";
import ItemModal from "../modals/ItemModal";

const HeaderComponent = ({setModal, setModalName}) =>{
    const navigation = useNavigation();
    return <View style={{backgroundColor: '#a333ff',width: '100%', paddingTop: 70, transform: [{translateY: -70}],position: 'absolute', zIndex:2, paddingHorizontal:10, flexDirection: 'row', justifyContent:'space-between'}}>
        <View style={{flexDirection: 'row', gap: 15, marginLeft: 5}}>
        <Icon name={'teddy-bear'} size={32} color={"#4f0bb2"}/>
        <TouchableOpacity style={{alignSelf:'center', backgroundColor: '#c29cff', borderRadius: 5, padding: 5}} onPress={()=>{
            setModal(()=>{return ()=><PremiumPlansModal />})
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
    return <View style={{backgroundColor: '#a333ff', borderBottomStartRadius:10, borderBottomEndRadius:10,width: '100%', paddingBottom: 50, paddingTop:60}}>
        <View style={{flexDirection: 'row', position:'relative', maxWidth: 330,display: 'flex',alignSelf: 'center'}}>
        <Input placeholder={"Find your toy."} onChangeAction={(text:string)=>{
            setSearch(()=>text);
        }} value={searchString} style={{backgroundColor: '#c9aaff',borderRadius: 10, maxWidth: 330, width: '100%', padding: 10, borderColor: '#f11'}} />
            <TouchableOpacity><Icon name={'magnify'} size={24} style={{position:'absolute', right: 5, bottom: '25%'}}/></TouchableOpacity>
        </View>
    </View>
}

const loadData = async ({ setListItems, setRefreshing, setFavoriteList, userID}) =>{
    const user = await loadUser({userID});
    const path = 'items'
    const listItems = await loadAllItems({path});

    setListItems(listItems);
    setFavoriteList(user[0].favoriteList);
    setRefreshing(false);
}

const getDisplayedList = ({fetchedListItems, page} : {fetchedListItems : itemType[], page: number}) => {
    const data = fetchedListItems;
    data.splice(0,(page-1)*3);
    data.splice(page*3, fetchedListItems.length-1);
    return data;
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
const SearchAndFilterComponent = ({setSearch, searchString, setModal, selectedCategories, setChoosedCategory, setModalName}) => {
    return <>
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
    </>
}
const PageButtonsComponent = ({pageNumber, setPageNumber,searchedListItems}) => <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems:'center', paddingBottom:8, marginVertical: 12}}>
    <TouchableOpacity onPress={()=>{
        if(pageNumber>1) {
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
            {pageNumber-1 ? pageNumber-1 : ''}
        </Text>
        <Text style={{fontSize: 16}}>
            {pageNumber}
        </Text>
        <Text style={{color:'#777'}}>
            {searchedListItems.length<pageNumber*3 ? '' : pageNumber+1}
        </Text>
    </View>
    <TouchableOpacity onPress={()=>{
        if(searchedListItems.length<pageNumber*3) return;
        setPageNumber((prev)=>prev+1)
    }}
                      style={{width:144,height:48,alignItems:'center',justifyContent:'center', paddingVertical:8, paddingHorizontal:16, borderRadius: 15, backgroundColor: '#b37de8'}}>
        <Text style={{fontSize:16}}>
            Next Page
        </Text>
    </TouchableOpacity>
</View>
const Home = () =>{
    const user = useAppSelector((state)=>state.user.user);
    const dispatch = useAppDispatch();
    const updateUserInfo = () =>{
        dispatch(userUpdate());
    };

    //~~~~~~Base config~~~~~~~~~
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [fetchedListItems, setFetchedListItems] = useState<itemType[]>(itemsStackSample);
    const [isRefreshing, setRefreshing] = useState<boolean>(true);
    const [displayedListItems, setDisplayedListItems] = useState<itemType[]>(itemsStackSample);
    const [favoriteList,setFavoriteList] = useState(user.favoriteList);

    //~~~~~~~Filter Props~~~~~~~
    const [selectedCategories, setChoosedCategory] = useState<string[]>([]);
    const [searchString, setSearch] = useState<string>('');
    const [searchedListItems, setSearchedItems] = useState<itemType[]>(itemsStackSample);

    //~~~~~~~Modals~~~~~~
    const [CustomModal, setModal] = useState(null);
    const [currentModalName, setModalName] = useState<string>('');

    useEffect(() => {
        const searchedItems = searchByString({fetchedListItems, searchString})
            .filter(item => {if (item.category.some(category => selectedCategories.includes(category)) || selectedCategories.length===0) return item;});
        setSearchedItems(searchedItems);
        setDisplayedListItems(getDisplayedList( {fetchedListItems: searchedItems, page: pageNumber}));
    }, [searchString, selectedCategories,fetchedListItems, pageNumber]);

    useEffect(() => {
        loadData({setListItems: setFetchedListItems, setRefreshing, setFavoriteList, userID: user.id})
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setPageNumber(1);
        loadData({setListItems: setFetchedListItems,setRefreshing, setFavoriteList, userID: user.id});
    }, []);

    const itemOnClick = ({item}:{item:itemType}) => {
        return ()=> {
            setModalName(() => item.name);
            setModal(() => {
                return () => <ItemModal setModal={setModal} setModalName={setModalName} user={user} item={item} updateUser={updateUserInfo} isOwned={user?.ownedList && user.ownedList.some((el)=>{if(item.id===el.id) return item;})}/>
            })
        }
    }

    return <View style={{flex: 1}}>
        <WrapperComponent ItemModal={CustomModal} setModal={setModal} modalName={currentModalName} />
        <SafeAreaView>
        <View style={{}}>
            <HeaderComponent setModal={setModal} setModalName={setModalName} user={user.id} updateUser={updateUserInfo}/>
            <FlatList
                refreshControl={ <RefreshControl style={{backgroundColor: '#a333ff'}} refreshing={isRefreshing} onRefresh={onRefresh} /> }
                data={displayedListItems}
                renderItem={({item})=><ItemComponent key={item.id} item={item} isLoading={isRefreshing} setFavoriteToyList={setFavoriteList} isFavorite={favoriteList && favoriteList.includes(item.id)} onClickMore={itemOnClick({item})} />}
                ListHeaderComponent={()=><SearchAndFilterComponent setSearch={setSearch} searchString={searchString} setModal={setModal} setModalName={setModalName} setChoosedCategory={setChoosedCategory} selectedCategories={selectedCategories}/>}
                ListFooterComponent={()=><PageButtonsComponent pageNumber={pageNumber} setPageNumber={setPageNumber} searchedListItems={searchedListItems} />}
            />
        </View>
        </SafeAreaView>
    </View>
}

export default Home;
