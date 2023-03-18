import * as Notifications from 'expo-notifications';

/* 
This intake notification is sent when the user
records some water intake. 
The notifications are sent at some set intervals of progress,
e.g. every 10 percent increase in intake towards goal
*/
async function intakeNotification(intake, recommendation) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `You have reached ${((intake * 100) / recommendation).toFixed(
        1,
      )}% of today's water goal!`,
      body: 'Keep up the good work; Every intake record counts.',
      data: {data: 'goes here'},
    },
    trigger: {seconds: 1},
  });
}

/*
In order to have the notifications 
congratulating the user for their intake
submission and progress be sent at interval moments
(e.g. every 10 percent increase towards goal),
calculate the previous and current percent intake

Calculate it as a multiple of intervalPercent and remove the remainder,
since the user will likely not have increased their intake 
by precisely e.g. 10 percent (e.g. 11.1 percent, etc.)
*/
const sendNotification = (intake, recommendation, waterAmount) => {
  const intervalPercent = 10;
  const prevTotal = Math.floor((intake * 100) / recommendation);
  const currTotal = Math.floor(((intake + waterAmount) * 100) / recommendation);
  return currTotal - prevTotal > intervalPercent;
};

/*
If the percent intake changes by at least ten percent,
send a notification congratulating the user
alongside their current percent intake
*/

export {intakeNotification, sendNotification};
