import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Text} from '@rneui/base';
import * as Calendar from 'expo-calendar';
import {requestPermissionsAsync} from 'expo-notifications';
import {Switch} from '@rneui/themed';
import COLORS from '../theme/Colors';
import GetEventTimes from '../services/CalendarAPI';
import Style from '../theme/Style';
import SettingsModal from '../components/SettingsModal';

const styles = StyleSheet.create({
  label: {
    color: COLORS.primary,
  },
  rightText: {
    color: COLORS.gray,
    paddingRight: 15,
  },
  row: {
    borderColor: COLORS.lightGray2,
    borderWidth: 0.5,
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

  const heightType = unit === 'us-system' ? 'in' : 'cm';
  const weightType = unit === 'us-system' ? 'lbs' : 'kg';
  const [isVisible, setIsVisible] = useState(false);
  const [picker, setPicker] = useState(null);

  return (
    <SafeAreaView style={Style.container}>
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

        <SettingsModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
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
          picker={picker}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
