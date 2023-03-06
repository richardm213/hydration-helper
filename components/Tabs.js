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
    const fetchTemperature = async () => {
      // await w.getTemperature(setTemperature);
      setTemperature(Math.random() * (110 - 40) + 40);
    };

    fetchStorageValues();
    fetchTemperature();
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
        {() => <TrendsTab />}
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
