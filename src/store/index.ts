import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./slices/userSlice";
import themeSlice from './slices/configSlice'
export const store = configureStore({
    reducer: {
        user: userSlice,
        config: themeSlice
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
