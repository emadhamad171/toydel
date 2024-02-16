import { createSlice } from '@reduxjs/toolkit'
import {ColorSchemeName, useColorScheme} from "react-native";


export interface UserState {
    theme: ColorSchemeName,
    isDarkTheme: boolean,
}

const initialState: UserState = {
    theme: 'dark',
    isDarkTheme: true
}

export const userSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state,)=>{
            state.theme = state.isDarkTheme ? 'light':'dark';
            state.isDarkTheme = !state.isDarkTheme;
        },
        setTheme: (state, action) =>{
            state.theme = action.payload;
            state.isDarkTheme = action.payload === 'dark';
        }
    },
})

export const { toggleTheme,setTheme } = userSlice.actions

export default userSlice.reducer
