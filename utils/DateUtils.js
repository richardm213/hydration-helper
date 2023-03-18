const getCurrentDate = daysBefore => {
  const datetime = new Date();
  datetime.setDate(datetime.getDate() - daysBefore);
  const year = datetime.getFullYear();
  const month = datetime.getMonth() + 1;
  const date = datetime.getDate();
  return `${month}-${date}-${year}`;
};

const weekday = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const getDayOfWeek = daysBefore => {
  const date = new Date();
  date.setDate(date.getDate() - daysBefore);
  return weekday[date.getDay()];
};

const getDayOfMonth = daysBefore => {
  const date = new Date();
  date.setDate(date.getDate() - daysBefore);
  return date.getDate();
};

const getTimeCategory = time => {
  const hours = time.split(':')[0];
  if (hours <= 12) return 'morning';
  if (hours <= 18) return 'afternoon';
  return 'evening';
};

const getTime = () => {
  const date = new Date();
  const hour = `${date.getHours()}`;
  const minutes = `0${date.getMinutes()}`.slice(-2);
  return `${hour.toString()}:${minutes.toString()}`;
};

export {getCurrentDate, getDayOfWeek, getDayOfMonth, getTimeCategory, getTime};
