import AsyncStorage from '@react-native-async-storage/async-storage';

async function SimpleCalculator() {
  // exercise is in minutes
  const exercise = parseInt(await AsyncStorage.getItem('@exercise'), 10);
  // weight is in lbs or kgs
  const weight = parseInt(await AsyncStorage.getItem('@weight'), 10);
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

function SimpleCalculator2(unit, age, gender, height, weight, exercise) {
  let res = 0;
  if (unit === 'metric') {
    res = ((weight / 0.453592) * 0.5 + (exercise / 30) * 12) * 30;
  } else {
    res = weight * 0.5 + (exercise / 30) * 12;
  }
  if (gender === 'male') res *= 1.05;
  if (age > 65) res *= 0.9;
  if (age <= 12) res *= 1.05;
  return res;
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
  const avgCalorieIntake = 1275;
  const calorieIntake = parseInt(
    await AsyncStorage.getItem('@calorie_intake'),
    10,
  );
  // When sodium intake during the day gets greater than 2,300mg, then add 1 cup = 8 oz = 237 ml
  const sodiumIntake = parseInt(
    await AsyncStorage.getItem('@sodium_intake'),
    10,
  );
  const startOfDay = parseInt(await AsyncStorage.getItem('@start_of_day'), 10);

  let result = SimpleCalculator();

  // check whether start_of_day flag is set to true
  // if so, update according to calorie fluctuations
  if (startOfDay === 1) {
    if (calorieIntake > avgCalorieIntake) {
      result *= 1.1;
    } else if (calorieIntake < avgCalorieIntake) {
      result *= 0.9;
    }
    // reset flag to false
    await AsyncStorage.setItem('@start_of_day', '0');
  }

  if (sodiumIntake > 2300) {
    result += intakeMeasurementType === 'oz' ? 8 : 237;
  }
  if (temperature > 75) {
    result +=
      ((temperature - 75) / 10) * intakeMeasurementType === 'oz' ? 8 : 237;
  }
  return result;
}

export {SimpleCalculator, SimpleCalculator2, APICalculator};
