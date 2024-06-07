import {normalize, useAppSelector, windowWidth} from "@shared";
import {FlatList, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import React from "react";

export const ActiveCategoryList = ({inCategoryModal = false})=> {
    const {
        isFilteredByAge,
        isFilteredByGender,
        isGenderMale,
        restrictionAge,
        activeFilteredCategory
    } = useAppSelector(state=>state.cart);
    const data : string[]= inCategoryModal ? [] : [...activeFilteredCategory];
    if(isFilteredByGender)
        data.push(isGenderMale ? 'Для нього' : 'Для неї');
    if(isFilteredByAge)
        data.push(`до ${restrictionAge}`);
    if(inCategoryModal)
        if(!data.length)
            return null;
    return <View style={{width: windowWidth, justifyContent: 'center', height: normalize(108)}}>
        <FlatList horizontal
                  data={data}
                  style={{
                      width: windowWidth
                  }}
                  contentContainerStyle={{
                      marginTop: normalize(24),
                      marginHorizontal: normalize(12)
                  }}
                  renderItem={({item})=>{
                      return <LinearGradient colors={['#8B78FF','#5451D6']} style={{height: normalize(54), marginHorizontal: normalize(12), justifyContent: 'center', paddingHorizontal: normalize(12), borderRadius: 30}}>
                          <Text style={{
                              fontFamily: 'Manrope',
                              fontSize: normalize(24),
                              color: '#fff'
                          }}>{item}</Text>
                      </LinearGradient>
                  }} />
    </View>
}
