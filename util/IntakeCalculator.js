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

  return 0;
}
async function APICalculator() {
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
