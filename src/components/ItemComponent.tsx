import {updateItemInDocFromCollection,auth,itemComponentPropsType} from "@shared";
import {Image, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Stars from "./StarsComponent";
import {Skeleton} from "moti/skeleton";

const ItemComponent = (
    {setFavoriteToyList,item, isFavorite, isLoading=true, isOnStatus=false, user=null, onClickMore = ()=>{}}: itemComponentPropsType
) =>{
    const {name, brand, category ,description, isIncludedInPlan, photo} = item;
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
    return <View style={{flexDirection: 'row', alignSelf:'center', marginVertical: 10, borderRadius: 15}} >
    <Skeleton show={isLoading} backgroundColor={"#d4d4d4"} colorMode={'light'} transition={{type: 'timing', duration: 500, delay: 100}} radius={15}>
        <TouchableOpacity onPress={()=>{onClickMore()}}>
        <View style={{flexDirection: 'row', alignSelf:'center', borderRadius: 15}}>
        {!isOnStatus && !isLoading && <TouchableOpacity onPress={handleFavoriteClick} style={{position: 'absolute', zIndex: 4, top: 5, left:5, borderRadius:50,overflow: 'hidden',}}><Icon name={isFavorite ? 'heart' : 'heart-outline'} style={{zIndex: 4, borderRadius: 50, padding: 5, backgroundColor: '#ccc'}} color={'#522d7e'} size={22}/></TouchableOpacity>}
        {!isLoading && <Image style={{width: '45%', minWidth:150, maxWidth:170, height: 160, borderRadius: 10,borderColor:'#cccccc', borderWidth: 2}} source={{uri: photo}} />}
        <View style={{backgroundColor:'#cccccc',borderColor:'#cccccc',height:160, borderWidth: 1, paddingRight: 15, width: isLoading ? '100%' : '55%', maxWidth: 240, minWidth: 144, marginLeft: -10, borderTopRightRadius: 15, borderBottomRightRadius: 10, paddingLeft:20, paddingTop: 10}}>
            <Text numberOfLines={1} ellipsizeMode={"tail"} style={{fontSize: 16,color: '#522d7e', alignSelf: 'flex-start'}}>{name}</Text>
            <Stars size={12} rate={item.rate} key={item.id+item.rate}/>
            <Text numberOfLines={2} ellipsizeMode={'tail'} style={{fontSize: 12, color: '#333'}}>{description}</Text>
            <View style={{width: '100%', borderStyle: "dashed", borderWidth: 1, borderColor: '#555', borderRadius: 5, marginVertical: 8}}></View>
            <Text style={{fontSize: 12}} numberOfLines={1} ellipsizeMode={"tail"}>Brand: {brand} </Text>
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
    </TouchableOpacity>
        </Skeleton>
    </View>
}
export default ItemComponent;
