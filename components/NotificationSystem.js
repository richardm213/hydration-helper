import * as Notifications from 'expo-notifications';
import {useState, useEffect, useRef} from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function MyNotification() {
  const [notification, setNotification] = useState(false);
  const listenResponse = useRef();
  const listenNotif = useRef();

  useEffect(() => {
    listenNotif.current = Notifications.addNotificationReceivedListener(val => {
      setNotification(val);
    });

    listenResponse.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(listenNotif.current);
      Notifications.removeNotificationSubscription(listenResponse.current);
    };
  });
}
