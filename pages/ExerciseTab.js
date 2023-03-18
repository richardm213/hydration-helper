import {StatusBar} from 'expo-status-bar';
import {useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {Button, Icon} from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../theme/Colors';
import ExerciseSlider from '../components/ExerciseSlider';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    flex: 1,
  },
  icon: {
    marginTop: 20,
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
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
  },
  submitButtonContainer: {
    height: 50,
  },
});

export default function ExerciseTab({exercise, setExercise}) {
  const [input, setInput] = useState(0);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const updateExerciseAmount = val => {
    setInput(val);
    setSubmitDisabled(val === 0);
  };
  const submitExerciseEntry = async () => {
    Alert.alert('Your exercise has been recorded!');
    const newExercise = exercise + input;
    setExercise(newExercise);
    await AsyncStorage.setItem('@exercise', newExercise.toString());
  };
  return (
    <View style={styles.container}>
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
      <ExerciseSlider
        exerciseAmount={input}
        setExerciseAmount={updateExerciseAmount}
      />
      <Button
        disabled={submitDisabled}
        buttonStyle={styles.submitButton}
        titleStyle={styles.largerTextWhite}
        containerStyle={styles.submitButtonContainer}
        title="Submit"
        onPress={submitExerciseEntry}
      />
      <StatusBar style="auto" />
    </View>
  );
}
