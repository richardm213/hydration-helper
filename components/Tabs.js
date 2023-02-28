import {Icon} from '@rneui/base';
import {useEffect, useRef, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialIcons} from '@expo/vector-icons';
import {StyleSheet} from 'react-native';
import RecommendationTab from './RecommendationTab';
import IntakeTab from './IntakeTab';
import ExerciseTab from './ExerciseTab';
import SettingsTab from './SettingsTab';

const styles = StyleSheet.create({
  navIcon: {height: 50, marginBottom: 5},
});
const Tab = createBottomTabNavigator();
const intakeIcon = ({color, size}) => (
  <MaterialIcons
    name="local-drink"
    type="ionicon"
    color={color}
    size={size * 1.5}
    style={styles.navIcon}
  />
);
const exerciseIcon = ({color, size}) => (
  <MaterialIcons
    name="run-circle"
    color={color}
    size={size * 1.5}
    style={styles.navIcon}
  />
);
const waterIcon = ({color, size}) => (
  <Icon
    name="water"
    type="ionicon"
    color={color}
    size={size * 1.5}
    style={styles.navIcon}
  />
);
const settingsIcon = ({color, size}) => (
  <MaterialIcons
    name="settings"
    color={color}
    size={size * 1.5}
    style={styles.navIcon}
  />
);

export default function Tabs() {
  const [recommendation, setRecommendation] = useState(120);
  const [intake, setIntake] = useState(0);
  const [exercise, setExercise] = useState(0);
  const [unit, setUnit] = useState('oz');

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (unit === 'oz') setRecommendation(val => val / 30);
    else setRecommendation(val => val * 30);
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
          headerTitle: `Progress: ${(intake * 100) / recommendation}%`,
        }}>
        {() => (
          <RecommendationTab recommendation={recommendation} unit={unit} />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Intake"
        options={{
          tabBarIcon: intakeIcon,
          headerTitle: `Current water intake: ${intake} oz`,
        }}>
        {() => <IntakeTab setIntake={setIntake} />}
      </Tab.Screen>
      <Tab.Screen
        name="Exercise"
        options={{
          tabBarIcon: exerciseIcon,
          headerTitle: `You exercised for ${exercise} minutes today!`,
        }}>
        {() => <ExerciseTab setExercise={setExercise} />}
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: settingsIcon,
          headerTitle: 'Settings',
        }}>
        {() => <SettingsTab unit={unit} setUnit={setUnit} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
