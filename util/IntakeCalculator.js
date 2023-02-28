import AsyncStorage from '@react-native-async-storage/async-storage';

async function SimpleCalculator() {
  // exercise is in minutes
  const exercise = await AsyncStorage.getItem('@exercise');
  // weight is in lbs or kgs
  const weight = await AsyncStorage.getItem('@weight');
  const weightMeasurementType = await AsyncStorage.getItem(
    '@weight_measurement_type',
  );
  const convertedWeight =
    weightMeasurementType === 'lbs' ? weight : weight * 0.453592;

  // intake is in either oz or ml
  const intakeMeasurementType = await AsyncStorage.getItem(
    '@intake_measurement_type',
  );
  // get result in oz
  const result = convertedWeight * 0.5 + (exercise / 30) * 12;
  // convert to ml if necessary
  return intakeMeasurementType === 'oz' ? result : result * 29.5735;
}
async function APICalculator() {
  // retrieve intake and weight measurement types
  const intakeMeasurementType = await AsyncStorage.getItem(
    '@intake_measurement_type',
  );
  // for every 10 degrees that the temperature is above room temperature,
  // add 1 cup = 8 oz = 237 ml
  const temperature = 75;
  // Take average calorie intake over last week (shortened to 3 days for experiement),
  // if previous day's intake is more than one third smaller or greater, decrease or increase
  // recommended water intake for next day by ten percent
  const avg_calorie_intake = 1275;

  return 0;
}

function IntakeCalculator(type) {
  switch (type) {
    case 'simple':
      return SimpleCalculator();
    case 'api':
      return APICalculator();
    default:
      return -1;
  }
}

export default IntakeCalculator;
