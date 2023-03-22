import AsyncStorage from '@react-native-async-storage/async-storage';
import {lowerCase} from 'lodash';
import {useEffect, useState} from 'react';
import {DRINKS} from '../services/FoodDataAPI';

export default function useTodaysDrinks(recommendation) {
  const [todaysDrinks, setTodaysDrinks] = useState([]);
  useEffect(() => {
    const getDetailedRecommendation = async () => {
      const drinkScores = JSON.parse(
        await AsyncStorage.getItem('@drinkScores'),
      );
      const performanceScore = parseInt(
        await AsyncStorage.getItem('@performanceScore'),
        10,
      );
      const tempCardData = [];
      const drinkTypes = new Set(['water']);
      ['morning', 'afternoon', 'evening'].forEach(time => {
        const drinkType = Object.entries(drinkScores)
          .filter(entry => entry[0].includes(time))
          .sort((a, b) => b[1] - a[1])[0][0]
          .split('-')[0];
        drinkTypes.add(drinkType);
        const drink1 = {
          drinkType: lowerCase(drinkType),
          drinkAmount: Math.ceil(recommendation / 6),
          drinkTime: time,
        };
        const drink2 = {
          drinkType: 'water',
          drinkAmount: Math.ceil(recommendation / 6),
          drinkTime: time,
        };
        tempCardData.push(drink1);
        tempCardData.push(drink2);
      });
      if (performanceScore < 70) {
        const drinksList = Object.keys(DRINKS).filter(d => !drinkTypes.has(d));
        const newDrink = `${lowerCase(
          drinksList[Math.floor(Math.random() * drinksList.length)],
        )} * new *`;
        tempCardData[1].drinkType = newDrink;
      }
      setTodaysDrinks(tempCardData);
    };
    getDetailedRecommendation();
  }, [recommendation]);
  return todaysDrinks;
}
