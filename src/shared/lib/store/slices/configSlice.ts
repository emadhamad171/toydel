import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ColorSchemeName} from "react-native";
import {setBaseColorTheme} from "@shared";


export interface ConfigState {
    theme: ColorSchemeName,
    isDarkTheme: boolean,
    isLoading: boolean,
    notificationOff: boolean,
    isResetPassword: boolean,
    isLogin: boolean,
    isConnectionLost: boolean,
    oobCode?: string
}

const initialState: ConfigState = {
    theme: 'light',
    isDarkTheme: true,
    isLoading: true,
    notificationOff: false,
    isResetPassword: false,
    isLogin: false,
    isConnectionLost: false,
    oobCode: ''
}

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        appToggleTheme: (state,)=>{
            setBaseColorTheme(state.isDarkTheme ? 'light':'dark').then();
            state.theme = state.isDarkTheme ? 'light':'dark';
            state.isDarkTheme = !state.isDarkTheme;
        },
        appSetTheme: (state, action) =>{
            state.theme = action.payload;
            state.isDarkTheme = action.payload === 'dark';
        },
        appToggleNotificationsStatus: (state)=>{
            state.notificationOff = !state.notificationOff;
        },
        appSetNotificationsStatus: (state, action) => {
            state.notificationOff = action.payload;
        },
        appSetLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        appSetConnection: (state, action: PayloadAction<boolean>) => {
            state.isConnectionLost = !action.payload;
        },
        appSetIsLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload;
        },
        appSetIsResetPassword: (state, action: PayloadAction<boolean>) => {
            state.isResetPassword = action.payload;
        },
        appSetOobCode: (state, action: PayloadAction<string>)=>{
            state.oobCode = action.payload;
        }
    },
})

export const { appSetOobCode, appToggleTheme, appSetTheme, appToggleNotificationsStatus,appSetNotificationsStatus,appSetLoading, appSetConnection, appSetIsResetPassword, appSetIsLogin } = configSlice.actions

export default configSlice.reducer
