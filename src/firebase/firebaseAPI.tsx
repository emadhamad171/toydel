import {addDoc, collection, getDocs, query, where} from "firebase/firestore";
import {auth, db, fStorage, imgStorage} from "./index";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {updateProfile} from "firebase/auth";
import {v4} from 'uuid'
import {firebaseResponseType, itemType, userType} from "../helpers/types";

export const getCurrentUser = () => auth.currentUser;

export const loadItems = async ({path}) =>{
    const dataRef=collection(fStorage, path);

    const fetchedData = await getDocs(dataRef);
    return fetchedData.docs.map(el=>{return{...el.data()}});
}
export const loadSpecialItems = async ({path, specOps})  : Promise<userType[] | itemType[] | firebaseResponseType[]> =>{
    const itemRef=query(collection(fStorage, path), where(specOps.filedPath, specOps.opStr, specOps.data));
    const fetchedData = await getDocs(itemRef);
    const specialItems = fetchedData.docs.map((el)=>{return {...el.data()}});
    return specialItems;
}
export const loadUser = async ({userID}) : Promise<userType[] | firebaseResponseType[]> =>{
    const userRef= query(collection(fStorage, "users"), where('id','==',userID));
    const fetchedUser = await getDocs(userRef);
    return fetchedUser.docs.map(el=>{return{...el.data()}});
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
