import {
    cartFilterClear, cartFilterRemoveAge, cartFilterRemoveGender, cartFilterSetAge, cartFilterSetCategry,
    cartFilterSetGender,
    ContinueButton,
    Header,
    normalize, RDSSA,
    useAppDispatch,
    useAppSelector,
    useModal
} from "@shared";
import React, {useState} from "react";
import {SafeAreaView as SAView} from "react-native-safe-area-context";
import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import EIcon from "react-native-vector-icons/Entypo";
import {LinearGradient} from "expo-linear-gradient";
export const FilterItem = ({text='', isActive, setFilters,isOnPress=false, onPress}: {text: string, isActive: boolean, setFilters?: RDSSA<string[]>,isOnPress?:boolean, onPress?: ()=>void}) => {

    return<TouchableOpacity
        onPress={()=>{
            if(isOnPress) {
                onPress();
                return;
            }
            setFilters((prevState) => {
                if(prevState.includes(text))
                    return prevState.filter(el=>el!==text);
                return [...prevState, text];
            });
        }}
        style={{
            alignSelf: 'flex-start',
        }}>
        <LinearGradient style={{borderRadius: 24, borderColor: '#C7C5DE', borderWidth: 2, padding: normalize(10)}} colors={isActive ? ["#8B78FF","#5451D6"] : ["#fff", '#fff']}>
            <Text style={{
                fontFamily: 'Manrope',
                color: isActive ? '#fff' : '#141314',
                fontSize: normalize(22)
            }}>
                {text}
            </Text>
        </LinearGradient>
    </TouchableOpacity>
}

