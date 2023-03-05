import * as Calendar from 'expo-calendar';

// Returns an array of objects with start and end times (Date) for all events in the next 24 hours found in the user's calendar
export default async function GetEventTimes() {
  const calendars = await Calendar.getCalendarsAsync(
    Calendar.EntityTypes.EVENT,
  );
  const calendarIDs = calendars.map(calendar => calendar.id);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const events = await Calendar.getEventsAsync(
    calendarIDs,
    new Date(),
    tomorrow,
  );
  const eventTimes = events.map(event => ({
    startDate: event.startDate,
    endDate: event.endDate,
  }));

  return eventTimes;
}
