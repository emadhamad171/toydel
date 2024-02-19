import Toast from "react-native-toast-message";
import {getCurrentUser, loadSpecialItems, loadUser, updateUserImage} from "../firebase/firebaseAPI";
import {db} from "../firebase";
import {itemType, notificationType, userType} from "./types";
import {defaultPhoto} from "./constants";
import {Dimensions, PixelRatio} from "react-native";
import {launchImageLibrary} from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadBaseColorTheme = async (baseTheme : string) => {
    const colorTheme = await AsyncStorage.getItem('colorTheme');
    if(!colorTheme) await setBaseColorTheme(baseTheme);
    return colorTheme || baseTheme;
}
export const setBaseColorTheme = async (colorTheme = 'dark') => {
    await AsyncStorage.setItem('colorTheme', colorTheme);
}
export const {width: windowWidth, height: windowHeight} = Dimensions.get("window");
export  const normalize = (fontSize) => Math.round(PixelRatio.roundToNearestPixel(windowHeight/1080*fontSize));

export const wait = async () =>{
    return await new Promise((resolve)=>{setTimeout(()=>{resolve(1);}, 600)});
}

export const screenOptions = {
    headerShown: false,
    tabBarShowLabel:false,
    tabBarStyle: {
        height: normalize(75),
        paddingVertical: normalize(10)
    }
};
export const signInSuccessfulToast = () =>{
    Toast.show({
        type: 'success',
        text1: 'Log in successfully!',
        text2: '',
        position: 'top',
        swipeable: true
    });
}
export const signInWarningToast = (text = 'Try again') =>{
    Toast.show({
        type: 'error',
        text1: 'Something went wrong.',
        text2: text,
        position: 'top',
        swipeable: true
    });
}

export const updateImage = async({setUserImage})=>{
    try {
        const userInstance = getCurrentUser();
        const options:any = {
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: true,
        };
        const res = await launchImageLibrary(options);
        const uri = res?.assets && res.assets[0].uri;
        uri && await updateUserImage({userInstance, uri});
        uri && setUserImage(uri);
    } catch (e){
        console.log(e);
    }
}

export const loadOrCreateUser = async ({userInstance})=>{
    const user = (await loadUser({userID: userInstance.uid}))[0];
    if (user){
        return user;
    }
    const userCreateInstance :userType = {
        id: userInstance.uid,
        displayName: userInstance?.displayName || 'Set Name',
        email: userInstance?.email || '',
        phoneNumber: userInstance?.phoneNumber || '',
        favoriteList: [''],
        ownedList: [],
        plan: 'default',
        photoURL: userInstance?.photoURL || defaultPhoto,
        bio: 'I Love Toy App!',
        location: null,
        isOnboarded: false,
    }
    await db.collection('users').doc(userInstance.uid).set(userCreateInstance);
    return userCreateInstance;
}

export const loadFavoriteData = async ({setFavoriteList, userID, setFavoriteListIds, setLoading}) =>{
    const user = await loadUser({userID});
    const favoriteList = user[0].favoriteList;
    const specOps = {
        filedPath: 'id',
        opStr: 'in',
        data: favoriteList
    }
    const favoriteListItems = await loadSpecialItems({path: "items", specOps});
    setFavoriteList(favoriteListItems);
    setFavoriteListIds(favoriteList);
    setLoading(false);
}

export const notificationSample : notificationType = {
    id: "0",
    title: '',
    description: '',
    photoURL: defaultPhoto,
    isIndividual: false,
    iconName: '',
};

export const notificationStackSample : notificationType[] = [
    notificationSample,
    {...notificationSample, id: '1'},
    {...notificationSample, id: '2'},
]

export const itemSample : itemType = {
    brand: 'brand',
    category: ['category'],
    description: 'description',
    id: '0a',
    isIncludedInPlan: true,
    name: 'Name',
    photo: defaultPhoto,
    price: 400,
    rate: 4
}

export const itemsStackSample : itemType[] = [
    itemSample,
    {...itemSample, id: '1c'},
    {...itemSample, id: '2s'},
    {...itemSample, id: '3d'},
    {...itemSample, id: '4e'},
]
