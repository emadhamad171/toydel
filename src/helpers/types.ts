import {GooglePlaceData} from "react-native-google-places-autocomplete";

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

export type userType = {
    id: string,
    email?: string,
    phoneNumber?: string,
    location: GooglePlaceData | null,
    displayName: string,
    favoriteList: string[],
    plan: 'default' | 'silver' | 'gold',
    photoURL: string,
    bio: string,
    supportInfo?: supprotInfoType
}

export type itemType = {
    brand: string,
    category: string[],
    description: string,
    id: string,
    isIncludedInPlan: boolean,
    name: string,
    photo: string,
    price: string | number,
    rate: string | number
}

export type firebaseResponseType = {
    [p: string]: any
}

export type iconInfoType = {
    name: string,
    color?: string,
    backgroundColor?: string,
}

export type planType = {
    price: number,
    backgroundColor: string,
    name: string,
    description: string,
    features: string[],
    sign: iconInfoType
}
