export function registerNNPushToken(appId: any, appToken: any): void;
export function registerIndieID(subID: any, appId: any, appToken: any): Promise<void>;
export function unregisterIndieDevice(subID: any, appId: any, appToken: any): Promise<void>;
export async function getIndieNotificationInbox(subId: any, appId: any, appToken: any): Promise<any>;
export function getNotificationInbox(appId: any, appToken: any): Promise<any>;
export function deleteIndieNotificationInbox(subId: any, notificationId: any, appId: any, appToken: any): Promise<any>;

// To post individual notification from back:
//
//axios.post(`https://app.nativenotify.com/api/indie/notification`, {
//       subID: 'put your unique app user ID here as a string',
//       appId: 19000,
//       appToken: 'l5ddGPLeP7FdsO5c8gy4Dl',
//       title: 'put your push notification title here as a string',
//       message: 'put your push notification message here as a string'
//  });
