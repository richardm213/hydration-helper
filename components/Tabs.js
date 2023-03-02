import {useEffect, useRef, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecommendationTab from './RecommendationTab';
import IntakeTab from './IntakeTab';
import ExerciseTab from './ExerciseTab';
import SettingsTab from './SettingsTab';
import {intakeIcon, exerciseIcon, waterIcon, settingsIcon} from './TabIcons';
import SimpleCalculator from '../util/SimpleCalculator';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const [recommendation, setRecommendation] = useState(120);
  const [intake, setIntake] = useState(0);
  const [exercise, setExercise] = useState(0);
  const [age, setAge] = useState('21');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('72');
  const [weight, setWeight] = useState('160');
  const [unit, setUnit] = useState('us-system');

  useEffect(() => {
    const fetchStorageValues = () => {
      AsyncStorage.getItem('@intake').then(val => {
        if (val) setIntake(parseInt(val, 10));
      });
      AsyncStorage.getItem('@exercise').then(val => {
        if (val) setExercise(parseInt(val, 10));
      });
      AsyncStorage.getItem('@age').then(val => {
        if (val) setAge(val);
      });
      AsyncStorage.getItem('@gender').then(val => {
        if (val) setGender(val);
      });
      AsyncStorage.getItem('@height').then(val => {
        if (val) setHeight(val);
      });
      AsyncStorage.getItem('@weight').then(val => {
        if (val) setWeight(val);
      });
      AsyncStorage.getItem('@unit').then(val => {
        if (val) setUnit(val);
      });
    };
    fetchStorageValues();
  }, []);

  useEffect(() => {
    const calculator = new SimpleCalculator(
      unit,
      age,
      gender,
      height,
      weight,
      exercise,
    );
    setRecommendation(calculator.calculate());
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
          backgroundColor: '#DEFBFF',
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
        tabBarActiveTintColor: '#0C8292',
        tabBarInactiveTintColor: '#81C6D0',

        headerStyle: {
          height: 110,
          backgroundColor: '#DEFBFF',
        },
        headerTitleStyle: {
          flex: 1,
          color: '#0C8292',
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
          <RecommendationTab recommendation={recommendation} unit={unit} />
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
        {() => <IntakeTab intake={intake} setIntake={setIntake} unit={unit} />}
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
        name="Settings"
        options={{
          tabBarIcon: settingsIcon,
          headerTitle: 'Settings',
        }}>
        {() => (
          <SettingsTab
            unit={unit}
            setUnit={setUnit}
            age={age}
            setAge={setAge}
            gender={gender}
            setGender={setGender}
            height={height}
            setHeight={setHeight}
            weight={weight}
            setWeight={setWeight}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
