import {MotiView} from "moti";
import {normalize, windowWidth} from "@shared";
import {Image} from "react-native";

export const AnimatedView = ({children, duration = 400, style={}, from, exit, exitDuration=600, animate}: any) => {
    return <MotiView
        from={{
            opacity: 0,
            ...from
        }}
        animate={{
            opacity: 1,
            scale: 1,
            ...animate
        }}
        exit={{
            opacity: 0.5,
            ...exit
        }}
        exitTransition={{
            type: 'timing',
            duration: exitDuration,
        }}
        transition={{
            type: 'timing',
            duration: duration
        }}
        style={style}
    >
        {
            children
        }
    </MotiView>
}
export const Circle = ({children}: {children: any}) => <AnimatedView
    duration={1000}
    from={{
        scale: 0,
    }}
    exitDuration={1600}
    style={{
        width: normalize(112),
        height: normalize(112),
        borderRadius: 50,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7065EB',
        zIndex: 666,
    }}
>
    {children}
</AnimatedView>;

export const Star = ({left, top, duration = 1000}) => {
    return <AnimatedView duration={duration} style={{position: 'absolute',left: left, top: top}}>
        <Image source={require('../../../../assets/Star.png')} />
    </AnimatedView>
}

export const Cloud = ({left, top,width=normalize(164), duration = 1000,fromLeft=false}) => {
    return <AnimatedView duration={duration} from={{translateX: fromLeft ? -windowWidth : windowWidth}} animate={{translateX: 0}} style={{position: 'absolute',left: left, top: top}}>
        <Image style={{width: width, objectFit: 'contain'}} source={require('../../../../assets/Cloud.png')} />
    </AnimatedView>
}
