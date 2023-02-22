import React, {useState} from 'react';
import {Switch, Text, StyleSheet, View, TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  dropDown: {
    width: 75,
  },
  input: {
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    margin: 5,
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

  const [open, setOpen] = useState(false);
  const [fluidMeasurement, setFluidMeasurement] = useState(null);
  const [measurements, setMeasurements] = useState([
    {label: 'ml', value: 'ml'},
    {label: 'oz', value: 'oz'},
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Health Data Access</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={canAccessHealthData ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleHealthSwitch}
          value={canAccessHealthData}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Location Data</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={canAccessLocationData ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleLocationSwitch}
          value={canAccessLocationData}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Unit of Fluid Measurement</Text>
        <DropDownPicker
          open={open}
          value={fluidMeasurement}
          items={measurements}
          setOpen={setOpen}
          setValue={setFluidMeasurement}
          setItems={setMeasurements}
          style={styles.dropDown}
        />
      </View>
      <View style={styles.row}>
        <Text>Height</Text>
        <TextInput
          style={styles.input}
          onChangeText={setHeight}
          value={height}
        />
      </View>
      <View style={styles.row}>
        <Text>Weight</Text>
        <TextInput
          style={styles.input}
          onChangeText={setWeight}
          value={weight}
        />
      </View>
    </View>
  );
}
