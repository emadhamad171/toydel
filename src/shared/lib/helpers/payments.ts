import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {
    confirmPlatformPayPayment,
    initPaymentSheet,
    PlatformPay,
    presentPaymentSheet
} from "@stripe/stripe-react-native";
import Toast from "react-native-toast-message";

const price = {
    default: 40000,
    silver: 78000,
    gold: 96000
}

type responseType ={
    data?: any,
    error?: FetchBaseQueryError | SerializedError
}
export const createPayment = async ({userID,ids, planName,createPaymentIntent}:{userID: string, ids?:string[], planName: string,createPaymentIntent:any}) : Promise<string> => {
    const response :responseType = await createPaymentIntent({
        userID,
        planName,
        ids
    });

    if (response.error) {
        console.log(response.error);
        throw new Error("CREATE-PAYMENT-INTENT-ERROR");
    }
    return response.data.paymentIntent;
}

export const confirmPlatformIntent = async ({intent,totalPrice, planName} : {intent: string,totalPrice?:number, planName: string}) => {
    const { error } = await confirmPlatformPayPayment(
        intent,
        {
            applePay: {
                cartItems: [
                    {
                        label: `ToyBox Services`,
                        amount: `${totalPrice} UAH`,
                        paymentType: PlatformPay.PaymentType.Immediate,
                    },
                ],
                merchantCountryCode: 'UA',
                currencyCode: 'UAH',
                requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
            },
            googlePay: {
                testEnv: true,
                merchantName: 'toybox',
                merchantCountryCode: 'UA',
                currencyCode: 'UAH',
                billingAddressConfig: {
                    format: PlatformPay.BillingAddressFormat.Full,
                    isPhoneNumberRequired: true,
                    isRequired: true,
                },
            },
        }
    );
    console.log(error);
    return error;
}

export const initPlatformPayment = async ({userID, totalPrice,  planName, ids, updateUserPlan,createPaymentIntent}:{userID: string, totalPrice?:number, ids?: string[], planName?: string,updateUserPlan: (a:string)=>void,createPaymentIntent:any}) => {
    try {
        const intent = await createPayment({userID, ids, planName,createPaymentIntent});
        const error = await confirmPlatformIntent({intent, totalPrice, planName});
        if(error) throw new Error('CONFIRM-PAYMENT-ERROR');
        updateUserPlan(planName);
        Toast.show({type: 'success', text1: 'Play already active!'});
    } catch (e){
        console.log(e);
        Toast.show({type: 'error', text1: 'Something went wrong. Try again!'});
    }
}
export const confirmCardIntent = async ({intent} : {intent: string}) => {
    const initResponse = await initPaymentSheet({
        merchantDisplayName: 'ToyBox',
        paymentIntentClientSecret: intent,
    });
    if (initResponse.error) throw new Error('INIT-RESPONSE-PAYMENT-ERROR');
    const paymentResponse = await presentPaymentSheet();
    if(paymentResponse.error) throw new Error('PAYMENT-RESPONSE-ERROR');
}

export const initCardPayment = async ({userID, planName,updateUserPlan, createPaymentIntent}:{userID: string, planName: string,updateUserPlan: (a:string)=>void, createPaymentIntent:any}) => {
    try {
        const intent = await createPayment({userID, planName,createPaymentIntent});
        await confirmCardIntent({intent});
        updateUserPlan(planName);
        Toast.show({type: 'success', text1: 'Play already active!'});
    } catch (e){
        Toast.show({type: 'error', text1: 'Something went wrong. Try again!'});
    }
}
