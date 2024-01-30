import Toast from "react-native-toast-message";
import {loadSpecialItems, loadUser} from "../firebase/firebaseAPI";
import {db} from "../firebase";
import {notificationType} from "./types";

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
        photoURL: userInstance?.photoURL || 'https://firebasestorage.googleapis.com/v0/b/testotp-fabeb.appspot.com/o/noPhotoMini.png?alt=media&token=c137400e-6b63-493e-83ac-d9fab4873ef4',
        bio: 'I Love Toy App!',
        location: null
    }
    await db.collection('users').doc(userInstance.uid).set(userCreateInstance);
    setUser(userCreateInstance);
}

export const loadFavoriteData = async ({setFavoriteList, userID, setFavoriteListIds}) =>{
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
}

export const notificationSample : notificationType = {
    id: "0",
    title: '',
    description: '',
    photoURL: 'https://firebasestorage.googleapis.com/v0/b/testotp-fabeb.appspot.com/o/noPhotoMini.png?alt=media&token=c137400e-6b63-493e-83ac-d9fab4873ef4',
    isIndividual: false,
    iconName: '',
};

export const notificationStackSample : notificationType[] = [
    notificationSample,
    {...notificationSample, id: '1'},
    {...notificationSample, id: '2'},
]
