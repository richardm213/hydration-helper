import {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
} from '../components/TabIcons';
import COLORS from '../theme/Colors';
import HealthAPI from '../services/HealthKitAPI';
import useStorageData from '../hooks/useStorageData';
import useUnitChange from '../hooks/useUnitChange';
import useRecommendation from '../hooks/useRecommendation';
import useNewDay from '../hooks/useNewDay';

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: COLORS.iceBlue,
    height: 110,
  },
  headerTitleStyle: {
    color: COLORS.primarySelected,
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  tabBarItemStyle: {
    height: 50,
    marginTop: 20,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabBarStyle: {
    backgroundColor: COLORS.iceBlue,
    height: 100,
    position: 'absolute',
  },
});

function WeatherDisplay({temperature}) {
  return (
    <Text style={styles.headerTitleStyle}>
      &#9729; Weather: {temperature.toFixed(1)}&#8457; &#9729;
    </Text>
  );
}

const Tab = createBottomTabNavigator();
const healthAPI = new HealthAPI();

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
  const [calories, setCalories] = useState(null);
  const [protein, setProtein] = useState(null);
  const dataFetched = useStorageData(
    setIntake,
    setExercise,
    setAge,
    setGender,
    setHeight,
    setWeight,
    setUnit,
    setTemperature,
  );
  const newDay = useNewDay(
    intake,
    recommendation,
    dataFetched,
    setIntake,
    setExercise,
    exercise,
  );
  useUnitChange(
    unit,
    recommendation,
    setRecommendation,
    setIntake,
    setHeight,
    setWeight,
  );
  useRecommendation(
    dataFetched,
    temperature,
    unit,
    age,
    gender,
    height,
    weight,
    exercise,
    protein,
    setRecommendation,
  );
  return (
    <Tab.Navigator
      initialRouteName="Water Intake"
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: COLORS.primarySelected,
        tabBarInactiveTintColor: COLORS.primaryFaded,
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: waterIcon,
          // eslint-disable-next-line react/no-unstable-nested-components
          headerTitle: () => <WeatherDisplay temperature={temperature} />,
        }}>
        {() => (
          <HomeTab
            recommendation={recommendation}
            unit={unit}
            temperature={temperature}
            intake={intake}
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
            healthAPI={healthAPI}
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
            setCalories={setCalories}
            setProtein={setProtein}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
