import {Animated} from "react-native";
import Toast from "react-native-toast-message";

export const hideAuthScreen = ({posBody}) => {
    Animated.spring(posBody,{
            toValue: 500,
            speed:1.5,
            useNativeDriver: false,
        }
    ).start();
}

export const showAuth = ({topPos, marginTop}) =>{
    Animated.spring(topPos,{
            toValue: 0,
            useNativeDriver: false,
        }
    ).start();
    Animated.spring(marginTop,{
            toValue: 0,
            useNativeDriver: false,
        }
    ).start();
}

export const showLoading = ({topPos, marginTop, afterAnimate}) =>{
    Animated.spring(topPos,{
            toValue: 650,
            speed:1.5,
            useNativeDriver: false,
        }
    ).start(()=>{afterAnimate()});
    Animated.spring(marginTop,{
            toValue: 270,
            speed:1.5,
            useNativeDriver: false,
        }
    ).start(afterAnimate);
}

export const hideLoading =({topPos, marginTop}) =>{
    Animated.spring(topPos,{
            toValue: 0,
            speed: 10,
            useNativeDriver: false,
        }
    ).start();
    Animated.spring(marginTop,{
            toValue: 0,
            speed: 10,
            useNativeDriver: false,
        }
    ).start();
    Toast.show({type: 'error', text1: "Something went wrong.", text2: "Try again!",topOffset: 10})
}
