# ToyBox

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `yarn install` to install dependencies.

## Usage

### Running the Project

To run the project on Android:
```bash
expo run:android
```

To run the project on iOS:
```bash
expo run:ios
```

### Push Notifications

To send push notifications to the current user, you can use the following command:

```javascript
axios.post(
  `https://app.nativenotify.com/api/indie/notification`,
  {
    subID: 'user id',
    appId: appIdEnv,
    appToken: appTokenEnv,
    title: 'Title of notification',
    message: 'Notification message',
    pushData: `{"photoURL":"url of photo"}`,
  }
);
```
To send push notifications to all members, you can use the next command:
```javascript
 axios.post(
  `https://app.nativenotify.com/api/indie/notification`,
{
      appId: appIdEnv,
      appToken: 'AppToken',
      title: "Push title here as a string",
      body: "Push message here as a string",
      dateSent: "2-11-2024 11:25PM", //optional
      pushData: `{"photoURL":"url of photo"}`,
      bigPictureURL: 'url of photo'
  }
);
```

Make sure to replace `'user id'`, `'Title of notification'`, `'Notification message'`, and `'url of photo'` with appropriate values. Also, ensure that `appIdEnv` and `appTokenEnv` are correctly set in your `.env` file or manualy set it in command.

## Configuration

For correct project functioning, ensure you have the following files and configurations:

1. `.env` file with the required environment variables.
2. `google-services.json` for Android configuration.
3. `GoogleService-Info.plist` for iOS configuration.
