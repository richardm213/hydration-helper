import Modal from 'react-native-modal';
import {View, StyleSheet, FlatList} from 'react-native';
import {Button} from '@rneui/themed';
import {useCallback} from 'react';
import {Card, Text} from '@rneui/base';
import COLORS from '../theme/Colors';

const styles = StyleSheet.create({
  cardStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 100,
    padding: 10,
  },
});

export default function DiaryModal({
  isVisible,
  setIsVisible,
  cardData,
  measurementType,
}) {
  const renderDrinkCard = useCallback(
    ({item}) => (
      <Card wrapperStyle={styles.cardStyle}>
        <Text>{item.drinkType}</Text>
        <Text>
          {item.drinkAmount} {measurementType}
        </Text>
        <Text>{item.drinkTime}</Text>
      </Card>
    ),
    [],
  );

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <Button title="Close Drink Diary" onPress={() => setIsVisible(false)} />
        <FlatList
          data={cardData}
          renderItem={renderDrinkCard}
          keyExtractor={item => `${item.drinkType}-${item.drinkTime}`}
        />
      </View>
    </Modal>
  );
}
