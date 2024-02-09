import {itemType, userType} from "../helpers/types";
import {SafeAreaView} from "moti";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {normalize, windowHeight, windowWidth} from "../helpers";
import Stars from "../components/StarsComponent";
import Icon from "react-native-vector-icons/FontAwesome";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import {cartStyle} from "../styles";
export const AchiveContainer = ({children}) =>{
    return <View style={{ flexDirection: 'row', paddingHorizontal: normalize(8), paddingVertical: normalize(10), backgroundColor: '#eee', borderRadius: 25, marginVertical: normalize(6), maxWidth:normalize(188), width:'50%', alignItems:'center', justifyContent: 'center'}}>
        {children}
    </View>
}
export default ({item, user} : {item:itemType, user:userType, isOwned:boolean}) => {
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
