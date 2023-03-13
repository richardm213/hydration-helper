import {useState} from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  ScrollView,
  SafeAreaView,
  Modal,
  FlatList,
} from 'react-native';
import {Button, Icon} from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import {SelectList} from 'react-native-dropdown-select-list';
import DrinkSlider from './DrinkSlider';
import COLORS from './Colors';
import DRINKS from './Drinks';
import DrinkEntry from './DrinkEntry';
import {getWaterRank} from '../services/foodDataAPI';
import DrinkLogEntry from './DrinkLogEntry';

const styles = StyleSheet.create({
  boxStyles: {marginHorizontal: 50, marginTop: 10},
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  drinkLogButton: {
    backgroundColor: COLORS.primaryFaded,
    borderRadius: 15,
    height: 35,
    marginBottom: 60,
    marginHorizontal: 135,
  },
  dropDownStyles: {alignSelf: 'center', width: 200},
  icon: {
    marginTop: 20,
  },
  largerTextBlue: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
    margin: 15,
    textAlign: 'center',
  },
  largerTextWhite: {
    alignItems: 'center',
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
  },
  scrollView: {
    marginBottom: 60,
  },
  smallerTextWhite: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    height: 50,
    marginBottom: 10,
    marginHorizontal: 125,
  },
});

/* TODO: Modify to include percent water intake achieved
and only be sent when some amount was recorded etc */
async function intakeRecordNotification(intake, recommendation) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `You have reached ${((intake * 100) / recommendation).toFixed(
        1,
      )}% of today's water goal!`,
      body: 'Keep up the good work; Every intake record counts.',
      data: {data: 'goes here'},
    },
    trigger: {seconds: 5},
  });
}

const drinks = [
  {key: '1', value: 'Water'},
  {key: '2', value: 'Soda'},
  {key: '3', value: 'Milk'},
  {key: '4', value: 'Orange Juice'},
  {key: '5', value: 'Coffee'},
];

export default function IntakeTab({intake, setIntake, recommendation, unit}) {
  const [drinkAmount, setDrinkAmount] = useState(0);
  const [drinkType, setDrinkType] = useState('water');
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const [drinkLog, setDrinkLog] = useState(async () => {
    let data = await AsyncStorage.getItem('@entries');
    if (data) data = JSON.parse(data);
    else data = [];
    setDrinkLog(data);
  });
  const updateDrinkLog = async () => {
    let data = await AsyncStorage.getItem('@entries');
    if (data) data = JSON.parse(data);
    else data = [];
    setDrinkLog(data);
  };
  const showDrinkLog = async () => {
    updateDrinkLog();
    console.log(drinkLog);
    setVisible(true);
  };
  const hideDrinkLog = () => setVisible(false);
  const camalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  const updateDrinkType = text => {
    setDrinkType(text);
    if (camalize(text) in DRINKS) setSubmitDisabled(false);
    else setSubmitDisabled(true);
  };
  const getTime = () => {
    const date = new Date();
    const hour = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    return `${hour.toString()}:${minutes.toString()}`;
  };
  const storeEntry = async e => {
    let entries = await AsyncStorage.getItem('@entries');
    if (entries) entries = JSON.parse(entries);
    else entries = [];
    entries.push(e);
    await AsyncStorage.setItem('@entries', JSON.stringify(entries));
  };
  const submitIntakeEntry = async () => {
    Alert.alert('Your entry has been recorded.');
    const drinkTypeKey = camalize(drinkType);
    const waterAmount =
      drinkAmount * ((await getWaterRank(drinkTypeKey)) / 100);
    const newIntake = intake + waterAmount;
    setIntake(newIntake);
    await AsyncStorage.setItem('@intake', newIntake.toString());
    const drinkTime = getTime();
    const e = new DrinkEntry(drinkTypeKey, drinkAmount, drinkTime);
    storeEntry(e);
    await intakeRecordNotification(intake + waterAmount, recommendation);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Icon
          style={styles.icon}
          name="local-drink"
          type="material"
          color={COLORS.primary}
          size={160}
        />
        <Text style={styles.largerTextBlue}>
          Please enter your new liquid intake below
        </Text>
        <SelectList
          setSelected={val => updateDrinkType(val)}
          data={drinks}
          save="value"
          boxStyles={styles.boxStyles}
          dropdownStyles={styles.dropDownStyles}
          placeholder="Enter or select drink type"
        />
        <DrinkSlider
          drinkAmount={drinkAmount}
          setDrinkAmount={setDrinkAmount}
          unit={unit}
        />
        <Button
          disabled={submitDisabled}
          buttonStyle={styles.submitButton}
          titleStyle={styles.largerTextWhite}
          title="Submit"
          onPress={submitIntakeEntry}
        />
        <Button
          title="Today's drinks"
          onPress={showDrinkLog}
          buttonStyle={styles.drinkLogButton}
          titleStyle={styles.smallerTextWhite}
        />
        <Modal visible={visible} animationType="slide">
          <SafeAreaView style={styles.scrollView}>
            <Button title="Close" onPress={hideDrinkLog} />
            <FlatList
              data={drinkLog}
              extraData={drinkLog}
              renderItem={({item}) => (
                <DrinkLogEntry drinkEntry={item} unit={unit} />
              )}
            />
          </SafeAreaView>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
