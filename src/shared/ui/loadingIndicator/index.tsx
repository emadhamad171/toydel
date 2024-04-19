import {ActivityIndicator, View} from "react-native";
import {windowHeight, windowWidth} from "@shared";

export const LoadingIndicator = ({isLoading}) => {
    return <View style={{position: 'absolute', zIndex: 555, display: isLoading ? 'flex' : 'none', width: windowWidth, height: windowHeight, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(192,192,192,0.48)'}}>
        <ActivityIndicator size="large" />
    </View>
}
