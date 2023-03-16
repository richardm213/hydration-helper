function getCurrentDate(daysBeforeToday) {
  const datetime = new Date();
  datetime.setDate(datetime.getDate() - daysBeforeToday);
  const year = datetime.getFullYear();
  const month = datetime.getMonth() + 1;
  const date = datetime.getDate();
  return `${month}-${date}-${year}`;
}

const weekday = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
function getDayOfWeek(daysBeforeToday) {
  const date = new Date();
  date.setDate(date.getDate() - daysBeforeToday);
  return weekday[date.getDay()];
}

function getDayOfMonth(daysBeforeToday) {
  const date = new Date();
  date.setDate(date.getDate() - daysBeforeToday);
  return date.getDate();
}

export {getCurrentDate, getDayOfWeek, getDayOfMonth};
