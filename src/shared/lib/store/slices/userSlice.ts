import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { loadUser, firebaseResponseType, userType } from "@shared";


export interface UserSliceState {
    user: userType| firebaseResponseType,
}

const initialState: UserSliceState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userSet: (state,action: PayloadAction<userType | firebaseResponseType>)=>{
            state.user = action.payload;
        },
        userUpdate: (state) => {
            loadUser({}).then((user)=>{
                state.user = user[0];
            });
        },
        userUpdatePhoto: (state, action)=>{
            state.user.photoURL = action.payload;
        },
        userUpdateName: (state, action) => {
            state.user.displayName = action.payload;
        },
        userUpdateFavoriteList: (state,action)=>{
            state.user.favoriteList = action.payload;
        },
        userUpdateOnboarding: (state)=>{
            state.user.isOnboarded = true;
        },
        userUpdateField: (state, action)=>{
            state.user[action.payload.field] = action.payload.value;
        },
        userLogout: (state)=>{
            state.user = null;
        }
    },
})

export const { userLogout, userSet, userUpdateField, userUpdateName, userUpdate, userUpdateFavoriteList,userUpdatePhoto,userUpdateOnboarding } = userSlice.actions

export default userSlice.reducer
