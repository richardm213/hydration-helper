import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from '@rneui/themed';
import {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import COLORS from '../theme/Colors';
import {
  agePicker,
  genderPicker,
  heightPicker,
  unitPicker,
  weightPicker,
} from './SettingsPickers';

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonTitle: {fontSize: 18, fontWeight: 'normal', padding: 0},
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    flex: 0.9,
    marginHorizontal: 50,
    marginVertical: 250,
    paddingHorizontal: 10,
  },
});

export default function SettingsModal({
  isVisible,
  setIsVisible,
  age,
  setAge,
  gender,
  setGender,
  height,
  setHeight,
  weight,
  setWeight,
  unit,
  setUnit,
  picker,
}) {
  const updateAge = useCallback(async val => {
    setAge(val);
    await AsyncStorage.setItem('@age', val);
  }, []);
  const updateGender = useCallback(async val => {
    setGender(val);
    await AsyncStorage.setItem('@gender', val);
  }, []);
  const updateHeight = useCallback(async val => {
    setHeight(val);
    await AsyncStorage.setItem('@height', val);
  }, []);
  const updateWeight = useCallback(async val => {
    setWeight(val);
    await AsyncStorage.setItem('@weight', val);
  }, []);
  const updateUnit = useCallback(async val => {
    setUnit(val);
    await AsyncStorage.setItem('@unit', val);
  }, []);
  const cancelChange = () => setIsVisible(false);
  const saveChange = () => setIsVisible(false);

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        {
          {
            age: agePicker(age, updateAge),
            gender: genderPicker(gender, updateGender),
            height: heightPicker(height, updateHeight),
            weight: weightPicker(weight, updateWeight),
            unit: unitPicker(unit, updateUnit),
          }[picker]
        }
        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            <Button
              title="Cancel"
              onPress={cancelChange}
              titleStyle={styles.buttonTitle}
            />
            <Button
              title="Save"
              onPress={saveChange}
              titleStyle={styles.buttonTitle}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
