/* 
The Intake Tab provides an interface 
for the user to record a new drink intake.

The user can select a drink type 
(e.g. orange juice) from the available list
of drinks and input the amount of the drink. 
Once submitted, the record is added to
the user's progress towards their goal intake.

The user can also view the drinks that
they previously recorded today.
*/
import {useState} from 'react';
import {StyleSheet, Text, Alert, ScrollView, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SelectList} from 'react-native-dropdown-select-list';
import {startCase, camelCase} from 'lodash';
import {Button, Icon} from '@rneui/themed';
import DrinkSlider from '../components/DrinkSlider';
import COLORS from '../theme/Colors';
import DrinkEntry from '../utils/DrinkEntry';
import {DRINKS, getWaterAmount} from '../services/FoodDataAPI';
import Style from '../theme/Style';
import {getTime} from '../utils/DateUtils';
import DrinkLogModal from '../components/DrinkLogModal';
import {
  intakeNotification,
  sendNotification,
} from '../components/IntakeNotification';

const styles = StyleSheet.create({
  boxStyles: {marginHorizontal: 50, marginTop: 10},
  drinkLogButton: {
    backgroundColor: COLORS.primaryFaded,
  },
  drinkLogButtonContainer: {
    alignSelf: 'center',
    height: 35,
    marginBottom: 60,
  },
  dropDownStyles: {alignSelf: 'center', width: 200},
  icon: {
    marginTop: 20,
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
  submitButtonContainer: {
    marginBottom: 10,
  },
});

export default function IntakeTab({
  intake,
  setIntake,
  entries,
  setEntries,
  recommendation,
  unit,
}) {
  const [drinkAmount, setDrinkAmount] = useState(0);
  const [drinkType, setDrinkType] = useState(null);
  const drinksList = Object.keys(DRINKS).map(val => ({
    value: startCase(val),
  }));
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const showDrinkLog = async () => {
    setVisible(true);
  };
  const updateDrinkType = text => {
    setDrinkType(text);
    if (Object.keys(DRINKS).includes(camelCase(text))) setSubmitDisabled(false);
    else setSubmitDisabled(true);
  };
  const submitIntakeEntry = async () => {
    Alert.alert('Your entry has been recorded.');
    const drinkTypeKey = camelCase(drinkType);
    const waterAmount =
      drinkAmount * ((await getWaterAmount(drinkTypeKey)) / 100);
    const newIntake = intake + waterAmount;
    setIntake(newIntake);
    await AsyncStorage.setItem('@intake', newIntake.toString());
    const drinkTime = getTime();
    const e = new DrinkEntry(drinkTypeKey, drinkAmount, drinkTime);
    setEntries(prev => [...prev, e]);
    await AsyncStorage.setItem('@entries', JSON.stringify(entries));
    if (sendNotification(intake, recommendation, waterAmount))
      await intakeNotification(intake + waterAmount, recommendation);
  };

  return (
    <SafeAreaView style={Style.container}>
      <ScrollView style={styles.scrollView}>
        <Icon
          style={styles.icon}
          name="local-drink"
          type="material"
          size={160}
        />
        <Text style={Style.largeBlueText}>
          Please enter your new liquid intake below
        </Text>
        <SelectList
          setSelected={val => updateDrinkType(val)}
          data={drinksList}
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
          containerStyle={styles.submitButtonContainer}
          title="Submit"
          onPress={submitIntakeEntry}
        />
        <Button
          title="Today's drinks"
          onPress={showDrinkLog}
          buttonStyle={styles.drinkLogButton}
          titleStyle={styles.smallerTextWhite}
          containerStyle={styles.drinkLogButtonContainer}
        />
      </ScrollView>
      <DrinkLogModal
        visible={visible}
        setVisible={setVisible}
        drinkLog={entries}
        unit={unit}
      />
    </SafeAreaView>
  );
}
