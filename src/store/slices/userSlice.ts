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
        setUser: (state,action: PayloadAction<userType>)=>{
            state.user = action.payload;
        },
        updateUser: (state, action) => {
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
        logoutUser: (state)=>{
            state.user = null;
        }
    },
})

export const { setUser, logoutUser, updateUserPhoto, updateUserName, updateUser } = userSlice.actions

export default userSlice.reducer
