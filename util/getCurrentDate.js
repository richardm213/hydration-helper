function getCurrentDate(daysBeforeToday) {
  const datetime = new Date();
  datetime.setDate(datetime.getDate() - daysBeforeToday);
  const year = datetime.getFullYear();
  const month = datetime.getMonth() + 1;
  const date = datetime.getDate();
  return `${month}-${date}-${year}`;
}

export default getCurrentDate;
