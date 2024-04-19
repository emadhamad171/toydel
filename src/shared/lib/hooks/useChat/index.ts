import {collection, query, where} from "firebase/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import {chatType, userType, fStorage, loadOrCreateChat} from "@shared";


export const useChatById : (user: userType)=> chatType = (user) => {

    const chatCollection = collection(fStorage, "chats");

    const chatRef = query(chatCollection, where("id", "==", user.id))

    const [chats]: any = useCollection(chatRef);

    return chats?.docs.map?.((el:any)=>{return el.data();})[0];
}
