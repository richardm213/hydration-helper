import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import COLORS from '../theme/Colors';
import {getCurrentDate, getDayOfMonth, getDayOfWeek} from '../utils/DateUtils';

const BARCHART = {
  spacing: 2,
};

export default function useGraphData(
  recommendation,
  intake,
  setWeeklyMax,
  setDataBarsWeek,
  setAccordianData,
  setMonthlyMax,
  setDataBarsMonth,
  newDay,
) {
  useEffect(() => {
    const fetchData = async () => {
      // fetch data for week chart
      const newDataBarsWeek = [];
      const newAccordianData = [];
      let days = [];
      for (let i = 1; i <= 7; i += 1) {
        days.push(AsyncStorage.getItem(`@${getCurrentDate(7 - i)}`));
      }
      days = await Promise.all(days);
      let maxVal = -1;
      for (let i = 0; i < 6; i += 1) {
        const day = days[i];
        if (day) {
          const dailyEntry = JSON.parse(day);
          maxVal = Math.max(maxVal, dailyEntry.recommendation);
          maxVal = Math.max(maxVal, dailyEntry.intake);
          const recommendationBar = {
            label: getDayOfWeek(6 - i),
            value: dailyEntry.recommendation,
            spacing: BARCHART.spacing,
            frontColor: COLORS.primary,
          };
          const intakeBar = {
            value: dailyEntry.intake,
            frontColor: COLORS.lighterBlue,
          };
          newDataBarsWeek.push(recommendationBar, intakeBar);
          const accordianEntry = {
            date: getCurrentDate(6 - i),
            goal: dailyEntry.recommendation,
            intake: dailyEntry.intake,
            exercise: dailyEntry.exercise,
            calories: dailyEntry.calories,
            protein: dailyEntry.protein,
          };
          newAccordianData.push(accordianEntry);
        }
      }
      const todayRecommendationBar = {
        label: getDayOfWeek(0),
        value: recommendation,
        spacing: BARCHART.spacing,
        frontColor: COLORS.primary,
      };
      const todayIntakeBar = {
        value: intake,
        frontColor: COLORS.lighterBlue,
      };
      setWeeklyMax(maxVal);
      newDataBarsWeek.push(todayRecommendationBar, todayIntakeBar);
      setDataBarsWeek(newDataBarsWeek);
      setAccordianData(newAccordianData);

      // fetch data for month chart
      let maxVal2 = -1;
      const newDataBarsMonth = [];
      let daysMonth = [];
      for (let i = 1; i <= 30; i += 1) {
        daysMonth.push(AsyncStorage.getItem(`@${getCurrentDate(30 - i)}`));
      }
      daysMonth = await Promise.all(daysMonth);
      for (let i = 0; i < 30; i += 1) {
        const day = daysMonth[i];
        if (day) {
          const dailyEntry = JSON.parse(day);
          maxVal2 = Math.max(maxVal, dailyEntry.recommendation);
          maxVal2 = Math.max(maxVal, dailyEntry.intake);
          const recommendationBar = {
            label: getDayOfMonth(29 - i),
            value: dailyEntry.recommendation,
            spacing: BARCHART.spacing,
            frontColor: COLORS.primary,
          };
          const intakeBar = {
            value: dailyEntry.intake,
            frontColor: COLORS.lighterBlue,
          };
          newDataBarsMonth.push(recommendationBar, intakeBar);
        }
      }
      setMonthlyMax(maxVal2);
      const todayRecommendationBar2 = {
        label: getDayOfMonth(0),
        value: recommendation,
        spacing: BARCHART.spacing,
        frontColor: COLORS.primary,
      };
      newDataBarsMonth.push(todayRecommendationBar2, todayIntakeBar);
      setDataBarsMonth(newDataBarsMonth);
    };
    fetchData();
  }, [intake, newDay]);
}
