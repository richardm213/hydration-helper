import React, {useState} from 'react';
import {Switch, Text, StyleSheet, View, TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const white = '#fff';
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: white,
    justifyContent: 'center',
  },
  dropDown: {
    flexGrow: 1,
    textAlign: 'right',
    width: '20%',
  },
  dropDownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    marginBottom: 10,
    paddingBottom: 80,
    width: '100%',
  },
  fluidLabel: {
    color: '#0F5059',
    fontSize: 15,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10,
    width: '50%',
  },
  label: {
    color: '#0F5059',
    fontSize: 15,
  },
  row: {
    borderBottomColor: 'black',
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
      <View style={styles.dropDownRow}>
        <Text style={styles.fluidLabel}>Unit of Fluid Measurement</Text>
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
    </View>
  );
}
