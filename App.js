import {NavigationContainer} from '@react-navigation/native';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Calendar from 'expo-calendar';
import * as Notifications from 'expo-notifications';
import Tabs from './components/Tabs';
import NotificationSystem from './components/NotificationSystem';
import getCurrentDate from './util/getCurrentDate';
import GetEventTimes from './services/CalendarAPI';

const BACKGROUND_FETCH_TASK = 'background-fetch';
let currentDate = getCurrentDate(0);

/* TODO: Implement new day tasks
1. Find unbusy times based on today's calendar events
2. Choose drink to recommend today
3. Update current date 
4. Add API calls
5. Update sodium and calorie intakes in AsyncStorage, from React Native Health API
6. Generate new intake recommendation */

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
