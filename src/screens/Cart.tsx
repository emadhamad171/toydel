import {
    FlatList,
    Image,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import ItemComponent from "../components/ItemComponent";
import {itemType, userType} from "../helpers/types";
import WrapperComponent from "../components/WrapperComponent";
import Icon from "react-native-vector-icons/FontAwesome";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons"
import Stars from "../components/StarsComponent";
import {defaultPhoto} from "../helpers/constants";
import {normalize, windowHeight, windowWidth} from "../helpers";
import {SafeAreaView} from "moti";
type cartItemType = {
    item: itemType
}
type cartItemPropsType = {
    item: cartItemType,
    setItemModal: Dispatch<SetStateAction<any>>,
    setModalName:Dispatch<SetStateAction<string>>,
    user: userType,
    isLoading: boolean,
};

const AchiveContainer = ({children}) =>{
    return <View style={{ flexDirection: 'row', paddingHorizontal: normalize(8), paddingVertical: normalize(10), backgroundColor: '#eee', borderRadius: 25, marginVertical: normalize(6), maxWidth:normalize(188), width:'50%', alignItems:'center', justifyContent: 'center'}}>
        {children}
    </View>
}

const UserItemModal = ({item, user} : {item:itemType, user:userType}) => {
    return (
    <SafeAreaView style={{alignItems: 'center', justifyContent:'center', flexGrow:1}}>
        <View style={{width: 340,marginBottom:15}}>
            <View style={{position:'relative',alignSelf:'center', width: windowWidth*0.9}}>
            <Image source={{uri: item.photo}} style={{minWidth:170, minHeight:170, width:windowWidth*0.9, height: windowWidth*0.85 <windowHeight*0.45 ? windowWidth*0.85 : windowHeight*0.45, alignSelf: 'center', borderRadius: 10,marginBottom: normalize(10)}} />
            <View style={{position:'absolute', backgroundColor: '#333',borderRadius:10,padding:1, bottom:normalize(20), left: normalize(5)}}>
            <Stars rate={item.rate} />
            </View>
            </View>
            {/*<Text style={{alignSelf:'center', fontSize: normalize(32), fontWeight: '500'}}>*/}
            {/*    {item.name + ' '}<Stars rate={item.rate} />*/}
            {/*</Text>*/}
            <View>
            <View style={{ flexDirection: 'row', justifyContent:'space-around'}}>
                <AchiveContainer>
                    <Text style={cartStyle.smallText}>Status: </Text>
                    <Text style={cartStyle.smallItemStatus}>In usage</Text>
                </AchiveContainer>
                <AchiveContainer>
                    <Text style={cartStyle.smallText}>Term: </Text>
                    <Text style={cartStyle.smallItemStatus}>24.02.2024</Text>
                </AchiveContainer>
            </View>
            <View style={{ flexDirection: 'row', justifyContent:'space-around'}}>
                <AchiveContainer>
                    <Text style={cartStyle.smallText}>Brand: </Text>
                    <Text style={cartStyle.smallItemStatus}>{item.brand}</Text>
                </AchiveContainer>
                <AchiveContainer>
                    <Text style={cartStyle.smallText}>Cost: </Text>
                    <Text style={cartStyle.smallItemStatus}>{item.price}$ | 150$/m</Text>
                </AchiveContainer>
            </View>
            </View>

            <Text style={{...cartStyle.smallText,alignSelf:'center',marginVertical: normalize(12)}} numberOfLines={4} ellipsizeMode={'tail'}>
                {item.description}
            </Text>
            <View>
            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
            <TouchableOpacity style={{width: 135, marginTop: normalize(12)}}>
                <View style={{ backgroundColor: '#dbfcfc', borderRadius: 15, paddingHorizontal: 10, paddingVertical:normalize(14), alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <Icon name={'exchange'} size={16} style={{padding:0,marginRight: 4}}/>
                    <Text style={cartStyle.smallText}>
                        Change toy
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width: 135, marginTop: normalize(12)}}>
                <View style={{ backgroundColor: '#dbfcdd', borderRadius: 15, paddingHorizontal: 10, paddingVertical: normalize(14), alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <MIcon name={'teddy-bear'} size={18} style={{padding:0,marginRight: 4}}/>
                    <Text style={cartStyle.smallText}>
                        Buy toy
                    </Text>
                </View>
            </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ marginTop: normalize(12)}}>
                <View style={{ backgroundColor: '#d3d3d3', borderRadius: 15, paddingHorizontal: 10, paddingVertical: normalize(14), alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <MIcon name={'chart-box-outline'} size={18} style={{padding:0,marginRight: 4}}/>
                    <Text style={cartStyle.smallText}>
                        View statistic
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
        </View>
    </SafeAreaView>)
}

const CartItem = ({item, setItemModal, setModalName, user, isLoading}:cartItemPropsType) =>{
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
            <ItemComponent item={item.item} isLoading={isLoading} user={user} isFavorite={true} isOnStatus onClickMore={onClickMore}  />
        </View>
    )
}

const loadData = async ({setLoading}) =>{
    setTimeout(()=>setLoading(false), 800);
}

const Cart = ({user}) =>{
    const [ItemModal, setItemModal] = useState(null);
    const [modalName, setModalName] = useState<string>('');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    const onRefresh = async () => {
        setLoading(true);
        await loadData({setLoading});
    }

    const data:{item:itemType}[] = [
        {
        item: {
            brand: "Big Bang",
            category: ["Fun"],
            description: "Description of toy and even more. Some description about toy, some description about price, some description about toy price and other stuff idk. Some description about toy, some description about price, some description about toy price and other stuff idk. Some description about toy, some description about price, some description about toy price and other stuff idk. Some description about toy, some description about price, some description about toy price and other stuff idk. Some description about toy, some description about price, some description about toy price and other stuff idk. Some description about toy, some description about price, some description about toy price and other stuff idk.Some description about toy, some description about price, some description about toy price and other stuff idk.",
            id: "string",
            isIncludedInPlan: false,
            name: "Name of Toy",
            photo: defaultPhoto,
            price: 500,
            rate: 5
        }
        }
    ]
    return (<View style={{flex: 1}}>
        <SafeAreaView style={cartStyle.container}>
            <View style={{flexDirection: 'row', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={cartStyle.header}>Your toys</Text>
                <Text style={cartStyle.subHeader}>{data.length}/{4}</Text>
            </View>
            <FlatList data={data}
                      renderItem={({item})=><CartItem item={item} key={item.item.id} user={user} isLoading={isLoading} setItemModal={setItemModal} setModalName={setModalName}/>}
                      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
            />
        </SafeAreaView>
            <WrapperComponent ItemModal={ItemModal} setModal={setItemModal} modalName={modalName} />
        </View>
    );
}

const cartStyle = StyleSheet.create({
    container: {
        marginTop: 15,
        paddingVertical: 10,
        backgroundColor: '#f3f3f3',
    },
    header: {
        paddingHorizontal: 18,
        fontSize: 32,
        fontWeight: "400",
        paddingBottom: 12,
    },
    subHeader: {
        paddingHorizontal: 18,
        fontSize: 28,
        fontWeight: "400",
        paddingBottom: 12,
        color:'#3d3a3a'
    },
    smallText: {
        fontSize: normalize(16)
    },
    smallItemStatus:{
        color:'#0f839d',
        fontSize: normalize(16)
    }
})

export default Cart;
