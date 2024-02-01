import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {Dispatch, SetStateAction, useState} from "react";
import ItemComponent from "../components/ItemComponent";
import {itemType, userType} from "../helpers/types";
import WrapperComponent from "../components/WrapperComponent";
import Icon from "react-native-vector-icons/FontAwesome";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons"

type cartItemType = {
    item: itemType
}
type cartItemPropsType = {
    item: cartItemType,
    setItemModal: Dispatch<SetStateAction<any>>,
    setModalName:Dispatch<SetStateAction<string>>,
    user: userType
};

const AchiveContainer = ({children}) =>{
    return <View style={{ flexDirection: 'row', paddingHorizontal: 8, paddingVertical: 5, backgroundColor: '#eee', borderRadius: 25, marginVertical: 6, width:144, alignItems:'center', justifyContent: 'center'}}>
        {children}
    </View>
}

const UserItemModal = ({item, user} : {item:itemType, user:userType}) => {
    return (
    <View style={{margin: 24, alignItems: 'center'}}>
        <View style={{width: 340, height: "100%"}}>
            <Image source={{uri: item.photo}} style={{maxWidth: 340, maxHeight: 340, width:'100%', height:'100%', alignSelf: 'center', borderRadius: 10}} />
            <Text style={{alignSelf:'center', fontSize: 28, fontWeight: '500'}}>
                {item.name}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent:'space-around'}}>
                <AchiveContainer>
                    <Text>Status: </Text>
                    <Text style={{color:'#0f839d'}}>In usage</Text>
                </AchiveContainer>
                <AchiveContainer>
                    <Text>Term: </Text>
                    <Text style={{color:'#0f839d'}}>24.02.2024</Text>
                </AchiveContainer>
            </View>
            <View style={{ flexDirection: 'row', justifyContent:'space-around'}}>
                <AchiveContainer>
                    <Text>Brand: </Text>
                    <Text style={{color:'#0f839d'}}>{item.brand}</Text>
                </AchiveContainer>
                <AchiveContainer>
                    <Text>Cost: </Text>
                    <Text style={{color:'#0f839d'}}>{item.price}$ | 150$/m</Text>
                </AchiveContainer>
            </View>
            <Text style={{alignSelf:'center',marginVertical: 12}} numberOfLines={4} ellipsizeMode={'tail'}>
                {item.description}
            </Text>
            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
            <TouchableOpacity style={{width: 135, marginTop: 12}}>
                <View style={{ backgroundColor: '#dbfcfc', borderRadius: 15, paddingHorizontal: 10, paddingVertical:10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <Icon name={'exchange'} size={16} style={{padding:0,marginRight: 4}}/>
                    <Text>
                        Change toy
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width: 135, marginTop: 12}}>
                <View style={{ backgroundColor: '#dbfcdd', borderRadius: 15, paddingHorizontal: 10, paddingVertical:10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <MIcon name={'teddy-bear'} size={18} style={{padding:0,marginRight: 4}}/>
                    <Text>
                        Buy toy
                    </Text>
                </View>
            </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ marginTop: 12}}>
                <View style={{ backgroundColor: '#d3d3d3', borderRadius: 15, paddingHorizontal: 10, paddingVertical:10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <MIcon name={'chart-box-outline'} size={18} style={{padding:0,marginRight: 4}}/>
                    <Text>
                        View statistic
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>)
}

const CartItem = ({item, setItemModal, setModalName, user}:cartItemPropsType) =>{
    const onClickClose = () => {
        setItemModal(()=>null);
        setModalName(()=>'');
    }
    const onClickMore = () => {
        setModalName(()=>item.item.name);
        setItemModal(()=>{
            return ()=> <UserItemModal user={user} item={item.item} />
        })
    }
    return (
        <View>
            <ItemComponent item={item.item} user={user} isFavorite={true} isOnStatus onClickMore={onClickMore}  />
        </View>
    )
}

const Cart = ({user}) =>{
    const [ItemModal, setItemModal] = useState(null);
    const [modalName, setModalName] = useState<string>('');


    const data:{item:itemType}[] = [
        {
        item: {
            brand: "Big Bang",
            category: ["Fun"],
            description: "Description of toy and even more. Some description about toy, some description about price, some description about toy price and other stuff idk.",
            id: "string",
            isIncludedInPlan: false,
            name: "Name of Toy",
            photo: 'https://firebasestorage.googleapis.com/v0/b/testotp-fabeb.appspot.com/o/noPhotoMini.png?alt=media&token=c137400e-6b63-493e-83ac-d9fab4873ef4',
            price: 500,
            rate: 5
        }
        }
    ]
    return (<>
        <View style={cartStyle.container}>
            <Text style={cartStyle.header}>Your toys</Text>
            <FlatList data={data} renderItem={({item})=><CartItem item={item} user={user} setItemModal={setItemModal} setModalName={setModalName}/>} />
        </View>
            <WrapperComponent ItemModal={ItemModal} setModal={setItemModal} modalName={modalName} />
        </>
    );
}

const cartStyle = StyleSheet.create({
    container: {
        marginTop: 10,
        paddingVertical: 10,
        backgroundColor: '#f3f3f3',
    },
    header: {
        paddingHorizontal: 18,
        fontSize: 32,
        fontWeight: "400",
        paddingBottom: 12,
    },
})

export default Cart;
