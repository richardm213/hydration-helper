import {StatusBar} from 'expo-status-bar';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import {ScreenWidth} from 'react-native-elements/dist/helpers';

const white = '#fff';
const turquoise = '#0F5059';
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: white,
    bottom: 60,
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    marginTop: 55,
  },
  input: {
    marginBottom: 20,
    marginLeft: 70,
    marginRight: 70,
    marginTop: 20,
  },
  largerTextBlueBold: {
    alignItems: 'center',
    color: turquoise,
    fontSize: 22,
    fontWeight: 'bold',
    margin: 20,
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

export default function ExerciseTab() {
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
        size="200"
      />
      <Text style={styles.largerTextBlueBold}>
        Please enter your minutes of exercise below:
      </Text>
      <Input
        placeholder="Minutes of Exercise"
        inputContainerStyle={styles.input}
      />
      <Button
        buttonStyle={styles.submitButton}
        titleStyle={styles.largerTextWhite}
        title="Submit"
        onPress={() => Alert.alert('Your exercise has been recorded!')}
      />
      <StatusBar style="auto" />
    </View>
  );
}