import {TextInputProps} from "react-native";
import {RDSSA} from "@shared";

export interface DetailInputProps extends  Pick<TextInputProps, 'textContentType'> {
    placeholder: string,
    description: string,
    onChangeText: RDSSA<string>,
    value: string,
    isPassword?: boolean
    isValid?: boolean
    setIsValid?: RDSSA<boolean>,
    errorText?: string
}
