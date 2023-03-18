import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import APICalculator from '../utils/APICalculator';
import SimpleCalculator from '../utils/SimpleCalculator';

export default function useRecommendation(
  dataFetched,
  temperature,
  unit,
  age,
  gender,
  height,
  weight,
  exercise,
  calories,
  protein,
  setRecommendation,
) {
  useEffect(() => {
    const updateRecommendation = async () => {
      if (!dataFetched) return;
      let calculator = null;
      if (temperature !== 0) {
        calculator = new APICalculator(
          unit,
          age,
          gender,
          height,
          weight,
          exercise,
          {temperature},
          calories,
          protein,
        );
      } else {
        calculator = new SimpleCalculator(
          unit,
          age,
          gender,
          height,
          weight,
          exercise,
        );
      }
      const newRecommendation = calculator.calculate();
      setRecommendation(newRecommendation);
      await AsyncStorage.setItem(
        '@recommendation',
        newRecommendation.toFixed(1).toString(),
      );
    };
    updateRecommendation();
  }, [dataFetched, age, gender, height, weight, exercise, calories, protein]);
}
