import {useEffect, useRef, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RecommendationTab from './RecommendationTab';
import IntakeTab from './IntakeTab';
import ExerciseTab from './ExerciseTab';
import SettingsTab from './SettingsTab';
import {intakeIcon, exerciseIcon, waterIcon, settingsIcon} from './TabIcons';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const [recommendation, setRecommendation] = useState(120);
  const [intake, setIntake] = useState(0);
  const [exercise, setExercise] = useState(0);
  const [unit, setUnit] = useState('us-system');
  const [weight, setWeight] = useState('160');

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (unit === 'us-system') {
      setRecommendation(val => val / 30);
      setIntake(val => val / 30);
      setWeight(val => {
        const num = parseInt(val, 10) / 0.453592;
        return Math.round(num).toString();
      });
    } else {
      setRecommendation(val => val * 30);
      setIntake(val => val * 30);
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
        {() => <IntakeTab setIntake={setIntake} unit={unit} />}
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
            weight={weight}
            setWeight={setWeight}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
