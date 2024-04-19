import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { paymantApiUrl } from 'react-native-dotenv'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: paymantApiUrl }),
    endpoints: (builder) => ({
        // Payments
        createPaymentIntent: builder.mutation({
            query: (data) => ({
                url: 'payments/intents',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useCreatePaymentIntentMutation
} = apiSlice;
