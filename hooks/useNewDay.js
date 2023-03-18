import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import DailyEntry from '../utils/DailyEntry';
import {getCurrentDate, getTimeCategory} from '../utils/DateUtils';

export default function useNewDay(
  intake,
  entries,
  recommendation,
  dataFetched,
  setIntake,
  setExercise,
  exercise,
  calories,
  protein,
) {
  const [newDay, setNewDay] = useState(false);

  const updateDrinkScores = async () => {
    let drinkScores = await AsyncStorage.getItem('@drinkScores');
    if (drinkScores) drinkScores = JSON.parse(drinkScores);
    else drinkScores = {};
    const keyList = [];
    const entriesList = entries;
    for (let i = 0; i < entriesList.length; i += 1) {
      if (entriesList[i].drinkType === 'water') continue;
      const timeCategory = getTimeCategory(entriesList[i].drinkTime);
      const key = `${entriesList[i].drinkType}-${timeCategory}`;
      if (keyList.includes(key)) continue;
      if (!drinkScores.hasOwnProperty(key)) {
        drinkScores[key] = 50;
      } else if (drinkScores[key] < 100)
        drinkScores[key] = Math.min(drinkScores[key] + 10, 100);
      keyList.push(key);
    }
    Object.keys(drinkScores).forEach(key => {
      if (!keyList.includes(key)) drinkScores[key] -= 5;
    });
    await AsyncStorage.setItem('@drinkScores', JSON.stringify(drinkScores));
  };

  const updatePerformanceScore = async () => {
    let performanceScore = parseInt(
      await AsyncStorage.getItem('@performanceScore'),
      10,
    );
    if (intake > recommendation) performanceScore += 5;
    else performanceScore -= 5;
    await AsyncStorage.setItem(
      '@performanceScore',
      performanceScore.toString(),
    );
  };

  useEffect(() => {
    if (!dataFetched) return;
    const resetDay = newDate => {
      updateDrinkScores();
      updatePerformanceScore();
      AsyncStorage.setItem('@intake', '0');
      AsyncStorage.setItem('@entries', JSON.stringify([]));
      AsyncStorage.setItem('@exercise', '0');
      setIntake(0);
      setExercise(0);
      AsyncStorage.setItem('@current_day', newDate);
    };
    const checkCurrentDay = async () => {
      const d1 = await AsyncStorage.getItem('@current_day');
      const d2 = getCurrentDate(0);
      if (d1 !== d2) {
        const drinkEntries = await AsyncStorage.getItem('@entries');
        const dailyEntry = new DailyEntry(
          recommendation,
          intake,
          drinkEntries,
          exercise,
          calories.today,
          protein.today,
        );
        await AsyncStorage.setItem(`@${d1}`, JSON.stringify(dailyEntry));
        resetDay(d2);
        setNewDay(true);
      }
    };
    checkCurrentDay();
  }, [dataFetched]);
  return newDay;
}
