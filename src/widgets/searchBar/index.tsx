import {useSafeAreaInsets} from "react-native-safe-area-context";
import {normalize, useModal, windowWidth, NativeCategoryIcons} from "@shared";
import {TextInput, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import {Iconify} from "react-native-iconify";
import React from "react";
import {DefaultModalHeader, FilterModal} from "../../features";

const Star = ({left, top, size=24, iconName='ph:star-four-fill', iconColor='#5451D6FF'}) => {
    return <View style={{position: 'absolute',left: left, top: top}}>
        {NativeCategoryIcons[iconName]({color: iconColor, size})}
        {/*<Image style={{width: size, height: size}} source={require('../../../assets/Star.png')} />*/}
    </View>
}
export const SearchBar = ({headerColor="#fff", filterModalProps={}, searchString, onChangeText, searchBarGradientColors = ['#8B78FF', '#5451D6'], borderColor = 'rgba(92,87,220,0.39)', withHeader = false, headerName='', onClickExit=()=>{}, iconName='ph:star-four-fill', iconColor='#5451D6FF', inCategoryModal = false}) => {
    const {top} = useSafeAreaInsets();
    const totalTop = top + (inCategoryModal ? normalize(28) : 0);
    const { openModal } = useModal();

    return <View style={{width: windowWidth+6, borderWidth: 3, marginLeft: -3, borderTopWidth: 0, borderColor: borderColor,borderBottomLeftRadius: 18, borderBottomRightRadius: 18}}>
        <LinearGradient colors={searchBarGradientColors} style={{width: windowWidth+3, marginLeft: -1.5, borderBottomLeftRadius: 18, borderBottomRightRadius: 18, paddingTop: top +normalize(32),paddingBottom: normalize(48)}}>
            {
                withHeader && <DefaultModalHeader onClickBack={()=>{
                    onClickExit();
                }} mb={normalize(18)} textColor={headerColor} text={headerName}/>
            }
            <Star top={totalTop+25} left={5} size={24} iconColor={iconColor} iconName={iconName} />
            <Star top={totalTop} left={240} size={24} iconColor={iconColor} iconName={iconName} />
            <Star top={totalTop-10} left={windowWidth-58} size={24} iconColor={iconColor} iconName={iconName} />
            <Star top={totalTop-24} left={124} size={48} iconColor={iconColor} iconName={iconName} />
            <Star top={totalTop+5} left={24} size={24} iconColor={iconColor} iconName={iconName} />
            <View style={{flexDirection: 'row', alignSelf: 'center', alignItems:'center',justifyContent: 'center', backgroundColor: '#fff', paddingHorizontal: normalize(16),gap: normalize(14), borderRadius: 30}}>
                <Icon name={"search"} size={normalize(28)} color={"rgba(0,0,0,0.32)"}/>
                <TextInput value={searchString} onChangeText={onChangeText} style={{ width: windowWidth-128, maxWidth: 512, borderRadius: 30, paddingVertical: normalize(18),alignSelf: 'center', backgroundColor: '#fff', fontSize: normalize(22)}} placeholder="Пошук" placeholderTextColor={"#ADADAD"} />
                <TouchableOpacity onPress={()=>{
                    openModal(()=><FilterModal {...filterModalProps} />)
                }}>
                    <Iconify icon={'lets-icons:filter-big'} size={normalize(32)} color={"rgba(0,0,0,0.32)"}/>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    </View>;

}
