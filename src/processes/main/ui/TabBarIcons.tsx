import React from "react";
import Svg, {G, Path, LinearGradient, SvgProps, Stop} from "react-native-svg";

interface IconProps extends SvgProps {
    isActive: boolean;
    text?: string;
}

export const HomeIcon = ({
                             // width = normalize(34),
                             // height = normalize(34),
                             width = 24,
                             height = 24,
                             isActive = false,
                             ...props
                         }: IconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" {...props}>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#8B78FF" stopOpacity="1"/>
                <Stop offset="1" stopColor="#5451D6" stopOpacity="1"/>
            </LinearGradient>
            <G
                fill="none"
                stroke={isActive ? "url(#grad)" : "currentColor"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                color="currentColor"
            >
                <Path
                    fill={isActive ? "url(#grad)" : "none"}
                    stroke={isActive ? "url(#grad)" : "currentColor"}
                    d="m9 22l-.251-3.509a3.259 3.259 0 1 1 6.501 0L15 22"
                ></Path>
                <Path
                    d="M2.352 13.214c-.354-2.298-.53-3.446-.096-4.465s1.398-1.715 3.325-3.108L7.021 4.6C9.418 2.867 10.617 2 12.001 2c1.382 0 2.58.867 4.978 2.6l1.44 1.041c1.927 1.393 2.89 2.09 3.325 3.108c.434 1.019.258 2.167-.095 4.464l-.301 1.96c-.5 3.256-.751 4.884-1.919 5.856S16.554 22 13.14 22h-2.28c-3.415 0-5.122 0-6.29-.971c-1.168-.972-1.418-2.6-1.918-5.857z"></Path>
            </G>
        </Svg>
    );
};
export const CatalogIcon = ({
                                // width = normalize(34),
                                // height = normalize(34),
                                width = 24,
                                height = 24,
                                isActive = false,
                                ...props
                            }: IconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" {...props}>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#8B78FF" stopOpacity="1"/>
                <Stop offset="1" stopColor="#5451D6" stopOpacity="1"/>
            </LinearGradient>
            <Path
                fill={isActive ? "url(#grad)" : "none"}
                stroke={isActive ? "url(#grad)" : "currentColor"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M2 18c0-1.54 0-2.31.347-2.876c.194-.317.46-.583.777-.777C3.689 14 4.46 14 6 14s2.31 0 2.876.347c.317.194.583.46.777.777C10 15.689 10 16.46 10 18s0 2.31-.347 2.877c-.194.316-.46.582-.777.776C8.311 22 7.54 22 6 22s-2.31 0-2.876-.347a2.35 2.35 0 0 1-.777-.776C2 20.31 2 19.54 2 18m12 0c0-1.54 0-2.31.347-2.876c.194-.317.46-.583.777-.777C15.689 14 16.46 14 18 14s2.31 0 2.877.347c.316.194.582.46.776.777C22 15.689 22 16.46 22 18s0 2.31-.347 2.877a2.36 2.36 0 0 1-.776.776C20.31 22 19.54 22 18 22s-2.31 0-2.876-.347a2.35 2.35 0 0 1-.777-.776C14 20.31 14 19.54 14 18M2 6c0-1.54 0-2.31.347-2.876c.194-.317.46-.583.777-.777C3.689 2 4.46 2 6 2s2.31 0 2.876.347c.317.194.583.46.777.777C10 3.689 10 4.46 10 6s0 2.31-.347 2.876c-.194.317-.46.583-.777.777C8.311 10 7.54 10 6 10s-2.31 0-2.876-.347a2.35 2.35 0 0 1-.777-.777C2 8.311 2 7.54 2 6m12 0c0-1.54 0-2.31.347-2.876c.194-.317.46-.583.777-.777C15.689 2 16.46 2 18 2s2.31 0 2.877.347c.316.194.582.46.776.777C22 3.689 22 4.46 22 6s0 2.31-.347 2.876c-.194.317-.46.583-.776.777C20.31 10 19.54 10 18 10s-2.31 0-2.876-.347a2.35 2.35 0 0 1-.777-.777C14 8.311 14 7.54 14 6"
            ></Path>
        </Svg>
    );
};

export const FavouriteIcon = ({
                                  // width = normalize(34),
                                  // height = normalize(34),
                                  width = 24,
                                  height = 24,
                                  isActive = false,
                                  ...props
                              }: IconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" {...props}>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#8B78FF" stopOpacity="1"/>
                <Stop offset="1" stopColor="#5451D6" stopOpacity="1"/>
            </LinearGradient>
            <Path
                fill={isActive ? "url(#grad)" : "none"}
                stroke={isActive ? "url(#grad)" : "currentColor"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19.463 3.994c-2.682-1.645-5.023-.982-6.429.074c-.576.433-.864.65-1.034.65s-.458-.217-1.034-.65C9.56 3.012 7.219 2.349 4.537 3.994C1.018 6.153.222 13.274 8.34 19.284C9.886 20.427 10.659 21 12 21s2.114-.572 3.66-1.717c8.118-6.008 7.322-13.13 3.803-15.289"
            ></Path>
        </Svg>
    );
};

export const ProfileIcon = ({
                                // width = normalize(34),
                                // height = normalize(34),
                                width = 24,
                                height = 24,
                                isActive = false,
                                ...props
                            }: IconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" {...props}>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#8B78FF" stopOpacity="1"/>
                <Stop offset="1" stopColor="#5451D6" stopOpacity="1"/>
            </LinearGradient>
            <Path
                fill={isActive ? "url(#grad)" : "none"}
                stroke={isActive ? "url(#grad)" : "currentColor"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6.578 15.482c-1.415.842-5.125 2.562-2.865 4.715C4.816 21.248 6.045 22 7.59 22h8.818c1.546 0 2.775-.752 3.878-1.803c2.26-2.153-1.45-3.873-2.865-4.715a10.66 10.66 0 0 0-10.844 0M16.5 6.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0"
            ></Path>
        </Svg>
    );
};
