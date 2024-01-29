import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import axios from 'axios';

Notifications.setNotificationHandler({handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: false, shouldSetBadge: false, })});

async function registerForPushNotificationsAsync() {
    let expoAndroidToken, fcmToken, expoIosToken, apnToken;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            sound: 'default',
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            try {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            } catch (error) {
                // console.log('An error occurred while requesting notification permissions:', error);
                return 'Failed to get push token';
            }
        }
        if (finalStatus !== 'granted') {
            return 'Failed to get push token';
        }

        if(Platform.OS === 'android') {
            expoAndroidToken = (await Notifications.getExpoPushTokenAsync({projectId:'6f9e05d9-24ad-44d0-9171-1f4a7f6e1ad8'})).data;
            fcmToken = (await Notifications.getDevicePushTokenAsync()).data;
        } else if(Platform.OS === 'ios') {
            expoIosToken = (await Notifications.getExpoPushTokenAsync({projectId:'6f9e05d9-24ad-44d0-9171-1f4a7f6e1ad8'})).data;
            apnToken = (await Notifications.getDevicePushTokenAsync()).data;
        }
    } else {
        console.log('Must use physical device for Push Notifications');
        return 'Must use physical device for Push Notifications';
    }

    return { expoAndroidToken, fcmToken, expoIosToken, apnToken };
}

export default function registerNNPushToken(appId, appToken) {
    const responseListener = useRef();

    useEffect(() => {
        if(Device.isDevice && Platform.OS !== 'web' || Platform.OS === 'android') {
            registerForPushNotificationsAsync()
                .then(res => {
                    if(res === 'Must use physical device for Push Notifications' || res === 'Failed to get push token')
                        return

                    const { expoAndroidToken, fcmToken, expoIosToken, apnToken } = res;

                    axios
                        .post(`https://app.nativenotify.com/api/device/tokens`, {
                            appId,
                            appToken,
                            platformOS: Platform.OS,
                            expoAndroidToken,
                            fcmToken,
                            expoIosToken,
                            apnToken
                        })
                        .then(() => console.log('You can now send a push notification. You successfully registered your Native Notify Push Token!'))
                        .catch(err => console.log(err));
                });

            return () => { Notifications.removeNotificationSubscription(responseListener); };
        }
    }, []);
}

export async function registerIndieID(subID, appId, appToken) {
    if(Device.isDevice && Platform.OS !== 'web' || Platform.OS === 'android') {
        let expoToken = (await Notifications.getExpoPushTokenAsync({projectId:'6f9e05d9-24ad-44d0-9171-1f4a7f6e1ad8'})).data;
        let deviceToken = (await Notifications.getDevicePushTokenAsync()).data;
        if(expoToken) {
            axios.post(`https://app.nativenotify.com/api/indie/id`, {
                subID,
                appId,
                appToken,
                platformOS: Platform.OS,
                expoToken,
                deviceToken
            })
                .then(() => console.log('You successfully registered your Indie ID.'))
                .catch(err => console.log(err));
        } else {
            console.log('Setup Error: Please, follow the "Start Here" instructions BEFORE trying to use this registerIndieID function.')
        }
    }
}
export async function unregisterIndieDevice(subID, appId, appToken) {
    if(Device.isDevice && Platform.OS !== 'web' || Platform.OS === 'android') {
        let expoToken = (await Notifications.getExpoPushTokenAsync({projectId:'6f9e05d9-24ad-44d0-9171-1f4a7f6e1ad8'})).data;
        let deviceToken = (await Notifications.getDevicePushTokenAsync()).data;
        if(expoToken) {
            axios.put(`https://app.nativenotify.com/api/unregister/indie/device`, {
                appId,
                appToken,
                subID,
                expoToken,
                deviceToken
            })
                .then(() => console.log('You successfully unregistered your device from this Indie Sub ID.'))
                .catch(err => console.log(err));
        } else {
            console.log('Setup Error: Please, follow the "Start Here" instructions BEFORE trying to use this unregisterIndieDevice function.')
        }
    }
}
export async function getIndieNotificationInbox(subId, appId, appToken) {
    let response = await axios.get(`https://app.nativenotify.com/api/indie/notification/inbox/${subId}/${appId}/${appToken}`);
    return response.data;
}
export async function getNotificationInbox(appId, appToken) {
    if(Device.isDevice && Platform.OS !== 'web' || Platform.OS === 'android') {
        let token = (await Notifications.getExpoPushTokenAsync({projectId:'6f9e05d9-24ad-44d0-9171-1f4a7f6e1ad8'})).data;
        if(token) {
            await axios.post(`https://app.nativenotify.com/api/notification/inbox/read`, {
                appId,
                appToken,
                expoToken: token
            })
        }
    }

    let response = await axios.get(`https://app.nativenotify.com/api/notification/inbox/${appId}/${appToken}`);

    return response.data;
}
export async function deleteIndieNotificationInbox(subId, notificationId, appId, appToken) {
    let response = await axios.delete(`https://app.nativenotify.com/api/indie/notification/inbox/notification/${appId}/${appToken}/${notificationId}/${subId}`);

    return response.data;
}
