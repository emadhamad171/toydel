import {View, Image, FlatList} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "moti";
import {useRef, useState} from "react";
import {defaultPage, itemFix, Pagination} from "../components/SliderComponents";
import {
    useAppSelector,
    updateUserField,
    userUpdateOnboarding,
    windowWidth,
    useAppDispatch
} from "@shared";

export default ()=>{
    const user = useAppSelector((state)=>state.user.user);
    const dispatch = useAppDispatch();
    const setOnboarded = ()=>{
        updateUserField({updatedField: {isOnboarded: true}, userID: user.id}).then(()=>{
            dispatch(userUpdateOnboarding());
        }).catch(()=>{
            dispatch(userUpdateOnboarding());
        });
    }

    const [currentPage, setCurrentPage] = useState(0);
    const flatList = useRef(null);
    const navigation = useNavigation();

    const onSkip = () => {
        navigation.navigate('Profile' as never)
        setOnboarded();
    }
    const onNextPage = () => {
        flatList.current.scrollToIndex({
            animated: true,
            index: currentPage+1
        });

    }
    const onPreviousPage = () => {
        flatList.current.scrollToIndex({
            animated: true,
            index: currentPage-1
        });
    }
    const onSwipe = ({viewableItems})=>{
        if (!viewableItems[0])
            return;
         setCurrentPage(prevState=>{
             if (prevState!==viewableItems[0])
             return viewableItems[0].index
         });
    };
    const onSwipeRef = useRef(onSwipe);
    const pages = [
        {
            RenderedItem: defaultPage(),
            header: '1st Item Header',
            subHeader: 'Some text here and more description',
            image: <Image style={{width:windowWidth*0.9, height:windowWidth*0.9}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/testotp-fabeb.appspot.com/o/noPhoto.jpg?alt=media&token=fdae6f63-b7d5-4027-91de-1741d65bf67d'}} />,
        },
        {
            RenderedItem: defaultPage(),
            header: '2nd Item Header',
            subHeader: 'Some text here and more description',
            image: <Image style={{width:windowWidth*0.9, height:windowWidth*0.9}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/testotp-fabeb.appspot.com/o/noPhoto.jpg?alt=media&token=fdae6f63-b7d5-4027-91de-1741d65bf67d'}} />,
        },
        {
            RenderedItem: defaultPage(),
            header: '3d Item Header',
            subHeader: 'Some text here and more description',
            image: <Image style={{width:windowWidth*0.9, height:windowWidth*0.9}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/testotp-fabeb.appspot.com/o/noPhoto.jpg?alt=media&token=fdae6f63-b7d5-4027-91de-1741d65bf67d'}} />,
        }
    ];
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
            <Pagination leftButtonText={currentPage ? 'Previous' : 'Skip'} rightButtonText={'Next'} rightButtonIcon={currentPage===pages.length-1 && 'check'} onLeftClick={!currentPage ? onSkip : onPreviousPage} onRightClick={currentPage===pages.length-1 ? onSkip : onNextPage} currentPage={currentPage} pages={pages}/>
        </SafeAreaView>
    </View>
}