export const FilterModal = ({withCategory=true, isGoBack=false}) => {
    const {
        isFilteredByAge,
        isFilteredByGender,
        isGenderMale,
        restrictionAge,
        activeFilteredCategory
    } = useAppSelector(state=>state.cart);
    const {closeModal, goBack} = useModal();
    const [isSelectedFilteredByGender, setIsFilteredByGender] = useState(isFilteredByGender);
    const [isSelectedGenderMale, setGenderMale] = useState(isGenderMale);
    const [isSelectedFilteredByAge, setIsFilteredByAge] = useState(isFilteredByAge);
    const [age, setAge] = useState(restrictionAge);
    const [filters, setFilters] = useState<string[]>(activeFilteredCategory);
    const dispatch = useAppDispatch();
    return <SAView style={{flex: 1}}>
        <SafeAreaView style={{ flex: 1, zIndex: 955}}>
            <View style={{flex: 1, gap: normalize(16), margin: normalize(26)}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'relative', width: '100%'}}>
                    <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={isGoBack ? goBack : closeModal}>
                        <EIcon name={"chevron-small-left"} color={"#141314"} size={42}/>
                    </TouchableOpacity>

                    <View style={{flex: 2, justifyContent:'center', alignSelf: 'center', alignItems: 'center'}}>
                        <Text style={{alignSelf: 'center', textAlign:'center', fontFamily: 'Cera-Pro-Bold', fontSize: normalize(28)}}>
                            Фільтр
                        </Text>
                    </View>
                    <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={()=>{
                        dispatch(cartFilterClear());
                        if(isGoBack) {
                            goBack();
                            return;
                        }
                        closeModal();
                    }}>
                        <Text style={{
                            fontFamily: 'Cera-Pro',
                            fontSize: normalize(22)
                        }}>
                            Скасувати
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: normalize(12), gap: 8}}>
                    <Header fontFamily={'Manrope-Bold'} fontSize={normalize(28)}>
                        Вік
                    </Header>
                    <View style={{flexDirection: 'row',gap: normalize(8)}}>
                        <FilterItem isOnPress onPress={()=>{
                            setIsFilteredByAge(prevState => !(prevState && age===3));
                            setAge(3)
                        }} isActive={isSelectedFilteredByAge && age===3} text={"до 3"} />
                        <FilterItem isOnPress onPress={()=>{
                            setIsFilteredByAge(prevState => !(prevState && age===6));
                            setAge(6)
                        }} isActive={isSelectedFilteredByAge && age===6} text={"до 6"} />
                        <FilterItem isOnPress onPress={()=>{
                            setIsFilteredByAge(prevState => !(prevState && age===9));
                            setAge(9)
                        }} isActive={isSelectedFilteredByAge && age===9} text={"до 9"} />
                        <FilterItem isOnPress onPress={()=>{
                            setIsFilteredByAge(prevState => !(prevState && age===12));
                            setAge(12)
                        }} isActive={isSelectedFilteredByAge && age===12} text={"до 12"} />
                        <FilterItem isOnPress onPress={()=>{
                            setIsFilteredByAge(prevState => !(prevState && age===16));
                            setAge(16)
                        }}  isActive={isSelectedFilteredByAge && age===16} text={"до 16"} />
                        <FilterItem setFilters={setFilters} isOnPress onPress={()=>{
                            setIsFilteredByAge(prevState => !(prevState && age===18));
                            setAge(18)
                        }} isActive={isSelectedFilteredByAge && age===18} text={"до 18"} />
                    </View>
                </View>
                <View style={{marginTop: normalize(12), gap: 8}}>
                    <Header fontFamily={'Manrope-Bold'} fontSize={normalize(28)}>
                        Стать
                    </Header>
                    <View style={{flexDirection: 'row',gap: normalize(8)}}>
                        <FilterItem isOnPress onPress={()=>{setIsFilteredByGender(prevState => !prevState)}} isActive={!isSelectedFilteredByGender} text={"Універсальні"} />
                        <FilterItem isOnPress onPress={()=>{
                            setGenderMale(prevState => {
                                setIsFilteredByGender(prev=> !(prev && prevState));
                                return true;
                            });
                        }} isActive={isSelectedFilteredByGender && isSelectedGenderMale} text={"Для нього"} />
                        <FilterItem isOnPress onPress={()=>{setGenderMale(prevState => {
                            setIsFilteredByGender(prev=> !(prev && !prevState));
                            return false;
                        })}} isActive={isSelectedFilteredByGender && !isSelectedGenderMale} text={"Для неї"} />
                    </View>
                </View>
                {withCategory && <View style={{marginTop: normalize(12), gap: 8}}>
                    <Header fontFamily={'Manrope-Bold'} fontSize={normalize(28)}>
                        Категорії
                    </Header>
                    <View style={{flexDirection: 'row', gap: normalize(8), flexWrap: 'wrap'}}>
                        <FilterItem setFilters={setFilters}
                                    isActive={filters.includes("Розвиваючі")}
                                    text={"Розвиваючі"}/>
                        <FilterItem setFilters={setFilters}
                                    isActive={filters.includes("Інтерактивні")}
                                    text={"Інтерактивні"}/>
                        <FilterItem setFilters={setFilters}
                                    isActive={filters.includes("Настільні")}
                                    text={"Настільні"}/>
                        <FilterItem setFilters={setFilters}
                                    isActive={filters.includes("Музичні")}
                                    text={"Музичні"}/>
                        <FilterItem setFilters={setFilters}
                                    isActive={filters.includes("Ляльки")}
                                    text={"Ляльки"}/>
                    </View>
                </View>}
            </View>
            <View style={{margin: normalize(24)}}>
                <ContinueButton onPress={()=>{
                    if(isSelectedFilteredByGender) {
                        dispatch(cartFilterSetGender(isSelectedGenderMale));
                    } else {
                        if(isFilteredByGender)
                            dispatch(cartFilterRemoveGender());
                    }
                    if(isSelectedFilteredByAge) {
                        dispatch(cartFilterSetAge(age));
                    } else {
                        if(isFilteredByAge)
                            dispatch(cartFilterRemoveAge());
                    }
                    if(!!filters.length) {
                        dispatch(cartFilterSetCategry(filters));
                    } else {
                        if(!!activeFilteredCategory.length)
                            dispatch(cartFilterSetCategry([]));
                    }
                    if(isGoBack) {
                        goBack();
                        return;
                    }
                    closeModal();
                }}>
                    ЗАСТОСУВАТИ {(!!filters.length || isSelectedFilteredByAge || isSelectedFilteredByGender) && `(${(isSelectedFilteredByAge ? 1 :0) + (isSelectedFilteredByGender ? 1 :0) + (filters.length || 0)})`}
                </ContinueButton>
            </View>
        </SafeAreaView>

    </SAView>
}
