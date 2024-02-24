import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://192.168.0.101:3000/';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl }),
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
