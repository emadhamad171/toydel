import React from 'react';
import {View, Text, StyleSheet, Image} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {notificationPropsType} from "../helpers/types";
import { Skeleton } from 'moti/skeleton';

function NotificationComponent({id, isRefreshing, title, description,photoURL, isIndividual, isRevised, iconName, iconProps, ...props}:notificationPropsType) {
    return (<View style={{ marginBottom: 10 }}>
        <Skeleton show={isRefreshing} backgroundColor={"#d4d4d4"} colorMode={'light'} transition={{type: 'timing', duration: 500, delay: 100}} radius={25}>
        <View style={{...notify.container, borderColor: isRevised ? '#b7b7b7' : '#d333ff'}}>
            <Icon name={iconName} style={notify.icon} color={isRevised ? '#b7b7b7' : '#d333ff'} size={44} {...iconProps}/>
            <View style={notify.textContainer}>
                <Text style={notify.header}>
                    {title}
                </Text>
                <Text style={notify.descriptions}>
                    {description}
                </Text>
            </View>
            <Image source={{uri: photoURL}} style={{width:64, height: 64, borderRadius:20, marginLeft: 'auto'}} />

        </View>
    </Skeleton>
    </View>);
}

const notify = StyleSheet.create({
   container: {
        flexDirection: 'row',
        backgroundColor: '#f3f3f3',
        flexGrow: 1,
        paddingHorizontal: 16,
        marginHorizontal: 8,
        paddingVertical: 16,
        borderWidth: 1,
        borderRadius: 25
   },
   textContainer: {
     marginLeft: 14
   },
   header: {
       fontSize: 24,
   },
   descriptions: {
       fontSize: 18,
   },
   icon: {
       padding:0,
       margin:0,
       alignSelf: 'center'
   }
});

export default NotificationComponent;
