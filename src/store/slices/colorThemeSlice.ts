import { createSlice } from '@reduxjs/toolkit'
import {ColorSchemeName} from "react-native";
import {setBaseColorTheme} from "../../helpers";


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
            setBaseColorTheme(state.isDarkTheme ? 'light':'dark').then();
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
