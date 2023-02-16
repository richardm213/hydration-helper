import * as React from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Icon, Input, Overlay } from 'react-native-elements';
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
        tabBarStyle: {
          position: 'absolute',
          bottom: 30,
          left: 20,
          right: 20,
          backgroundColor: '#DEFBFF',
          borderRadius: 20,
          height: 90,
        },
        tabBarItemStyle: {
          borderRadius: 20,
          margin: 2,
          top: 15,
          left: 5,
          right: 15,

        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#0C8292',
        tabBarInactiveTintColor: '#81C6D0',


        headerStyle: {
          height: 130,
          backgroundColor: '#DEFBFF'
        },
        headerTitleStyle: {
          flex: 1,
          color: '#0C8292',
          fontSize: 18,
          marginTop: 20,
        }
      }}>
      <Tab.Screen name="Trends" component={TrendsTab} />
      <Tab.Screen name="Reccomendation" component={RecommendationTab} />
      <Tab.Screen name="Intake" component={IntakeTab} />
      <Tab.Screen name="Exercise" component={ExerciseTab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='run-circle'
              color={color}
              size={size * 1.5} />),
          headerTitle: "You exercised for 57 minutes today!"
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
