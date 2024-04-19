import {SafeAreaView} from "moti";
import {normalize, windowWidth} from "@shared";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export const itemFix = { itemVisiblePercentThreshold: 150 };

export const defaultPage = () => {
    return  ({item}) => <View style={{flex: 1, width: windowWidth, justifyContent:'space-around'}}>
        <View style={{alignSelf: 'center', alignItems: 'center', gap: normalize(12)}}>
            <View style={{borderRadius:35}}>
                {item.image}
            </View>
            <Text style={{fontSize: normalize(32), fontWeight: "500"}}>
                {item.header}
            </Text>
            <Text style={{fontSize: normalize(24), color: '#444', marginTop: normalize(18)}}>
                {item.subHeader}
            </Text>
        </View>
    </View>
}

export const Dot = ({color, size}) => {
    return <View style={{width: normalize(size),marginHorizontal:normalize(6), height: normalize(size), borderRadius: 50, backgroundColor: color}} />
}
export const Dots = ({pages, currentPage})=>{
    const dotList = Array(pages.length).fill({size: 14, color: '#aaa'});
    return <FlatList style={{flexGrow: 0}} data={dotList} renderItem={({item,index})=><Dot size={item.size} color={index===currentPage ? '#333' : item.color}/>} horizontal/>
}
type paginationPropsType = {
    leftButtonText?: string,
    rightButtonText?: string,
    rightButtonIcon?: string,
    onRightClick?: ()=>void,
    onLeftClick?: ()=>void,
    pages: any[],
    currentPage: number,
    buttonsOff?: boolean
}
export const Pagination = ({leftButtonText,rightButtonText,rightButtonIcon, onRightClick,onLeftClick, pages, currentPage, buttonsOff=false}:paginationPropsType) =>{
    return <SafeAreaView style={{width: windowWidth, justifyContent:'space-around', alignItems:'center', flexDirection: 'row',paddingVertical: normalize(12)}}>
        { !buttonsOff &&
        <TouchableOpacity style={{maxWidth: windowWidth*0.35,minWidth: normalize(124), alignItems:'center'}} onPress={onLeftClick}>
            <Text>
                {leftButtonText}
            </Text>
        </TouchableOpacity>
        }
            <Dots pages={pages} currentPage={currentPage}/>
        {!buttonsOff &&
        <TouchableOpacity style={{maxWidth: windowWidth*0.35, minWidth: normalize(124),alignItems:'center'}} onPress={onRightClick}>
            <Text>
                {rightButtonIcon ? <Icon name={rightButtonIcon} size={normalize(32)} color={'#7d7'}/> : rightButtonText }
            </Text>
        </TouchableOpacity>
        }
    </SafeAreaView>
}
