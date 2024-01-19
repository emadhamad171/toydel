import {useEffect, useState} from "react";
import {FlatList, View} from "react-native";
import {loadSpecialItems, loadUser, updateItemInDocFromCollection} from "../firebase/firebaseAPI";
import {auth} from "../firebase";
import ItemComponent from "../components/ItemComponent";

const loadData = async ({setFavoriteList, userID, setFavoriteListIds}) =>{
    const user = await loadUser({userID});
    const favoriteList = user[0].favoriteList;
    const specOps = {
        filedPath: 'id',
        opStr: 'in',
        data: favoriteList
    }
    const favoriteListItems = await loadSpecialItems({path: "items", specOps});
    setFavoriteList(favoriteListItems);
    setFavoriteListIds(favoriteList);
}

const FavoriteItemsModal = ({user}) =>{
    const [favoriteToyList, setFavoriteToyList] = useState(null);
    const [favoriteList, setFavoriteListIds] = useState<string[]>([])

    useEffect(() => {
        loadData({setFavoriteList: setFavoriteToyList, userID: user.uid, setFavoriteListIds})
    }, []);

    const renderItem = ({item}) => {
        const isFavorite = favoriteList && favoriteList.includes(item.id);
        if(isFavorite) return <ItemComponent setFavoriteToyList={setFavoriteListIds} item={item} isFavorite={isFavorite} />;
    }
    return <View style={{flex: 1, marginTop: 14}}>
        <FlatList data={favoriteToyList} renderItem={renderItem}/>
    </View>
}

export default FavoriteItemsModal;
