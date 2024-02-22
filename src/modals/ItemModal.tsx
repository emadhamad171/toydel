import {itemType, userTierType, userType} from "../helpers/types";
import {SafeAreaView} from "moti";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {normalize, windowHeight, windowWidth} from "../helpers";
import Stars from "../components/StarsComponent";
import Icon from "react-native-vector-icons/FontAwesome";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import React, {SetStateAction} from "react";
import {cartStyle} from "../styles";
import PremiumPlansModal from "./PremiumPlansModal";
import {SupportModal} from "./index";
export const AchiveContainer = ({children}) =>{
    return <View style={{ flexDirection: 'row', paddingHorizontal: normalize(8), paddingVertical: normalize(10), backgroundColor: '#eee', borderRadius: 25, marginVertical: normalize(6), maxWidth:normalize(188), width:'50%', alignItems:'center', justifyContent: 'center'}}>
        {children}
    </View>
}

const ChageToyButton = () => <TouchableOpacity style={{width: 135, marginTop: normalize(12)}}>
        <View style={{ backgroundColor: '#dbfcfc', borderRadius: 15, paddingHorizontal: 10, paddingVertical:normalize(14), alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
            <Icon name={'exchange'} size={16} style={{padding:0,marginRight: 4}}/>
            <Text style={cartStyle.smallText}>
                Change toy
            </Text>
        </View>
    </TouchableOpacity>;
const BuyToyButton = () => <TouchableOpacity style={{width: 135, marginTop: normalize(12)}}>
    <View style={{ backgroundColor: '#dbfcdd', borderRadius: 12, paddingHorizontal: 10, paddingVertical: normalize(14), alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
        <MIcon name={'teddy-bear'} size={18} style={{padding:0,marginRight: 4}}/>
        <Text style={cartStyle.smallText}>
            Buy toy
        </Text>
    </View>
</TouchableOpacity>;

const ViewReviewsButton = () =>
    <TouchableOpacity style={{marginTop: normalize(12)}}>
        <View style={{
            backgroundColor: '#d3d3d3',
            borderRadius: 8,
            paddingHorizontal: 10,
            marginHorizontal: normalize(24),
            paddingVertical: normalize(14),
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
        }}>
            <MIcon name={'chart-box-outline'} size={18} style={{padding: 0, marginRight: 4}}/>
            <Text style={cartStyle.smallText}>
                View reviews
            </Text>
        </View>
    </TouchableOpacity>;


const PlansModalButton = ({user,setModal,setModalName,updateUser}:{user:userType, setModal:React.Dispatch<SetStateAction<any>>, setModalName:React.Dispatch<SetStateAction<string>>,updateUser: ()=>void}) => {
    const onOpenPlansClick = () => {
        setModalName('Plans');
        setModal(()=>{return ()=><PremiumPlansModal user={user} updateUser={updateUser} />});
    }

    return <TouchableOpacity onPress={onOpenPlansClick} style={{marginTop: normalize(12)}}>
        <View style={{
            backgroundColor: '#95ee8f',
            borderRadius: 8,
            paddingHorizontal: 10,
            marginHorizontal: normalize(24),
            paddingVertical: normalize(14),
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
        }}>
            <MIcon name={'teddy-bear'} size={18} style={{padding: 0, marginRight: 4}}/>
            <Text style={cartStyle.smallText}>
                Get Started
            </Text>
        </View>
    </TouchableOpacity>;
}

export default ({item, user, isOwned, setModal, setModalName,updateUser} : {item:itemType, user:userType, isOwned ?:boolean, setModal?: React.Dispatch<SetStateAction<any>>, setModalName?:React.Dispatch<SetStateAction<string>>, updateUser?: ()=>void}) => {
    return (
        <SafeAreaView style={{alignItems: 'center', justifyContent:'center', flexGrow:1}}>
            <ScrollView contentContainerStyle={{marginTop: normalize(64), marginBottom: normalize(12), width: windowWidth, paddingBottom: normalize(120)}}>
                <View style={{position:'relative',alignSelf:'center', width: windowWidth*0.9}}>
                    <Image source={{uri: item.photo}} style={{minWidth:170, minHeight:170, width:windowWidth*0.9, height: windowWidth*0.85 <windowHeight*0.45 ? windowWidth*0.85 : windowHeight*0.45, alignSelf: 'center', borderRadius: 10,marginBottom: normalize(10)}} />
                    <View style={{position:'absolute', backgroundColor: '#333',borderRadius:10,padding:1, bottom:normalize(20), left: normalize(5)}}>
                        <Stars rate={item.rate} />
                    </View>
                    <TouchableOpacity onPress={()=>{
                        setModalName('Support');
                        setModal(()=>{return ()=><SupportModal user={user} />})
                    }} style={{position:'absolute', backgroundColor: '#eee',borderRadius:10,padding:3, top:normalize(12), right: normalize(5)}}>
                        <MIcon name={'progress-question'} size={normalize(38)} />
                    </TouchableOpacity>
                </View>
                <View>
                    { isOwned&&user.plan.name!=='default' &&
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
                    }
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
                    { user.plan.name === 'default' ? <PlansModalButton user={user} setModal={setModal} setModalName={setModalName} updateUser={updateUser} /> :
                        <View style={{flexDirection:'row', justifyContent: 'space-between', marginHorizontal: normalize(24),}}>
                        <ChageToyButton />
                        <BuyToyButton />
                    </View>

                    }
                    <ViewReviewsButton />
                </View>
            </ScrollView>
        </SafeAreaView>)
}
