import {FlatList, StyleSheet, View} from 'react-native';
import {Card, Text} from '@rneui/base';
import Modal from 'react-native-modal';
import {useState} from 'react';
import {Button, Icon} from '@rneui/themed';
import COLORS from '../theme/Colors';
import useTodaysDrinks from '../hooks/useTodaysDrinks';
import Style from '../theme/Style';

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
  progressText: {
    marginTop: 10,
  },
  suggestionIntakeText: {
    color: COLORS.primary,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  suggestionText: {
    fontSize: 26,
    paddingVertical: 0,
  },
  wrapRecommendation: {
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderRadius: 20,
    borderWidth: 5,
    marginBottom: 50,
    marginTop: 25,
    paddingBottom: 15,
    paddingTop: 10,
  },
});

export default function HomeTab({recommendation, unit, intake}) {
  const [isVisible, setIsVisible] = useState(false);
  const measurementType = unit === 'us-system' ? 'oz' : 'ml';
  const cardData = useTodaysDrinks(recommendation);

  const renderDrinkCard = ({item}) => (
    <Card wrapperStyle={styles.cardStyle}>
      <Text>{item.drinkType}</Text>
      <Text>
        {item.drinkAmount} {measurementType}
      </Text>
      <Text>{item.drinkTime}</Text>
    </Card>
  );
  return (
    <View style={Style.container}>
      <Modal isVisible={isVisible}>
        <View style={styles.modalContainer}>
          <Button
            title="Close Drink Diary"
            onPress={() => setIsVisible(false)}
          />
          <FlatList
            data={cardData}
            renderItem={renderDrinkCard}
            keyExtractor={item => `${item.drinkType}-${item.drinkTime}`}
          />
        </View>
      </Modal>

      <Text style={[Style.largeBlueText, styles.progressText]}>
        Your Progress: {((intake * 100) / recommendation).toFixed(1)}%
      </Text>
      <Icon name="water" type="ionicon" size={200} />
      <View style={styles.wrapRecommendation}>
        <Text style={[Style.largeBlueText, styles.suggestionText]}>
          Today&apos;s water intake recommendation:{'\n'}
        </Text>
        <Text style={styles.suggestionIntakeText}>
          {recommendation.toFixed(0)} {measurementType}
        </Text>
      </View>
      <Button title="My Drink Diary" onPress={() => setIsVisible(true)} />
    </View>
  );
}
