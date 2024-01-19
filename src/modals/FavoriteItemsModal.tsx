import {useEffect, useState} from "react";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {loadSpecialItems, loadUser} from "../firebase/firebaseAPI";
import {auth, db} from "../firebase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const loadData = async ({setFavoriteList, userID}) =>{
    const user = await loadUser({userID});
    const favoriteList = user[0].favoriteList;
    const specOps = {
        filedPath: 'id',
        opStr: 'in',
        data: favoriteList
    }
    const favoriteListItems = await loadSpecialItems({path: "items", specOps});
    setFavoriteList(favoriteListItems);
}

const FavoriteComponent = ({setFavoriteToyList,item}) =>{
    const {name, brand, category, id ,description, price, rentPrice, isIncludedInPlan, photo} = item;
    const removeItemFromFavoriteList = () =>{
        setFavoriteToyList((prevValue)=>{
            const updatedList =prevValue.filter((listItem)=>{ if(listItem.id !== item.id) return listItem});
            db.collection('users').doc(auth.currentUser.uid).update({favoriteList: updatedList.map((item=>item.id))})
            return updatedList;
        })
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

const FavoriteItemsModal = ({user}) =>{
    const [favoriteToyList, setFavoriteToyList] = useState(null);

    useEffect(() => {
        loadData({setFavoriteList: setFavoriteToyList, userID: user.uid})
    }, []);
    return <View style={{flex: 1, marginTop: 14}}>
        <FlatList data={favoriteToyList} renderItem={({item})=><FavoriteComponent setFavoriteToyList={setFavoriteToyList} item={item} /> } />
    </View>
}

export default FavoriteItemsModal;
