import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ColorSchemeName} from "react-native";
import {setBaseColorTheme} from "@shared";


export interface ConfigState {
    theme: ColorSchemeName,
    isDarkTheme: boolean,
    isLoading: boolean,
    notificationOff: boolean,
}

const initialState: ConfigState = {
    theme: 'light',
    isDarkTheme: true,
    isLoading: false,
    notificationOff: false
}

export const configSlice = createSlice({
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
        },
        toggleNotificationsStatus: (state)=>{
            state.notificationOff = !state.notificationOff;
        },
        setNotificationsStatus: (state, action) => {
            state.notificationOff = action.payload;
        },
        appSetLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    },
})

export const { toggleTheme,setTheme, toggleNotificationsStatus,setNotificationsStatus,appSetLoading } = configSlice.actions

export default configSlice.reducer
