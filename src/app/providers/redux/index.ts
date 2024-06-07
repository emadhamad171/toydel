import { configureStore } from '@reduxjs/toolkit'
import { userSliceReducer, configSliceReducer, apiSlice, modalSliceReducer, cartSliceReducer} from "@shared";
export const store = configureStore({
    reducer: {
        user: userSliceReducer,
        config: configSliceReducer,
        api: apiSlice.reducer,
        modal: modalSliceReducer,
        cart: cartSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware),
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
