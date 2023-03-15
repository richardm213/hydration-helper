import {FlatList, StyleSheet, View} from 'react-native';
import {Button, Card, Icon, Text} from '@rneui/base';
import Modal from 'react-native-modal';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from './Colors';
import DRINKS from './Drinks';

const styles = StyleSheet.create({
  cardStyle: {flexDirection: 'row', justifyContent: 'space-between'},
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    flex: 1,
    justifyContent: 'center',
  },
  largerTextWhite: {
    alignItems: 'center',
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    padding: 15,
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 100,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    height: 50,
    marginTop: 25,
  },
  suggestionIntakeText: {
    color: COLORS.primary,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  suggestionIntakeView: {
    flex: 1,
  },
  suggestionText: {
    color: COLORS.primary,
    fontSize: 26,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  suggestionTextView: {
    flex: 1.5,
    justifyContent: 'center',
  },
  temperatureView: {
    marginTop: 20,
  },
});

export default function HomeTab({recommendation, unit, temperature}) {
  const [isVisible, setIsVisible] = useState(false);
  const measurementType = unit === 'us-system' ? 'oz' : 'ml';
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    const getDetailedRecommendation = async () => {
      const drinkScores = JSON.parse(
        await AsyncStorage.getItem('@drinkScores'),
      );
      const tempCardData = [];
      ['morning', 'afternoon', 'evening'].forEach(time => {
        const drinkType = Object.entries(drinkScores)
          .filter(entry => entry[0].includes(time))
          .sort((a, b) => b[1] - a[1])[0][0]
          .split('-')[0];
        const cardObj = {
          drinkType,
          drinkAmount: Math.ceil(
            recommendation / ((6 * DRINKS[drinkType]) / 100),
          ),
          drinkTime: time,
        };
        const cardObj2 = {
          drinkType: 'water',
          drinkAmount: Math.ceil(recommendation / 6),
          drinkTime: time,
        };
        tempCardData.push(cardObj);
        tempCardData.push(cardObj2);
      });
      setCardData(tempCardData);
    };
    getDetailedRecommendation();
  }, []);

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
    <View style={styles.container}>
      <Modal isVisible={isVisible}>
        <View style={styles.modalContainer}>
          <Button title="close" onPress={() => setIsVisible(false)} />
          <FlatList
            data={cardData}
            renderItem={renderDrinkCard}
            keyExtractor={item => `${item.drinkType}-${item.drinkTime}`}
          />
        </View>
      </Modal>
      <View style={styles.temperatureView}>
        <Text h4>Weather: {temperature.toFixed(1)}&#8457;</Text>
      </View>
      <View style={styles.suggestionTextView}>
        <Icon name="water" type="ionicon" color={COLORS.primary} size={200} />
        <Text style={styles.suggestionText}>
          Today&apos;s recommendation:{'\n'}
        </Text>
        <Text style={styles.suggestionIntakeText}>
          {recommendation.toFixed(0)} {measurementType}
        </Text>
      </View>
      <View style={styles.suggestionIntakeView}>
        <Button
          title="View Details"
          buttonStyle={styles.submitButton}
          titleStyle={styles.largerTextWhite}
          onPress={() => setIsVisible(true)}
        />
      </View>
    </View>
  );
}
