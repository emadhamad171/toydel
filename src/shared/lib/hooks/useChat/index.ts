import {collection, query, where} from "firebase/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import {chatType, userType} from "../../../../helpers/types";
import {fStorage} from "../../../../firebase";
import {loadOrCreateChat} from "../../../../firebase/firebaseAPI";


export const useChatById : (user: userType)=> chatType = (user) => {

    const chatCollection = collection(fStorage, "chats");

    const chatRef = query(chatCollection, where("id", "==", user.id))

    const [chats]: any = useCollection(chatRef);

    return chats?.docs.map?.((el:any)=>{return el.data();})[0];
}
