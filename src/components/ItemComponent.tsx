import {updateItemInDocFromCollection} from "../firebase/firebaseAPI";
import {auth} from "../firebase";
import {Image, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Dispatch, SetStateAction} from "react";
import {itemType, userType} from "../helpers/types";

type itemComponentPropsType = {
    setFavoriteToyList?: Dispatch<SetStateAction<string[]>>,
    item: itemType,
    isFavorite: boolean,
    isOnStatus?: boolean,
    user?: userType | null,
    onClickMore?: ()=>void,
};

const ItemComponent = (
    {setFavoriteToyList,item, isFavorite, isOnStatus=false, user=null, onClickMore = ()=>{}}: itemComponentPropsType
) =>{
    const {name, brand, category, id ,description, price, isIncludedInPlan, photo} = item;
    const removeItemFromFavoriteList = () =>{
        setFavoriteToyList((prevValue)=>{
            const updatedList =prevValue.filter((listItem)=>{ if(listItem !== item.id) return listItem});
            updateItemInDocFromCollection({updatedItem: {favoriteList: updatedList}, collectionPath:'users', docName:auth.currentUser.uid});
            return updatedList;
        })
    }
    const addItemToFavoriteList = () => {
        setFavoriteToyList((prevValue)=>{
            const updatedList = [...prevValue, item.id];
            updateItemInDocFromCollection({updatedItem: {favoriteList: updatedList}, collectionPath:'users', docName:auth.currentUser.uid});
            return updatedList;
        });
    }
    const handleFavoriteClick = () => {
        isFavorite ? removeItemFromFavoriteList() : addItemToFavoriteList();
    }
    return <View style={{flexDirection: 'row', alignSelf:'center', padding: 10, borderRadius: 15}}>
        {!isOnStatus && <TouchableOpacity onPress={handleFavoriteClick} style={{position: 'absolute', zIndex: 4, top: 15, left:15}}><Icon name={isFavorite ? 'heart' : 'heart-outline'} style={{zIndex: 4, borderRadius: 50, padding: 5, backgroundColor: '#ccc'}} color={'#522d7e'} size={22}/></TouchableOpacity>}
        <Image style={{width: 150, height: 150, borderRadius: 10, zIndex:2,borderColor:'#cccccc', borderWidth: 2}} source={{uri: photo}} />
        <View style={{backgroundColor:'#cccccc',borderColor:'#cccccc', borderWidth: 1,paddingRight: 15, width:'100%', maxWidth: 220, marginLeft: -10, borderTopRightRadius: 15, borderBottomRightRadius: 10, paddingLeft:20, paddingTop: 10}}>
            <Text numberOfLines={1} ellipsizeMode={"tail"} style={{fontSize: 16,color: '#522d7e', alignSelf: 'flex-start'}}>{name}</Text>
            <Text numberOfLines={2} ellipsizeMode={'tail'} style={{fontSize: 12, color: '#333',marginTop: 5}}>{description}</Text>
            <View style={{width: '100%', borderStyle: "dashed", borderWidth: 1, borderColor: '#555', borderRadius: 5, marginVertical: 8}}></View>
            <Text style={{fontSize: 12}}>Brand: {brand} </Text>
            {
                isOnStatus ? <View style={{ flexDirection: 'row', flexGrow: 1, justifyContent: 'space-around', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', paddingHorizontal: 8, paddingVertical: 5, backgroundColor: '#eee', borderRadius: 25, marginVertical: 6}}>
                        <Text>Status: </Text>
                        {/*<Text style={{color:'#11752d'}}>Delivered</Text>*/}
                        <Text style={{color:'#0f839d'}}>In usage</Text>
                    </View>
                    <TouchableOpacity onPress={onClickMore}>
                    <Icon name={'dots-vertical'} style={{padding: 0, marginBottom: 6}} size={24}/>
                    </TouchableOpacity>
                    </View> :<>
                    <Text numberOfLines={1} ellipsizeMode={'clip'} style={{fontSize: 12}}>Category: {category.join(', ')}</Text>
                    <Text style={{fontSize: 12, color: isIncludedInPlan ? '#1f4f1a' : '#51297e'}}>{isIncludedInPlan ? 'Included in base plan' : 'You can order it from us'}</Text></>
            }
        </View>
    </View>
}
export default ItemComponent;
