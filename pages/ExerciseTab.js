/*
  The Exercise Tab provides an interface
  for the user to input their minutes
  of exercise, between a range of 
  1 to 180 minutes (3 hours). 

  Once submitted, the exercise record is
  used to update the recommended water intake.
 */
import {StatusBar} from 'expo-status-bar';
import {useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Icon} from '@rneui/themed';
import ExerciseSlider from '../components/ExerciseSlider';
import Style from '../theme/Style';

const styles = StyleSheet.create({
  icon: {
    marginTop: 20,
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
    <View style={Style.container}>
      <Icon
        style={styles.icon}
        name="run-circle"
        type="material-icons"
        size={200}
      />
      <Text style={Style.largeBlueText}>
        Please enter your minutes of exercise below:
      </Text>
      <ExerciseSlider
        exerciseAmount={input}
        setExerciseAmount={updateExerciseAmount}
      />
      <Button
        disabled={submitDisabled}
        title="Submit"
        onPress={submitExerciseEntry}
      />
      <StatusBar style="auto" />
    </View>
  );
}
