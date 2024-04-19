import {useState} from "react";
import RegisterScreen from "../../screens/registerScreen";
import { RDSSA } from '@shared';
import VerificationScreen from "../../screens/otpVerification";

const RegisterFlow = ({setIsLogin} :{setIsLogin: RDSSA<boolean>}) => {
    const [formattedValue, setFormattedValue] = useState('');
    const [otpCodeId, setOtpCodeId] = useState('');

    if(!!otpCodeId)
        return <VerificationScreen otpCodeId={otpCodeId}/>

    return <RegisterScreen formattedValue={formattedValue} setIsLogin={setIsLogin} setOtpCodeId={setOtpCodeId} setFormattedValue={setFormattedValue}/>
}

export default RegisterFlow;
