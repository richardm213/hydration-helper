import {StatusBar} from 'expo-status-bar';
import {useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import {ScreenWidth} from 'react-native-elements/dist/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const white = '#fff';
const turquoise = '#0F5059';
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: white,
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
    color: turquoise,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 20,
  },
  largerTextWhite: {
    alignItems: 'center',
    color: white,
    fontSize: 22,
    fontWeight: 'bold',
    padding: 20,
  },
  moreDetails: {
    color: turquoise,
    textAlign: 'center',
    width: 0.85 * ScreenWidth,
  },
  submitButton: {
    backgroundColor: turquoise,
    borderRadius: 15,
    height: 50,
  },
});

export default function ExerciseTab({exercise, setExercise}) {
  const [input, setInput] = useState(0);
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
        color="#0F5059"
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
