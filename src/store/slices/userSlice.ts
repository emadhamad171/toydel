import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {firebaseResponseType, userType} from "../../helpers/types";
import {SetStateAction} from "react";
import {loadOrCreateUser} from "../../helpers";
import {loadUser} from "../../firebase/firebaseAPI";


export interface UserState {
    user: userType| firebaseResponseType,
}

const initialState: UserState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state,action: PayloadAction<userType | firebaseResponseType>)=>{
            state.user = action.payload;
        },
        updateUser: (state) => {
            loadUser({}).then((user)=>{
                state.user = user[0];
            });
        },
        updateUserPhoto: (state, action)=>{
            state.user.photoURL = action.payload;
        },
        updateUserName: (state, action) => {
            state.user.displayName = action.payload;
        },
        updateUserFavoriteList: (state,action)=>{
            state.user.favoriteList = action.payload;
        },
        updateUserOnboarding: (state)=>{
            state.user.isOnboarded = true;
        },
        updateUserField: (state, action)=>{
            state.user[action.payload.field] = action.payload.value;
        },
        logoutUser: (state)=>{
            state.user = null;
        }
    },
})

export const { setUser, logoutUser, updateUserField, updateUserPhoto, updateUserName, updateUser,updateUserFavoriteList,updateUserOnboarding } = userSlice.actions

export default userSlice.reducer
