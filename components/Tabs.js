import {useEffect, useRef, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeTab from './HomeTab';
import IntakeTab from './IntakeTab';
import ExerciseTab from './ExerciseTab';
import SettingsTab from './SettingsTab';
import TrendsTab from './TrendsTab';
import {
  intakeIcon,
  exerciseIcon,
  waterIcon,
  settingsIcon,
  trendsIcon,
} from './TabIcons';
import SimpleCalculator from '../util/SimpleCalculator';
// import WeatherAPI from '../services/WeatherAPI';
import COLORS from './Colors';
// import HealthAPI from '../services/healthKitAPI';
import DailyEntry from './DailyEntry';
import {getCurrentDate} from '../util/getCurrentDate';

const Tab = createBottomTabNavigator();
// const w = new WeatherAPI();
// const healthAPI = new HealthAPI();

export default function Tabs() {
  const [recommendation, setRecommendation] = useState(120);
  const [intake, setIntake] = useState(0);
  const [exercise, setExercise] = useState(0);
  const [age, setAge] = useState('21');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('72');
  const [weight, setWeight] = useState('160');
  const [unit, setUnit] = useState('us-system');
  const [temperature, setTemperature] = useState(0);
  const [dataFetched, setDataFetched] = useState(false);
  const [newDay, setNewDay] = useState(false);

  const getTimeCategory = time => {
    const hours = time.split(':')[0];
    if (hours <= 12) return 'morning';
    if (hours <= 18) return 'afternoon';
    return 'evening';
  };

  const updateDrinkScores = async () => {
    let drinkScores = await AsyncStorage.getItem('@drinkScores');
    if (drinkScores) drinkScores = JSON.parse(drinkScores);
    else drinkScores = {};
    const keyList = [];
    const entriesList = JSON.parse(await AsyncStorage.getItem('@entries'));
    if (!entriesList) return;
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

  useEffect(() => {
    if (!dataFetched) return;
    const resetDay = newDate => {
      updateDrinkScores();
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
        );
        await AsyncStorage.setItem(`@${d1}`, JSON.stringify(dailyEntry));
        resetDay(d2);
        setNewDay(true);
      }
    };
    checkCurrentDay();
  }, [dataFetched]);

  useEffect(() => {
    const fetchStorageValues = async () => {
      const i = [];
      i.push(
        AsyncStorage.getItem('@intake').then(val => {
          if (val) setIntake(parseInt(val, 10));
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
      // await w.getTemperature(setTemperature);
      setTemperature(Math.random() * (110 - 40) + 40);
    };

    fetchStorageValues();
    fetchTemperature();
  }, []);

  useEffect(() => {
    const updateRecommendation = async () => {
      const calculator = new SimpleCalculator(
        unit,
        age,
        gender,
        height,
        weight,
        exercise,
      );
      const newRecommendation = calculator.calculate();
      setRecommendation(newRecommendation);
      await AsyncStorage.setItem(
        '@recommendation',
        newRecommendation.toFixed(1).toString(),
      );
    };
    updateRecommendation();
  }, [age, gender, height, weight, exercise]);

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (unit === 'us-system' && recommendation > 300) {
      setRecommendation(val => val / 30);
      setIntake(val => val / 30);
      setHeight(val => {
        const num = parseInt(val, 10) / 2.54;
        return Math.round(num).toString();
      });
      setWeight(val => {
        const num = parseInt(val, 10) / 0.453592;
        return Math.round(num).toString();
      });
    } else if (unit === 'metric' && recommendation < 300) {
      setRecommendation(val => val * 30);
      setIntake(val => val * 30);
      setHeight(val => {
        const num = parseInt(val, 10) * 2.54;
        return Math.round(num).toString();
      });
      setWeight(val => {
        const num = parseInt(val, 10) * 0.453592;
        return Math.round(num).toString();
      });
    }
  }, [unit]);

  return (
    <Tab.Navigator
      initialRouteName="Water Intake"
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: COLORS.iceBlue,
          height: 100,
        },
        tabBarItemStyle: {
          height: 50,
          marginTop: 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: COLORS.primarySelected,
        tabBarInactiveTintColor: COLORS.primaryFaded,

        headerStyle: {
          height: 110,
          backgroundColor: COLORS.iceBlue,
        },
        headerTitleStyle: {
          flex: 1,
          color: COLORS.primarySelected,
          fontSize: 18,
          marginTop: 15,
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: waterIcon,
          headerTitle: `Progress: ${((intake * 100) / recommendation).toFixed(
            1,
          )}%`,
        }}>
        {() => (
          <HomeTab
            recommendation={recommendation}
            unit={unit}
            temperature={temperature}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Intake"
        options={{
          tabBarIcon: intakeIcon,
          headerTitle: `Current water intake: ${intake.toFixed(0)} ${
            unit === 'us-system' ? 'oz' : 'ml'
          }`,
        }}>
        {() => (
          <IntakeTab
            intake={intake}
            setIntake={setIntake}
            recommendation={recommendation}
            unit={unit}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Exercise"
        options={{
          tabBarIcon: exerciseIcon,
          headerTitle: `You exercised for ${exercise} minutes today!`,
        }}>
        {() => <ExerciseTab exercise={exercise} setExercise={setExercise} />}
      </Tab.Screen>
      <Tab.Screen
        name="Trends"
        options={{
          tabBarIcon: trendsIcon,
          headerTitle: `Remember: Progress isn't linear`,
        }}>
        {() => (
          <TrendsTab
            recommendation={recommendation}
            intake={intake}
            unit={unit}
            newDay={newDay}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: settingsIcon,
          headerTitle: 'Settings',
        }}>
        {() => (
          <SettingsTab
            // healthAPI={healthAPI}
            age={age}
            setAge={setAge}
            gender={gender}
            setGender={setGender}
            height={height}
            setHeight={setHeight}
            weight={weight}
            setWeight={setWeight}
            unit={unit}
            setUnit={setUnit}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
