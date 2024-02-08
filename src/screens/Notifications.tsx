import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, RefreshControl } from "react-native";
import NotificationComponent from "../components/NotificationComponent";
import {SwipeListView} from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {getIndieNotificationInbox,deleteIndieNotificationInbox} from "../notifications";
import {notificationType} from "../helpers/types";
import {normalize, notificationStackSample} from "../helpers";
import {SafeAreaView} from "moti";

const getFormatedNotifications = (el:any) : notificationType => {
    const pushData = JSON.parse(el.pushData);
    return {
        id: el.notification_id,
        title: el.title,
        description: el.message,
        photoURL: pushData?.photoURL ? pushData.photoURL : 'https://firebasestorage.googleapis.com/v0/b/testotp-fabeb.appspot.com/o/noPhotoMini.png?alt=media&token=c137400e-6b63-493e-83ac-d9fab4873ef4',
        isIndividual: true,
        iconName: pushData?.iconName || 'bell',
        iconProps: pushData?.iconProps,
        props: pushData?.props
    }
};

const RenderHiddenItem= ({item, setData,uid}) => (
    <View style={notifications.hiddenItemContainer}>
        <TouchableOpacity onPress={()=>{
            deleteIndieNotificationInbox(uid, item.id, 19000, 'l5ddGPLeP7FdsO5c8gy4Dl').then(
                data => {
                    setData(data.map(getFormatedNotifications));
                }
            );
        }}>
            <Text style={notifications.hiddenItemText}><Icon name={'trash-can-outline'} style={{margin:0, padding: 0}} size={32} color={'#f66'}/></Text>
        </TouchableOpacity>
    </View>
);

const loadNotifications = ({setData, uid,setRefreshing}) => {
    getIndieNotificationInbox(uid,19000,'l5ddGPLeP7FdsO5c8gy4Dl')
        .then(data=>{setData(()=>data.map(getFormatedNotifications))})
        .finally(()=>setRefreshing(false));
}
function Notifications({user}) {
    const [data, setData] = useState<notificationType[]>(notificationStackSample);
    const [isRefreshing, setRefreshing] = useState<boolean>(true);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadNotifications({setData, uid: user.id,setRefreshing});
    }, []);
    useEffect(() => {
        loadNotifications({setData, uid: user.id,setRefreshing});
    }, []);

    return (
        <View style={notifications.container}>
            <SafeAreaView style={notifications.container}>
            <Text style={notifications.header}>Notifications</Text>
            <SwipeListView
                style={{paddingVertical: normalize(12), maxHeight: '92%'}}
                data={data}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                }
                renderHiddenItem={({item}) => <RenderHiddenItem item={item} setData={setData} uid={user.id} />}
                rightOpenValue={-70}
                renderItem={
                ({item, index})=>
                    <NotificationComponent
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        photoURL={item.photoURL}
                        iconName={item.iconName}
                        isIndividual={item.isIndividual}
                        isRevised={index}
                        isRefreshing={isRefreshing}
                        {...(item?.iconProps && {iconProps: item.iconProps})}
                        {...item.props}
                    />
                    }
            />
            </SafeAreaView>
        </View>
    );
}

const notifications = StyleSheet.create({
   container: {
       marginTop: normalize(10),
       paddingVertical: 10,
       backgroundColor: '#f3f3f3',
   },
   header: {
       paddingHorizontal: 18,
       fontSize: 32,
       fontWeight: "400",
       paddingBottom: 12,
   },
    hiddenItemContainer: {
        margin: 28,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    hiddenItemButton: {
        marginRight: 10,
        backgroundColor: '#191919',
        borderRadius: 4,
        padding: 10,
    },
    hiddenItemText: {
        color: '#FFFFFF',
    }
});
export default Notifications;
