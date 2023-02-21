import React, {useState} from 'react';
import {Switch, Text, StyleSheet, View} from 'react-native';

const white = '#fff';
const turquoise = '#0F5059';
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    margin: 5,
  },
});

export default function SettingsTab() {
  const [canAccessHealthData, setHealthAccess] = useState(false);
  const [canAccessLocationData, setLocationAccess] = useState(false);
  const toggleHealthSwitch = () =>
    setHealthAccess(previousState => !previousState);

  const toggleLocationSwitch = () =>
    setLocationAccess(previousState => !previousState);

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
    </View>
  );
}
