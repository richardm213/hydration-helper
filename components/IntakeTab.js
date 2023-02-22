import {StyleSheet, Text, View} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';

const white = '#fff';
const turquoise = '#0F5059';
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: white,
    flex: 1,
  },
  icon: {
    marginTop: 30,
  },
  input: {
    marginLeft: 70,
    marginRight: 70,
  },
  largerTextBlue: {
    alignItems: 'center',
    color: turquoise,
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
  },
  largerTextWhite: {
    alignItems: 'center',
    color: white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: turquoise,
    height: 50,
  },
});

export default function IntakeTab() {
  return (
    <View style={styles.container}>
      <Icon
        style={styles.icon}
        name="local-drink"
        type="material"
        color={turquoise}
        size="160"
      />
      <Text style={styles.largerTextBlue}>
        Please enter your new liquid intake below
      </Text>
      <Input inputContainerStyle={styles.input} placeholder="Num ounces" />
      <Input
        inputContainerStyle={styles.input}
        placeholder="Drink type (ie. water)"
      />
      <Button
        buttonStyle={styles.submitButton}
        titleStyle={styles.largerTextWhite}
        title="Submit"
      />
    </View>
  );
}
