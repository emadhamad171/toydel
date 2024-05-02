import { FirebaseOptions } from 'firebase/app';
import { Auth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import React, { ComponentProps } from 'react';
import FirebaseRecaptchaBanner from './ui';
import { FirebaseRecaptchaVerifierModal } from './ui/modal';

interface UseFirebaseLogin {
    auth: Auth;
    firebaseConfig: FirebaseOptions;
    modalOption?: ComponentProps<typeof FirebaseRecaptchaVerifierModal>;
    bannerOption?: ComponentProps<typeof FirebaseRecaptchaBanner>;
}

export const useFirebaseLogin = ({
                                     auth,
                                     firebaseConfig,
                                     modalOption,
                                     bannerOption,
                                 }: UseFirebaseLogin) => {
    const recaptchaVerifier = React.useRef(null);

    const sendOtp = async (phoneNumber: string) => {
        if (!phoneNumber || !recaptchaVerifier.current) return;
        const phoneProvider = new PhoneAuthProvider(auth);
        return phoneProvider.verifyPhoneNumber(
            phoneNumber,
            recaptchaVerifier.current
        );
    };
    const verifyOtp = async (verificationId: string, otp: string) => {
        if (!verificationId || !otp) return;
        const credential = PhoneAuthProvider.credential(verificationId, otp);
        return signInWithCredential(auth, credential);
    };

    return {
        recaptcha: (
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                {...modalOption}
                attemptInvisibleVerification={true}
            />
        ),
        recaptchaBanner: <FirebaseRecaptchaBanner {...bannerOption} />,
        sendOtp,
        verifyOtp,
    };
};