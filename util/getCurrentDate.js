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

const getTimeCategory = time => {
  const hours = time.split(':')[0];
  if (hours <= 12) return 'morning';
  if (hours <= 18) return 'afternoon';
  return 'evening';
};

export {getCurrentDate, getDayOfWeek, getDayOfMonth, getTimeCategory};
