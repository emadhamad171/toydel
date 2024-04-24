import {addDoc, collection, getDocs, setDoc, doc, query, where, orderBy, startAfter, endBefore, limit} from "firebase/firestore";
import {auth, db, fStorage, imgStorage} from "./config";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {updateProfile} from "firebase/auth";
import {v4} from 'uuid'
import {unregisterIndieDevice, firebaseResponseType, itemType, messageType, userType, formatDate} from "@shared";
import Toast from "react-native-toast-message";

export const onPressLogout = async ({setUser}) => {
    await unregisterIndieDevice(auth.currentUser.uid, 19000, 'l5ddGPLeP7FdsO5c8gy4Dl');
    await auth.signOut();
    setUser(null);
    Toast.show({type: 'success', text1: 'Sign out successful'});
}

export const getCurrentUser = () => auth.currentUser;

export const loadAllItems = async ({path}) =>{
    const dataRef=collection(fStorage, path);

    const fetchedData = await getDocs(dataRef);
    return fetchedData.docs.map(el=>{return{...el.data()}});
}
export const loadItems = async ({path, firstSnap, orderField='rate'}) =>{
    const dataRef = collection(fStorage, path);
    const itemRef = query(dataRef, orderBy(orderField),limit(3),startAfter(firstSnap));

    const itemSnap = await getDocs(itemRef);

    return {
        data: itemSnap.docs.map(el=>{return{...el.data()}}),
        snaps: {
            reloadSnap: async (orderFieldR=orderField)=>{
                return await loadItems({path, orderField: orderFieldR, firstSnap});
            },
            isLastPage: itemSnap.docs.length < 3,
            lastSnap: itemSnap.docs[itemSnap.docs.length-1],
            firstSnap: itemSnap.docs[0],
        }
    }
}
export const firstLoadItems = async ({path, orderField = 'rate'}) =>{
    const first = query(collection(fStorage, path), orderBy(orderField), limit(3));
    const itemSnap = await getDocs(first);
    return {
        data: itemSnap.docs.map(el=>{return{...el.data()}}),
        snaps: {
            reloadSnap: async (orderFieldR=orderField)=>{
                return await firstLoadItems({path, orderField: orderFieldR,});
            },
            lastSnap: itemSnap.docs[itemSnap.docs.length-1],
            firstSnap: itemSnap.docs[0],
            isLastPage: itemSnap.docs.length < 3,
        }
    }
}
export const loadItemsInNextPage = async ({path, orderField = 'rate', lastSnap}) => {
    const dataRef = collection(fStorage, path);
    const itemRef = query(dataRef, orderBy(orderField),limit(3),startAfter(lastSnap));
    const itemSnap = await getDocs(itemRef);
    return {
        data: itemSnap.docs.map(el=>{return{...el.data()}}),
        snaps: {
            reloadSnap: async (orderFieldR=orderField)=>{
                return await loadItemsInNextPage({path, orderField: orderFieldR, lastSnap});
            },
            lastSnap: itemSnap.docs[itemSnap.docs.length-1],
            firstSnap: itemSnap.docs[0],
            isLastPage: itemSnap.docs.length < 3,
        }
    }
}
export const loadItemsInPreviousPage = async ({path, orderField = 'rate', firstSnap}) => {
    const dataRef = collection(fStorage, path);
    const itemRef = query(dataRef, orderBy(orderField),limit(3),endBefore(firstSnap));
    const itemSnap = await getDocs(itemRef);
    return {
        data: itemSnap.docs.map(el=>{return{...el.data()}}),
        snaps: {
            reloadSnap: async (orderFieldR=orderField)=>{
                return await loadItemsInPreviousPage({path, orderField: orderFieldR, firstSnap});
            },
            lastSnap: itemSnap.docs[itemSnap.docs.length-1],
            firstSnap: itemSnap.docs[0],
            isLastPage: itemSnap.docs.length < 3,
        }
    }
}
export const loadSpecialItems = async ({path, specOps})  : Promise<userType[] | itemType[] | firebaseResponseType[]> =>{
    const itemRef=query(collection(fStorage, path), where(specOps.filedPath, specOps.opStr, specOps.data));
    const fetchedData = await getDocs(itemRef);
    const specialItems = fetchedData.docs.map((el)=>{return {...el.data()}});
    return specialItems;
}
export const loadUser = async ({userID}:{userID ?: string}) : Promise<userType[] | firebaseResponseType[]> =>{
    const userRef= query(collection(fStorage, "users"), where('id','==',userID || getCurrentUser()));
    const fetchedUser = await getDocs(userRef);
    return fetchedUser.docs.map(el=>{return{...el.data()}});
}
export const loadUserByPhoneNumber = async (phoneNumber: string): Promise<userType> => {
    const userRef = query(collection(fStorage, "users"), where("phoneNumber", "==", phoneNumber));
    const fetchedUser = await getDocs(userRef);
    const data:userType[] = fetchedUser.docs.map(el=>{return{...el.data()}});
    if(!data.length)
        throw new Error("USER-NOT-FOUND");
    return data[0];
}
export const uploadImage = async ({uri, path}) : Promise<string> => {
    const storageReference = ref(imgStorage,path+v4());
    const imageInstance = await fetch(uri);
    const imageBytes = await imageInstance.blob();

    const uploadResult = await uploadBytes(storageReference, imageBytes);

    const imageURL = await getDownloadURL(uploadResult.ref);

    return imageURL;
}
export const addItem = async({uri, item}) : Promise<void> =>{
    try {
        const itemImageUrl = await uploadImage({uri, path: 'items/'});
        const itemRef = collection(fStorage, 'items');
        await addDoc(itemRef,{...item,photo: itemImageUrl});
    } catch (e){
        console.log(e);
    }
}
export const updateUserImage = async ({userInstance, uri}) : Promise<void> => {
    const imageURL = await uploadImage({uri, path: 'profile/pictures/'});
    await updateUserField({updatedField: {photoURL: imageURL}, userID: userInstance.uid});
    await updateProfile(userInstance, {photoURL: imageURL});
}

