import {
    cartAddItem,
    ContinueButton,
    Description,
    Header,
    itemType, LineDecorator, mockCategory,
    NativeCategoryIcons,
    normalize,
    useAppDispatch,
    useModal,
    windowWidth
} from "@shared";
import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {SafeAreaView as SAView} from "react-native-safe-area-context";
import {Iconify} from "react-native-iconify";
import React from "react";

export const OrderedItemModal = ({item, isGoBack=false}: {item: itemType,isGoBack?: boolean}) => {
    const {
        closeModal,
        goBack
    } = useModal();
    const dispatch = useAppDispatch();
    const itemCategory = mockCategory["Розвиваючі"]
    return <View style={{flex: 1, backgroundColor: '#fff'}}>
        <LinearGradient colors={['rgba(0,0,0,0.13)','#fff', '#fff']} style={{flex: 1}}>
            <SAView style={{flex: 1}}>
                <SafeAreaView style={{ flex: 1, zIndex: 955}}>
                    <View style={{height: '40%', backgroundColor: '#fff',borderTopLeftRadius: 24, borderTopRightRadius: 24}}>
                        <Image source={{uri: item.photo}} style={{width: windowWidth, resizeMode: 'stretch',borderTopLeftRadius: 24, borderTopRightRadius: 24, height: '100%'}}/>
                        <TouchableOpacity onPress={isGoBack? goBack : closeModal} style={{borderRadius: 50, backgroundColor: '#fff',position: 'absolute', right: 20, top: 20, padding: 6}}>
                            <Iconify icon={'mdi:close'} size={24} color={"#6B7076"}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, backgroundColor: '#fff'}}>
                        <View style={{position: 'absolute',flexDirection: 'row',zIndex: 999, top: -normalize(34), left: normalize(32), gap: normalize(16)}}>
                            <LinearGradient colors={itemCategory.gradientColors} style={{flexDirection: 'row', gap:12, alignItems:'center' , paddingVertical: normalize(6), paddingHorizontal: normalize(12), borderRadius: 25}}>
                                <View style={{backgroundColor: '#fff', borderRadius: 50, padding: 4}}>
                                    {NativeCategoryIcons[itemCategory.iconName]({color: itemCategory.iconColor})}
                                </View>
                                <Text style={{textAlign: 'center', color: '#fff', fontSize: normalize(22), fontFamily: 'Manrope-SemiBold'}}>
                                    {itemCategory.name}
                                </Text>
                            </LinearGradient>
                            <LinearGradient colors={['#FFE978', '#D69151']} style={{flexDirection: 'row', gap:12, alignItems:'center' , paddingVertical: normalize(6), paddingHorizontal: normalize(12), borderRadius: 25}}>
                                <Text style={{textAlign: 'center', color: '#fff', fontSize: normalize(22), fontFamily: 'Manrope-SemiBold'}}>
                                    6+ років
                                </Text>
                            </LinearGradient>
                        </View>
                        <ScrollView style={{marginHorizontal: normalize(24),backgroundColor: '#fff', paddingTop: normalize(26)}}>
                            <Header fontSize={18}>{item.name}</Header>
                            <Description numberOfLines={5} >{item.description}</Description>
                            <View style={{marginTop: normalize(32), gap: normalize(32)}}>
                                <View style={{gap: normalize(32)}}>
                                    <LineDecorator width={windowWidth-normalize(32)} />
                                    <View style={{flexDirection: 'row', gap: normalize(8)}}>
                                        <View style={{width: normalize(96)}}>
                                            <Description color={"rgba(0,0,0,0.4)"}>
                                                Розміри:
                                            </Description>
                                        </View>
                                        <Description color={'#000'}>
                                            230x60см
                                        </Description>
                                    </View>
                                </View>
                                <View style={{gap: normalize(32)}}>
                                    <LineDecorator width={windowWidth-normalize(32)} />
                                    <View style={{flexDirection: 'row', gap: normalize(8)}}>
                                        <View style={{width: normalize(96)}}>
                                            <Description color={"rgba(0,0,0,0.4)"}>
                                                Вага:
                                            </Description>
                                        </View>
                                        <Description color={'#000'}>
                                            15кг
                                        </Description>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>

                        <View style={{ marginHorizontal: normalize(32), flex: 1, gap: 8}}>
                            <Text style={{color: "#000", fontFamily: 'Manrope-Bold'}}>
                                ₴{item.price}/ місяць
                            </Text>
                            <ContinueButton onPress={()=>{
                                dispatch(cartAddItem(item));
                                if(isGoBack) {
                                    goBack();
                                    return;
                                }
                                closeModal();
                            }} >
                                ЗАМОВИТИ
                            </ContinueButton>
                        </View>
                    </View>
                </SafeAreaView>
            </SAView>
            <View></View>
        </LinearGradient>
    </View>
}
