import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./slices/userSlice";
import themeSlice from './slices/configSlice'
import {apiSlice} from "./slices/apiSlice";
export const store = configureStore({
    reducer: {
        user: userSlice,
        config: themeSlice,
        api: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