export const updateItemInDocFromCollection = async({updatedItem, collectionPath, docName}) : Promise<void> =>{
    await db.collection(collectionPath).doc(docName).update(updatedItem);
}

export const updateUserField = async({updatedField, userID}) : Promise<void> =>{
    await db.collection('users').doc(userID).update(updatedField);
}

export const updateUserName = async ({name}) : Promise<void> => {
    const user = getCurrentUser();
    await updateUserField({updatedField: {displayName: name}, userID: user.uid});
    await updateProfile(user,{displayName: name});
}

export const loadOrCreateChat = async (user: userType | firebaseResponseType): Promise<boolean> => {
    const newChat = {
        isActive: false,
        adminID: '',
        messages: [],
        customerName: user.displayName || 'User',
        photoURL: user.photoURL,
        date: formatDate(new Date()),
        id: user.id,
    };
    try {
        const chatData = await getDocs(query(collection(fStorage, "chats"), where('id', '==', user.id)));
        const chat = chatData.docs.map(el=>{return{...el.data()}})[0]
        if(!chat){
            await setDoc(doc(fStorage, "chats", user.id), newChat);
        } else {
            if(chat?.isActive) {
                return true;
            }
        }
    } catch(e) {
        await setDoc(doc(fStorage, "chats", user.id), newChat);
    }
    return false;
}

export const setChatActive = async (id: string, text: string, user: userType | firebaseResponseType) => {
    const chatData = await getDocs(query(collection(fStorage, "chats"), where('id', '==', id)));
    const chat = chatData.docs.map(el=>{return{...el.data()}})[0]
    const chatMessages = chat.messages;
    const newMessage: messageType = {
        text,
        date: formatDate(new Date()),
        from: user.displayName,
        fromUserPhotoURL: user.photoURL,
        isFromAdmin: false,
    };
    await db.collection('chats').doc(id).update({
        isActive: true,
        messages: [...chatMessages, newMessage]
    });
}

export const sendMessage = async (text: string, chatMessages:messageType[], user: userType | firebaseResponseType, photoURL?: string) => {
    const newMessage: messageType = {
        text,
        date: formatDate(new Date()),
        from: user.displayName,
        fromUserPhotoURL: user.photoURL,
        isFromAdmin: false,
        photoURL
    };
    await db.collection('chats').doc(user.id).update({
        messages: [...chatMessages, newMessage]
    });
}
