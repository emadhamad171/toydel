import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useRef, useState} from "react";
import {useCreatePaymentIntentMutation} from "../store/slices/apiSlice";
import {
    isPlatformPaySupported,
    PlatformPayButton,
    PlatformPay
} from "@stripe/stripe-react-native";
import {useDispatch, useSelector} from "react-redux";
import {updateUserField} from "../store/slices/userSlice";
import {RootState} from "../store";
import {SafeAreaView} from "moti";
import {itemFix, Pagination} from "../components/SliderComponents";
import {normalize, windowWidth} from "../helpers";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import {initCardPayment, initPlatformPayment} from "../helpers/payments";
const PlanFeature = ({name}) => {
    return <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: normalize(24)}}>
            <Icon name={'check'} size={normalize(24)} color={'rgba(51,255,61,0.8)'} />
            {name}
        </Text>
    </View>
}

const planRenderItem = ({userID,updateUserPlan,createPaymentIntent}:{userID: string, updateUserPlan: (a:string)=>void, createPaymentIntent: any}) => {

    return  ({item}) => <View style={{flex: 1, width: windowWidth, justifyContent:'space-around'}}>
        <View style={{alignSelf: 'center', alignItems: 'center', gap: normalize(12), flex: 1, paddingTop: normalize(18)}}>
            <View style={{borderRadius:35}}>
                {item.image}
            </View>
            <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: normalize(32), fontWeight: "500"}}>
                {item.item.name.charAt(0).toUpperCase() + item.item.name.slice(1)}
            </Text>
                <Text style={{marginLeft: normalize(16)}}>
                    {item.item.price}UAH
                </Text>
            </View>
            <FlatList horizontal showsHorizontalScrollIndicator={false} data={item.item.features} renderItem={({item})=><PlanFeature name={item} /> }/>
            <Text style={{fontSize: normalize(24), color: '#444', marginTop: normalize(18)}}>
                {item.item.description}
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', gap: normalize(32)}}>
            <PlatformPayButton
                type={PlatformPay.ButtonType.Pay}
                onPress={()=>initPlatformPayment({userID: userID, planName: item.item.name, updateUserPlan, createPaymentIntent})}
                style={{
                    height: normalize(80),
                    width: windowWidth*0.45,
                    padding: 0
                }}
            />

            <TouchableOpacity style={{paddingHorizontal: 10,
                height: normalize(80), width: windowWidth*0.45,
                borderRadius:15, backgroundColor: '#9e6cda', alignItems: 'center', justifyContent: 'center'}}
                              onPress={()=>{
                                  initCardPayment({userID, planName: item.item.name, updateUserPlan,createPaymentIntent})
                              }}>
                <Text style={{fontSize: normalize(28)}}>
                    Order the plan
                </Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>
}

const planList = {
        default: {
            price: 400,
            backgroundColor: '#d29f6c',
            name: 'default',
            description: 'Regular plan and blablabla bla blabla blaalb a lab blabla. Some bla bla bla and blablabla.',
            features: ['1 toy per month', 'Change toys some times', 'Big boss required'],
            sign: {
                name: 'star-outline'
            },
            numberOfToys: 1,
        },
        gold: {
            price: 960,
            backgroundColor: '#ffe44b',
            name: 'gold',
            description: 'Regular plan and blablabla bla blabla blaalb a lab blabla. Some bla bla bla and blablabla.',
            features: ['4 toy per month', 'Change toys every week', 'You are big boss'],
            sign: {
                name: 'check-decagram-outline',
                backgroundColor: '#d66',
            },
        numberOfToys: 2,
        },
        silver: {
            price: 780,
            backgroundColor: '#d6e1e3',
            name: 'silver',
            description: 'Regular plan and blablabla bla blabla blaalb a lab blabla. Some bla bla bla and blablabla.',
            features: ['2 toy per month', 'Change toys some times', 'Big boss required'],
            sign: {
                name: 'star',
            },
        numberOfToys: 4,
        }
}
const Plans = () => {
    const dispatch = useDispatch();
    const flatList = useRef(null);
    const user = useSelector((state:RootState)=>state.user.user);
    const [currentPage, setCurrentPage] = useState(0);
    const updateUserPlan = (plan:string) => {
        dispatch(updateUserField({updatedField: 'plan', value: plan}))
    }
    const [createPaymentIntent] = useCreatePaymentIntentMutation();
    const renderItemProps = {userID: user.id, updateUserPlan, createPaymentIntent};

    const pages = [
        {
            RenderedItem: planRenderItem(renderItemProps),
            header: 'Default',
            subHeader: 'Default Plan',
            item: planList.default,
            image: <Image style={{width: normalize(windowWidth), height:normalize(windowWidth*0.9)}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/testotp-fabeb.appspot.com/o/noPhoto.jpg?alt=media&token=fdae6f63-b7d5-4027-91de-1741d65bf67d'}} />,
        },
        {
            RenderedItem: planRenderItem(renderItemProps),
            header: 'Silver Plan',
            subHeader: 'Silver Plan description',
            item: planList.silver,
            price: 200,
            image: <Image style={{width:windowWidth*0.9, height:windowWidth*0.9}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/testotp-fabeb.appspot.com/o/noPhoto.jpg?alt=media&token=fdae6f63-b7d5-4027-91de-1741d65bf67d'}} />,
        },
        {
            RenderedItem: planRenderItem(renderItemProps),
            header: 'Gold Plan',
            subHeader: 'Gold Plan description',
            item: planList.gold,
            price: 300,
            image: <Image style={{width:windowWidth*0.9, height:windowWidth*0.9}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/testotp-fabeb.appspot.com/o/noPhoto.jpg?alt=media&token=fdae6f63-b7d5-4027-91de-1741d65bf67d'}} />,
        }
    ];
    useEffect(() => {
        (async function () {
            if (!(await isPlatformPaySupported({ googlePay: {testEnv: true} }))) {
                Toast.show({type:'error', text1:'Google Pay is not supported.'});
                return;
            }
        })();
    }, []);

    const onSwipe = ({viewableItems})=>{
        if (!viewableItems[0])
            return;
        setCurrentPage(prevState=>{
            if (prevState!==viewableItems[0])
                return viewableItems[0].index
        });
    };
    const onSwipeRef = useRef(onSwipe);

    return <View style={{flex: 1, backgroundColor: '#fff'}}>
        <SafeAreaView style={{flex:1}}>
            <FlatList ref={flatList}
                      horizontal showsHorizontalScrollIndicator={false} pagingEnabled
                      onViewableItemsChanged={onSwipeRef.current} initialNumToRender={1}
                      viewabilityConfig={itemFix}
                      data={pages}
                      renderItem={({item})=> {
                          const { RenderedItem } = item;
                          return <RenderedItem item={item}/>
                      }}
            />
            <Pagination buttonsOff currentPage={currentPage} pages={pages}/>
        </SafeAreaView>
    </View>
}
export default Plans;
