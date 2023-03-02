import {useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import DrinkSlider from './DrinkSlider';

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
    padding: 20,
  },
  submitButton: {
    backgroundColor: turquoise,
    borderRadius: 15,
    height: 50,
  },
});

/* TODO: Modify to include percent water intake achieved
and only be sent when some amount was recorded etc */
async function intakeRecordNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Well done! Every intake record counts.',
      body: 'Keep up the good work.',
      data: {data: 'goes here'},
    },
    trigger: {seconds: 5},
  });
}

export default function IntakeTab({intake, setIntake, unit}) {
  const [drinkAmount, setDrinkAmount] = useState(0);
  const [drinkType, setDrinkType] = useState('water');
  return (
    <View style={styles.container}>
      <Icon
        style={styles.icon}
        name="local-drink"
        type="material"
        color={turquoise}
        size={160}
      />
      <Text style={styles.largerTextBlue}>
        Please enter your new liquid intake below
      </Text>
      <DrinkSlider
        drinkAmount={drinkAmount}
        setDrinkAmount={setDrinkAmount}
        unit={unit}
      />
      <Input
        inputContainerStyle={styles.input}
        placeholder="Drink type (ie. water)"
        onChangeText={text => setDrinkType(text)}
      />
      <Button
        buttonStyle={styles.submitButton}
        titleStyle={styles.largerTextWhite}
        title="Submit"
        onPress={async () => {
          Alert.alert('Your entry has been recorded.');
          await AsyncStorage.setItem('@drink_type', drinkType);
          await AsyncStorage.setItem('@drink_amount', drinkAmount.toString());
          const newIntake = intake + drinkAmount;
          await AsyncStorage.setItem('@intake', newIntake.toString());
          setIntake(prev => prev + drinkAmount);
          await intakeRecordNotification();
        }}
      />
    </View>
  );
}
