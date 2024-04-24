import {Description} from "../description";
import {normalize} from "../../lib";

export const ErrorMessageText = ({shown, color="#F20909",fontSize=normalize(14), text}: {shown: boolean, color?: string, fontSize?: number, text: string}) => {

    return shown && <Description color={color} fontSize={fontSize}>
        {text}
    </Description>
}
