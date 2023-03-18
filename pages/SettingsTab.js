import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from '@rneui/base';
import * as Calendar from 'expo-calendar';
import {requestPermissionsAsync} from 'expo-notifications';
import Modal from 'react-native-modal';
import {Button, Switch} from '@rneui/themed';
import COLORS from '../theme/Colors';
import GetEventTimes from '../services/CalendarAPI';
import {
  agePicker,
  genderPicker,
  heightPicker,
  unitPicker,
  weightPicker,
} from '../components/SettingsPickers';

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonTitle: {fontSize: 18, fontWeight: 'normal', padding: 0},
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  label: {
    color: COLORS.primary,
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    flex: 0.9,
    marginHorizontal: 50,
    marginVertical: 250,
    paddingHorizontal: 10,
  },
  rightText: {
    color: COLORS.gray,
    paddingRight: 15,
  },
  row: {
    borderBottomColor: COLORS.lightGray2,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 20.5,
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
  healthAPI,
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
  setCalories,
  setProtein,
}) {
  /*
  Set up toggles for:
  Health API,
  Geolocation API,
  Calendar API, and
  Notifications (allow/don't allow)
  */

  const [appleHealth, setAppleHealth] = useState(false);
  const toggleHealthSwitch = () => {
    setAppleHealth(previousState => !previousState);
    healthAPI.init();
    healthAPI.energyConsumed(setCalories);
    healthAPI.protein(setProtein);
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
  /* 
  Updates stored values for properties
  in local storage
  */
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
  const [isVisible, setIsVisible] = useState(false);
  const [picker, setPicker] = useState(null);
  const cancelChange = () => setIsVisible(false);
  const saveChange = () => setIsVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.row}>
          <Text h4 style={styles.label}>
            Apple Health
          </Text>
          <Switch
            style={styles.switch}
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
            thumbColor={canSendNotifications ? COLORS.white : COLORS.primary}
            onValueChange={toggleNotificationsSwitch}
            value={canSendNotifications}
          />
        </View>

        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            setPicker('age');
            setIsVisible(true);
          }}>
          <Text h4 style={styles.label}>
            Age
          </Text>
          <Text h4 style={styles.rightText}>
            {age}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            setPicker('gender');
            setIsVisible(true);
          }}>
          <Text h4 style={styles.label}>
            Gender
          </Text>
          <Text h4 style={styles.rightText}>
            {gender}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            setPicker('height');
            setIsVisible(true);
          }}>
          <Text h4 style={styles.label}>
            Height
          </Text>
          <Text h4 style={styles.rightText}>
            {height} {heightType}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            setPicker('weight');
            setIsVisible(true);
          }}>
          <Text h4 style={styles.label}>
            Weight
          </Text>
          <Text h4 style={styles.rightText}>
            {weight} {weightType}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            setPicker('unit');
            setIsVisible(true);
          }}>
          <Text h4 style={styles.label}>
            Unit
          </Text>
          <Text h4 style={styles.rightText}>
            {unit}
          </Text>
        </TouchableOpacity>

        <Modal isVisible={isVisible}>
          <View style={styles.modalContainer}>
            {
              {
                age: agePicker(age, updateAge),
                gender: genderPicker(gender, updateGender),
                height: heightPicker(height, updateHeight),
                weight: weightPicker(weight, updateWeight),
                unit: unitPicker(unit, updateUnit),
              }[picker]
            }
            <View style={styles.buttonContainer}>
              <View style={styles.buttonRow}>
                <Button
                  title="Cancel"
                  onPress={cancelChange}
                  titleStyle={styles.buttonTitle}
                />
                <Button
                  title="Save"
                  onPress={saveChange}
                  titleStyle={styles.buttonTitle}
                />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
