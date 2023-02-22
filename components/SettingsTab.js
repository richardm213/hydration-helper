import React, {useState} from 'react';
import {Switch, StyleSheet, View, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import {Text} from '@rneui/base';

const white = '#fff';
const black = '#000';
const turqoise = '#0F5059';
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: white,
    flex: 1,
  },
  fluidLabel: {
    color: turqoise,
  },
  input: {
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10,
    width: '50%',
  },
  label: {
    color: turqoise,
    fontSize: 15,
  },
  lastRow: {
    justifyContent: 'center',
  },
  picker: {width: 200},
  row: {
    borderBottomColor: black,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    paddingBottom: 10,
    width: '100%',
  },
});

export default function SettingsTab() {
  const [canAccessHealthData, setHealthAccess] = useState(false);
  const toggleHealthSwitch = () =>
    setHealthAccess(previousState => !previousState);

  const [canAccessLocationData, setLocationAccess] = useState(false);
  const toggleLocationSwitch = () =>
    setLocationAccess(previousState => !previousState);

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const [fluidMeasurement, setFluidMeasurement] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Health Data Access</Text>
        <Switch
          trackColor={{false: '#DEFBFF', true: '#81C6D0'}}
          thumbColor={canAccessHealthData ? '#FFFFFF' : '#81C6D0'}
          onValueChange={toggleHealthSwitch}
          value={canAccessHealthData}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Location Data</Text>
        <Switch
          trackColor={{false: '#DEFBFF', true: '#81C6D0'}}
          thumbColor={canAccessLocationData ? '#FFFFFF' : '#81C6D0'}
          onValueChange={toggleLocationSwitch}
          value={canAccessLocationData}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Height</Text>
        <TextInput
          style={styles.input}
          onChangeText={setHeight}
          value={height}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Weight</Text>
        <TextInput
          style={styles.input}
          onChangeText={setWeight}
          value={weight}
        />
      </View>
      <View style={styles.lastRow}>
        <Text h4 style={styles.fluidLabel}>
          Unit of Fluid Measurement
        </Text>
        <Picker
          selectedValue={fluidMeasurement}
          onValueChange={async value => {
            setFluidMeasurement(value);
            await AsyncStorage.setItem('@measurement_type', value);
          }}
          style={styles.picker}>
          <Picker.Item label="oz" value="oz" />
          <Picker.Item label="ml" value="ml" />
        </Picker>
      </View>
    </View>
  );
}
