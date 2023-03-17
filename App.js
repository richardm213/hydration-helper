import {NavigationContainer} from '@react-navigation/native';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Calendar from 'expo-calendar';
import * as Notifications from 'expo-notifications';
import Tabs from './pages/Tabs';
import NotificationSystem from './components/NotificationSystem';
import {getCurrentDate} from './utils/DateUtils';
import GetEventTimes from './services/CalendarAPI';

const BACKGROUND_FETCH_TASK = 'background-fetch';
let currentDate = getCurrentDate(0);

async function calendarNotification(time) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Don't forget to hydrate!`,
      body: 'Remember to record your intake in the app',
      data: {data: 'goes here'},
    },
    trigger: {minutes: time},
  });
}

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const checkDate = getCurrentDate(0);
  console.log(`Got background fetch call at date: ${checkDate}`);
  if (checkDate !== currentDate) {
    currentDate = checkDate;
    const {status} = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      const starts = [];
      const ends = [];
      const times = await GetEventTimes();
      console.log(times);
      for (let i = 0; i < length(times); i += 1) {
        starts[i] =
          times[i].startDate.getHours() * 60 + times[i].startDate.getMinutes();
        ends[i] =
          times[i].endDate.getHours() * 60 + times[i].endDate.getMinutes();
      }
      const interval = 2; // TODO: change to 1 if did not reach goal yesterday
      let minutes = 0;
      while (minutes < 24 * 60) {
        let isBusy = false;
        for (let j = 0; j < length(starts); j += 1) {
          if (starts[j] < minutes < ends[j]) {
            isBusy = true;
            break;
          }
        }
        if (isBusy === false) {
          // send notification at nonbusy time
          // eslint-disable-next-line no-await-in-loop
          await calendarNotification(minutes);
          minutes += interval * 60;
        } else {
          // check availability a bit earlier than interval
          // to find better availability
          minutes += (interval / 2) * 60;
        }
      }
    }
  }

  return BackgroundFetch.BackgroundFetchResult.NewData;
});

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 15,
    stopOnTerminate: false,
    startOnBoot: true,
  });
}

export default function App() {
  registerBackgroundFetchAsync();
  return (
    <NavigationContainer>
      <Tabs />
      <NotificationSystem />
    </NavigationContainer>
  );
}
