import {loadUserByPhoneNumber} from "@shared";

export const getEmailByPhoneNumber = async (phoneNumber: string) => {
    let formattedNumber: string = phoneNumber;

    if(phoneNumber.length !== 13 && phoneNumber[0]!='+'){
        if(phoneNumber.length >= 13 || phoneNumber.length < 10){
            throw new Error('PHONE-NUMBER-INVALID');
        }
        if(phoneNumber.length === 12) {
            formattedNumber = '+'+phoneNumber
        } else
        if(phoneNumber.length === 10) {
            formattedNumber = '+38'+phoneNumber;
        } else {
            throw new Error('PHONE-NUMBER-INVALID');
        }
    }
    console.log(formattedNumber);
    const user = await loadUserByPhoneNumber(formattedNumber);
    return user.email;
}
