import firebase from "react-native-firebase";

export function checkNotificationPermission() {
  firebase
    .messaging()
    .hasPermission()
    .then(enabled => {
      if (!enabled) {
        firebase.messaging().requestPermission();
      }
    });
}

export function createChannel(channelName) {
  const channel = new firebase.notifications.Android.Channel(
    channelName,
    channelName,
    firebase.notifications.Android.Importance.Max
  ).setDescription(channelName);
  firebase.notifications().android.createChannel(channel);
}

export const notifications = firebase.notifications();

export function displayNotification(notification) {
  let _notification = new firebase.notifications.Notification()
    .setNotificationId(notification.notificationId)
    .setTitle(notification.title)
    .setBody(notification.body)
    .setSound(notification.sound)
    .setData(notification.data)
    .android.setLargeIcon(notification.largeIcon)
    .android.setChannelId(notification.channelId)
    .android.setPriority(firebase.notifications.Android.Priority.Max);
  firebase.notifications().displayNotification(_notification);
}
