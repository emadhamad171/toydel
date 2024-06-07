import {normalize, windowWidth} from "@shared";
import {View} from "react-native";
import React from "react";

export const LineDecorator = ({width = (windowWidth-normalize(32)*3)/2-12}: {width?: number}) => <View style={{height: 1, backgroundColor: 'rgba(0,0,0,0.08)', width, alignSelf: 'center'}}/>
