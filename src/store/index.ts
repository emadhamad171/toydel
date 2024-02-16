import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./slices/userSlice";
import themeSlice from './slices/colorThemeSlice'
export const store = configureStore({
    reducer: {
        user: userSlice,
        theme: themeSlice
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
