import React from 'react';
import {View, Text, StyleSheet, Image} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {notificationPropsType} from "../helpers/types";

function NotificationComponent({id, title, description,photoURL, isIndividual, isRevised, iconName, iconProps, ...props}:notificationPropsType) {
    return (<>
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
    </>);
}

const notify = StyleSheet.create({
   container: {
        flexDirection: 'row',
        backgroundColor: '#f3f3f3',
        flexGrow: 1,
        paddingHorizontal: 16,
        marginHorizontal: 8,
        marginBottom: 10,
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
