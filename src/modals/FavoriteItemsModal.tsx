import {useEffect, useState} from "react";
import {FlatList, View} from "react-native";
import ItemComponent from "../components/ItemComponent";
import {loadFavoriteData} from "../helpers";
import {itemType} from "../helpers/types";

const FavoriteItemsModal = ({user}) =>{
    const [favoriteToyList, setFavoriteToyList] = useState<itemType[]>(null);
    const [favoriteList, setFavoriteListIds] = useState<string[]>(user.favoriteList)

    useEffect(() => {
        loadFavoriteData({setFavoriteList: setFavoriteToyList, userID: user.id, setFavoriteListIds});
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
