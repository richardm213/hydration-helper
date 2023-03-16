import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import APICalculator from '../util/APICalculator';
import SimpleCalculator from '../util/SimpleCalculator';

export default function useRecommendation(
  dataFetched,
  temperature,
  unit,
  age,
  gender,
  height,
  weight,
  exercise,
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
          null,
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
  }, [dataFetched, age, gender, height, weight, exercise]);
}
