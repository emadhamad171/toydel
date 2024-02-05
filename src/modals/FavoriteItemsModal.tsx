import {useEffect, useState} from "react";
import {FlatList, View} from "react-native";
import ItemComponent from "../components/ItemComponent";
import {itemsStackSample, loadFavoriteData} from "../helpers";
import {itemType} from "../helpers/types";

const FavoriteItemsModal = ({user}) =>{
    const [favoriteToyList, setFavoriteToyList] = useState<itemType[]>(itemsStackSample);
    const [favoriteList, setFavoriteListIds] = useState<string[]>(user.favoriteList)
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        loadFavoriteData({setFavoriteList: setFavoriteToyList, userID: user.id, setFavoriteListIds, setLoading});
    }, []);

    const renderItem = ({item}) => {
        const isFavorite = favoriteList && favoriteList.includes(item.id);
        if(isFavorite || isLoading) return <ItemComponent setFavoriteToyList={setFavoriteListIds} item={item} isLoading={isLoading} isFavorite={isFavorite} />;
    }
    return <View style={{flex: 1, marginTop: 14}}>
        <FlatList data={favoriteToyList} renderItem={renderItem}/>
    </View>
}

export default FavoriteItemsModal;
