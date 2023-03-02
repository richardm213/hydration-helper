import React, {useState} from 'react';
import {Switch, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import {Text, Input} from '@rneui/base';
import * as Calendar from 'expo-calendar';

const white = '#fff';
const lightGray = '#e0e0e0';
const turquoise = '#0F5059';
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: white,
    flex: 1,
  },
  inputView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 30,
    width: 60,
  },
  label: {
    color: turquoise,
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
  row: {
    borderBottomColor: lightGray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
  },
  smallInputView: {
    width: 45,
  },
});

export default function SettingsTab({
  unit,
  setUnit,
  age,
  setAge,
  gender,
  setGender,
  height,
  setHeight,
  weight,
  setWeight,
}) {
  const [appleHealth, setAppleHealth] = useState(false);
  const toggleHealthSwitch = () => {
    setAppleHealth(previousState => !previousState);
  };

  const [canAccessLocationData, setLocationAccess] = useState(false);
  const toggleLocationSwitch = () =>
    setLocationAccess(previousState => !previousState);

  const [canAccessCalendar, setCalendarAccess] = useState(false);
  const toggleCalendarSwitch = async () => {
    setCalendarAccess(previousState => !previousState);
    if (!canAccessCalendar) {
      const {status} = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT,
        );
        console.log('Here are all your calendars:');
        console.log({calendars});
      }
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
    <View style={styles.container}>
      <View style={styles.row}>
        <Text h4 style={styles.label}>
          Apple Health
        </Text>
        <Switch
          trackColor={{true: turquoise}}
          thumbColor={appleHealth ? white : turquoise}
          onValueChange={toggleHealthSwitch}
          value={appleHealth}
        />
      </View>

      <View style={styles.row}>
        <Text h4 style={styles.label}>
          Location Data
        </Text>
        <Switch
          trackColor={{true: turquoise}}
          thumbColor={canAccessLocationData ? white : turquoise}
          onValueChange={toggleLocationSwitch}
          value={canAccessLocationData}
        />
      </View>

      <View style={styles.row}>
        <Text h4 style={styles.label}>
          Calendar
        </Text>
        <Switch
          trackColor={{true: turquoise}}
          thumbColor={canAccessCalendar ? white : turquoise}
          onValueChange={toggleCalendarSwitch}
          value={canAccessCalendar}
        />
      </View>

      <View style={styles.row}>
        <Text h4 style={styles.label}>
          Age
        </Text>
        <View style={styles.smallInputView}>
          <Input onChangeText={updateAge} value={age} placeholder="21" />
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
        <View style={styles.inputView}>
          <Input onChangeText={updateHeight} value={height} />
          <Text h4>{heightType}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text h4 style={styles.label}>
          Weight
        </Text>
        <View style={styles.inputView}>
          <Input onChangeText={updateWeight} value={weight} />
          <Text h4>{weightType}</Text>
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
    </View>
  );
}
