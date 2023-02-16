import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Icon, Input } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import ExerciseTab from './components/ExerciseTab';

function SettingsTab() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function IntakeTab() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Intake!</Text>
    </View>
  );
}

function RecommendationTab() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Recommendation!</Text>
    </View>
  );
}

function TrendsTab() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Trends!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName='Water Intake'
      screenOptions={{
        tabBarActiveBackgroundColor: '#0C8292',
        tabBarInactiveBackgroundColor: '#81C6D0',
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        headerStyle: {
          height: 130,
          backgroundColor: '#DEFBFF'
        },
        headerTitleStyle: {
          color: '#0C8292',
          fontSize: 18
        }
      }}>
      <Tab.Screen name="Trends" component={TrendsTab} />
      <Tab.Screen name="Recommendation" component={RecommendationTab} />
      <Tab.Screen name="Water Intake" component={IntakeTab} />
      <Tab.Screen name="Exercise" component={ExerciseTab} options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name='run-circle'
            color={color}
            size={size} />),
        tabBarButton: (props) => <TouchableOpacity {...props}></TouchableOpacity>
      }} />
      <Tab.Screen name="Settings" component={SettingsTab} />
    </Tab.Navigator >
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
