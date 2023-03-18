import {Button} from '@rneui/themed';
import {useCallback} from 'react';
import {FlatList, Modal, SafeAreaView, StyleSheet} from 'react-native';
import DrinkLogEntry from './DrinkLogEntry';

const styles = StyleSheet.create({
  closeButtonContainer: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
  drinksContainer: {
    marginHorizontal: 5,
    marginVertical: 100,
  },
});

export default function DrinkLogModal({visible, setVisible, drinkLog, unit}) {
  const hideDrinkLog = useCallback(() => setVisible(false), []);

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.drinksContainer}>
        <Button
          title="Close"
          containerStyle={styles.closeButtonContainer}
          onPress={hideDrinkLog}
        />
        <FlatList
          data={drinkLog}
          extraData={drinkLog}
          renderItem={({item}) => (
            <DrinkLogEntry drinkEntry={item} unit={unit} />
          )}
        />
      </SafeAreaView>
    </Modal>
  );
}
