import {
    auth,
    itemType, LineDecorator, normalize,
    updateItemInDocFromCollection,
    useAppDispatch,
    useAppSelector,
    useModal,
    userType, userUpdateField, windowWidth
} from "@shared";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {Skeleton} from "moti/skeleton";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import {OrderedItemModal} from "../orderedItemModal";

export const ItemComponent = ({item, isFavorite, isLoading}:{item?: itemType, isFavorite: boolean, isLoading: boolean}) => {
    const {openModal} = useModal();
    const user: userType = useAppSelector(state=>state.user.user);
    const dispatch = useAppDispatch();
    const removeItemFromFavoriteList = () =>{
        const updatedList =user.favoriteList.filter((listItem)=>{ if(listItem !== item.id) return listItem});
        updateItemInDocFromCollection({updatedItem: {favoriteList: updatedList}, collectionPath:'users', docName:auth.currentUser.uid});
        dispatch(userUpdateField({field: "favoriteList", value: updatedList}));
    }
    const addItemToFavoriteList = () => {
        const updatedList = [...user.favoriteList, item.id];
        updateItemInDocFromCollection({updatedItem: {favoriteList: updatedList}, collectionPath:'users', docName:auth.currentUser.uid});
        dispatch(userUpdateField({field: "favoriteList", value: updatedList}));
    }
    const handleFavoriteClick = () => {
        isFavorite ? removeItemFromFavoriteList() : addItemToFavoriteList();
    }
    return <TouchableOpacity
        style={{marginHorizontal: normalize(8)}}
        onPress={()=>{
            openModal(()=><OrderedItemModal item={item}/>, false, 'transparency')
        }}>
        <Skeleton show={isLoading} backgroundColor={"#d4d4d4"} colorMode={'light'} colors={['#e7e7e7', 'rgb(151,135,255)']} transition={{type: 'timing', duration: 500, delay: 100}} radius={10}>
            <View style={{
                borderRadius: 10,
                backgroundColor: '#fff',
                width: (windowWidth-normalize(16)*3)/2,
                alignItems: 'center',
                padding: normalize(8),
                paddingBottom: normalize(14),
                justifyContent:'center',
                gap: 8,
            }}>
                <Image source={{uri: item.photo}} style={{
                    width: (windowWidth-normalize(24)*3)/2,
                    height: (windowWidth-normalize(32)*3)/2/1.5,
                    resizeMode: 'stretch',
                    borderRadius: 10
                }}/>
                {!isLoading && <TouchableOpacity onPress={handleFavoriteClick} style={{position: 'absolute', zIndex: 4, top: 5, left:5, borderRadius:50,overflow: 'hidden',}}>
                    <Icon name={isFavorite ? 'heart' : 'heart-o'} style={{zIndex: 4, borderRadius: 50, padding: normalize(8), backgroundColor: '#9787FFFF'}} color={'#fff'} size={normalize(26)}/>
                </TouchableOpacity>}

                <View style={{gap: 8}}>
                    <Text numberOfLines={2} ellipsizeMode={'tail'} style={{fontFamily: 'Manrope-SemiBold', color: '#141314', maxWidth: '85%', fontSize: normalize(16), height: normalize(64)}}>
                        {item.name}
                    </Text>
                    <LineDecorator />
                    <Text style={{fontSize: normalize(16), color: '#141314', fontFamily: 'Manrope-Bold'}}>
                        ₴{item ? item?.price : 1500} / місяць
                    </Text>
                </View>
            </View>
        </Skeleton>
    </TouchableOpacity>
}
