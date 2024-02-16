import {
    FlatList,
    RefreshControl,
    Text,
    View
} from "react-native";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import ItemComponent from "../components/ItemComponent";
import {cartItemPropsType, itemType, userType} from "../helpers/types";
import WrapperComponent from "../components/WrapperComponent";
import {defaultPhoto} from "../helpers/constants";
import {SafeAreaView} from "moti";
import ItemModal from "../modals/ItemModal";
import {cartStyle} from "../styles";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";

const CartItem = ({item, setItemModal, setModalName, user, isLoading}:cartItemPropsType) =>{
    const onClickMore = () => {
        setModalName(()=>item.item.name);
        setItemModal(()=>{
            return ()=> <ItemModal user={user} item={item.item} isOwned />
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

const Cart = () =>{
    const user = useSelector((state:RootState)=>state.user.user);
    const dispatch = useDispatch();
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

export default Cart;
