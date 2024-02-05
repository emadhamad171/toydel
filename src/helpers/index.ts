import Toast from "react-native-toast-message";
import {loadSpecialItems, loadUser} from "../firebase/firebaseAPI";
import {db} from "../firebase";
import {itemType, notificationType} from "./types";
import {defaultPhoto} from "./constants";
import {Dimensions, PixelRatio} from "react-native";
export const {width: windowWidth, height: windowHeight} = Dimensions.get("window");
export  const normalize = (fontSize) => Math.round(PixelRatio.roundToNearestPixel(windowHeight/1080*fontSize));
export const screenOptions = {
    headerShown: false,
    tabBarShowLabel:false,
    tabBarStyle: {
        height: 50
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
export const signInWarningToast = () =>{
    Toast.show({
        type: 'error',
        text1: 'Something went wrong.',
        text2: 'Try again',
        position: 'top',
        swipeable: true
    });
}

export const loadOrCreateUser = async ({userInstance, setUser})=>{
    const user = await loadUser({userID: userInstance.uid});
    if (user?.length){
        setUser(user[0]);
        return;
    }
    const userCreateInstance = {
        id: userInstance.uid,
        displayName: userInstance?.displayName || 'Set Name',
        email: userInstance?.email || '',
        phoneNumber: userInstance?.phoneNumber || '',
        favoriteList: [''],
        plan: 'default',
        photoURL: userInstance?.photoURL || defaultPhoto,
        bio: 'I Love Toy App!',
        location: null
    }
    await db.collection('users').doc(userInstance.uid).set(userCreateInstance);
    setUser(userCreateInstance);
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
