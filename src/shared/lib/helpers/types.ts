import {Dispatch, SetStateAction} from "react";

export type notificationPropsType = {
    id?: number,
    title: string,
    description: string,
    photoURL: string,
    isIndividual: boolean,
    isRevised: boolean,
    isRefreshing?: boolean,
    iconName: string,
    iconProps?: any,
    props?: any,
};
export type notificationType = {
    id: string,
    title: string,
    description: string,
    photoURL: string,
    isIndividual: boolean,
    iconName: string,
    iconProps?: any,
    props?: any
}
export type supprotInfoType = {
    auth_token: string,
    lc_ids: string
}

export type ownedItemStatusType = 'in usage' | 'in delivery';
export type userTierType = 'default' |'bronze' | 'gold' | 'silver';

export type ownedItemType = {
    id: string,
    endDate: string,
    status: ownedItemStatusType,
}

export type userType = {
    id: string,
    email?: string,
    phoneNumber?: string,
    location: string,
    displayName: string,
    favoriteList: string[],
    ownedList: ownedItemType[],
    plan: planType,
    photoURL: string,
    bio: string,
    supportInfo?: supprotInfoType,
    isOnboarded?: boolean,
    adminLevel?: number
} | firebaseResponseType | null;

export type cartItemType = {
    item: itemType
}
export type cartItemPropsType = {
    item: cartItemType,
    setItemModal: Dispatch<SetStateAction<any>>,
    setModalName:Dispatch<SetStateAction<string>>,
    user: userType | firebaseResponseType,
    isLoading: boolean,
};

export type itemComponentPropsType = {
    setFavoriteToyList?: Dispatch<SetStateAction<string[]>>,
    item: itemType | firebaseResponseType,
    isFavorite: boolean,
    isOnStatus?: boolean,
    isLoading?: boolean,
    user?: userType | firebaseResponseType| null,
    onClickMore?: ()=>void,
};

export type itemReviewType = {
    rate: number,
    reviewerName: string,
    reviewerPhotoURL: string
}

export type itemType = {
    brand: string,
    category: string[],
    reviews?: itemReviewType[],
    description: string,
    id: string,
    isIncludedInPlan: boolean,
    name: string,
    photo: string,
    price: string | number,
    rate: string | number,
    initPrice?: number | string,
    amount?: number,
    isNew?: boolean
} | firebaseResponseType | undefined;

export type firebaseResponseType = {
    [p: string]: any
}

export type iconInfoType = {
    name: string,
    color?: string,
    backgroundColor?: string,
}

export type planType = {
    price?: number,
    backgroundColor?: string,
    name: userTierType,
    description?: string,
    features?: string[],
    sign?: iconInfoType,
    numberOfToys: number
}

export type messageType = {
    text: string,
    date: string,
    from: string,
    photoURL?: string,
    fromUserPhotoURL?: string,
    isDelivered?: boolean,
    isFromAdmin?: boolean,
    isFromSystem?: boolean,
    isEndMessage?: boolean,
    fromAdminID?: string,
}

export type chatType = {
    isActive: boolean,
    adminID: string,
    messages: messageType[],
    customerName: string,
    photoURL?: string,
    date?: string,
    id: string,
}
