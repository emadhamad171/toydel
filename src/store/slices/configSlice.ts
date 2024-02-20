import { createSlice } from '@reduxjs/toolkit'
import {ColorSchemeName} from "react-native";
import {setBaseColorTheme} from "../../helpers";


export interface UserState {
    theme: ColorSchemeName,
    isDarkTheme: boolean,
    notificationOff: boolean,
}

const initialState: UserState = {
    theme: 'dark',
    isDarkTheme: true,
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
        }
    },
})

export const { toggleTheme,setTheme, toggleNotificationsStatus,setNotificationsStatus } = configSlice.actions

export default configSlice.reducer
