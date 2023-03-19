import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import WeatherAPI from '../services/WeatherAPI';

const w = new WeatherAPI();

export default function useStorageData(
  setIntake,
  setEntries,
  setExercise,
  setAge,
  setGender,
  setHeight,
  setWeight,
  setUnit,
  setTemperature,
) {
  const [dataFetched, setDataFetched] = useState(false);
  useEffect(() => {
    const fetchStorageValues = async () => {
      const i = [];
      i.push(
        AsyncStorage.getItem('@intake').then(val => {
          if (val) setIntake(parseInt(val, 10));
        }),
      );
      i.push(
        AsyncStorage.getItem('@entries').then(val => {
          if (val) setEntries(JSON.parse(val));
        }),
      );
      i.push(
        AsyncStorage.getItem('@exercise').then(val => {
          if (val) setExercise(parseInt(val, 10));
        }),
      );
      i.push(
        AsyncStorage.getItem('@age').then(val => {
          if (val) setAge(val);
        }),
      );
      i.push(
        AsyncStorage.getItem('@gender').then(val => {
          if (val) setGender(val);
        }),
      );
      i.push(
        AsyncStorage.getItem('@height').then(val => {
          if (val) setHeight(val);
        }),
      );
      i.push(
        AsyncStorage.getItem('@weight').then(val => {
          if (val) setWeight(val);
        }),
      );
      i.push(
        AsyncStorage.getItem('@unit').then(val => {
          if (val) setUnit(val);
        }),
      );
      await Promise.all(i);
      setDataFetched(true);
    };
    const fetchTemperature = async () => {
      await w.getTemperature(setTemperature);
      // setTemperature(Math.random() * (110 - 40) + 40);
    };
    fetchStorageValues();
    fetchTemperature();
  }, []);
  return dataFetched;
}
