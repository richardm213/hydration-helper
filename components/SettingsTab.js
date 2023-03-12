import React, {useState} from 'react';
import {Switch, StyleSheet, View, ScrollView, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import {Text} from '@rneui/base';
import * as Calendar from 'expo-calendar';
import {requestPermissionsAsync} from 'expo-notifications';
import COLORS from './Colors';
import GetEventTimes from '../services/CalendarAPI';
import AGES from './InputValues';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  label: {
    color: COLORS.primary,
  },
  picker1: {
    height: 150,
    marginTop: -60,
    width: 160,
  },
  picker2: {
    height: 150,
    marginTop: -60,
    width: 180,
  },
  pickerView: {
    overflow: 'hidden',
  },
  row: {
    borderBottomColor: COLORS.lightGray2,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
  },
  scrollView: {
    marginBottom: 65,
  },
  switch: {
    paddingRight: 60,
  },
});

export default function SettingsTab({
  // healthAPI,
  age,
  setAge,
  gender,
  setGender,
  height,
  setHeight,
  weight,
  setWeight,
  unit,
  setUnit,
}) {
  const [appleHealth, setAppleHealth] = useState(false);
  const toggleHealthSwitch = () => {
    setAppleHealth(previousState => !previousState);
    // healthAPI.init();
  };

  const [canAccessLocationData, setLocationAccess] = useState(false);
  const toggleLocationSwitch = () => {
    setLocationAccess(previousState => !previousState);
  };

  const [canAccessCalendar, setCalendarAccess] = useState(false);
  const toggleCalendarSwitch = async () => {
    setCalendarAccess(previousState => !previousState);
    if (!canAccessCalendar) {
      const {status} = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const times = await GetEventTimes();
        console.log(times);
      }
    }
  };
  const [canSendNotifications, setNotificationsAccess] = useState(false);
  const toggleNotificationsSwitch = async () => {
    setNotificationsAccess(previousState => !previousState);
    if (!canSendNotifications) {
      const {status} = await requestPermissionsAsync();
      console.log(`Notification status: ${status}`);
    }
  };
  const updateAge = async val => {
    setAge(val);
    await AsyncStorage.setItem('@age', val);
  };
  const updateGender = async val => {
    setGender(val);
    await AsyncStorage.setItem('@gender', val);
  };
  const updateHeight = async val => {
    setHeight(val);
    await AsyncStorage.setItem('@height', val);
  };
  const updateWeight = async val => {
    setWeight(val);
    await AsyncStorage.setItem('@weight', val);
  };
  const updateUnit = async val => {
    setUnit(val);
    await AsyncStorage.setItem('@unit', val);
  };
  const heightType = unit === 'us-system' ? 'in' : 'cm';
  const weightType = unit === 'us-system' ? 'lbs' : 'kg';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.row}>
          <Text h4 style={styles.label}>
            Apple Health
          </Text>
          <Switch
            style={styles.switch}
            trackColor={{true: COLORS.primary}}
            thumbColor={appleHealth ? COLORS.white : COLORS.primary}
            onValueChange={toggleHealthSwitch}
            value={appleHealth}
          />
        </View>

        <View style={styles.row}>
          <Text h4 style={styles.label}>
            Location Data
          </Text>
          <Switch
            style={styles.switch}
            trackColor={{true: COLORS.primary}}
            thumbColor={canAccessLocationData ? COLORS.white : COLORS.primary}
            onValueChange={toggleLocationSwitch}
            value={canAccessLocationData}
          />
        </View>

        <View style={styles.row}>
          <Text h4 style={styles.label}>
            Calendar
          </Text>
          <Switch
            style={styles.switch}
            trackColor={{true: COLORS.primary}}
            thumbColor={canAccessCalendar ? COLORS.white : COLORS.primary}
            onValueChange={toggleCalendarSwitch}
            value={canAccessCalendar}
          />
        </View>

        <View style={styles.row}>
          <Text h4 style={styles.label}>
            Allow Notifications
          </Text>
          <Switch
            style={styles.switch}
            trackColor={{true: COLORS.primary}}
            thumbColor={canSendNotifications ? COLORS.white : COLORS.primary}
            onValueChange={toggleNotificationsSwitch}
            value={canSendNotifications}
          />
        </View>

        <View style={styles.row}>
          <Text h4 style={styles.label}>
            Age
          </Text>
          <View style={styles.pickerView}>
            <Picker
              style={styles.picker1}
              selectedValue={age}
              onValueChange={updateAge}>
              {AGES.ages.map(item => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.row}>
          <Text h4 style={styles.label}>
            Gender
          </Text>
          <Picker
            selectedValue={gender}
            onValueChange={updateGender}
            style={styles.picker1}>
            <Picker.Item label="male" value="male" />
            <Picker.Item label="female" value="female" />
          </Picker>
        </View>

        <View style={styles.row}>
          <Text h4 style={styles.label}>
            Height
          </Text>
          <View style={styles.pickerView}>
            <Picker
              style={styles.picker1}
              selectedValue={height}
              onValueChange={updateHeight}>
              {AGES.heights.map(item => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.row}>
          <Text h4 style={styles.label}>
            Weight
          </Text>
          <View style={styles.pickerView}>
            <Picker
              style={styles.picker1}
              selectedValue={weight}
              onValueChange={updateWeight}>
              {AGES.weights.map(item => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.row}>
          <Text h4 style={styles.label}>
            Unit
          </Text>
          <Picker
            selectedValue={unit}
            onValueChange={updateUnit}
            style={styles.picker2}>
            <Picker.Item label="metric" value="metric" />
            <Picker.Item label="US system" value="us-system" />
          </Picker>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
