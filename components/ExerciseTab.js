import {StatusBar} from 'expo-status-bar';
import {useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {Button, Icon, Input} from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from './Colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    bottom: 60,
    flex: 1,
  },
  icon: {
    marginTop: 40,
  },
  input: {
    marginBottom: 10,
    marginLeft: 70,
    marginRight: 70,
  },
  largerTextBlueBold: {
    alignItems: 'center',
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 20,
  },
  largerTextWhite: {
    alignItems: 'center',
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    padding: 20,
  },
  moreDetails: {
    color: COLORS.primary,
    marginHorizontal: 50,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    height: 50,
  },
});

export default function ExerciseTab({exercise, setExercise}) {
  const [input, setInput] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.moreDetails}>
        Exercise is beneficial for your health, but it also increases your need
        for water.
      </Text>
      <Icon
        style={styles.icon}
        name="run-circle"
        type="material-icons"
        color={COLORS.primary}
        size={200}
      />
      <Text style={styles.largerTextBlueBold}>
        Please enter your minutes of exercise below:
      </Text>
      <Input
        placeholder="Minutes of Exercise"
        inputContainerStyle={styles.input}
        value={input}
        onChangeText={val => setInput(val)}
      />
      <Button
        buttonStyle={styles.submitButton}
        titleStyle={styles.largerTextWhite}
        title="Submit"
        onPress={async () => {
          Alert.alert('Your exercise has been recorded!');
          setExercise(prev => prev + parseInt(input, 10));
          await AsyncStorage.setItem('@exercise', exercise.toString());
          setInput('');
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}
