import {FlatList, StyleSheet, View} from 'react-native';
import {Button, Card, Icon, Text} from '@rneui/base';
import Modal from 'react-native-modal';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {startCase} from 'lodash';
import COLORS from '../theme/Colors';
import {DRINKS} from '../services/FoodDataAPI';

const styles = StyleSheet.create({
  cardStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    flex: 1,
    justifyContent: 'center',
  },
  diaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
  },
  diaryButtonContainer: {
    height: 50,
    marginTop: 95,
  },
  iconStyle: {
    padding: 10,
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
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 100,
    padding: 10,
  },
  progressText: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 10,
    textAlign: 'center',
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
    marginBottom: 25,
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
  wrapRecommendation: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderRadius: 20,
    borderWidth: 5,
    marginBottom: -5,
    marginTop: 25,
    paddingBottom: 15,
  },
});

export default function HomeTab({recommendation, unit, intake}) {
  const [isVisible, setIsVisible] = useState(false);
  const measurementType = unit === 'us-system' ? 'oz' : 'ml';
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    const getDetailedRecommendation = async () => {
      const drinkScores = JSON.parse(
        await AsyncStorage.getItem('@drinkScores'),
      );
      const performanceScore = parseInt(
        await AsyncStorage.getItem('@performanceScore'),
        10,
      );
      const tempCardData = [];
      const todaysDrinks = new Set(['water']);
      ['morning', 'afternoon', 'evening'].forEach(time => {
        const drinkType = Object.entries(drinkScores)
          .filter(entry => entry[0].includes(time))
          .sort((a, b) => b[1] - a[1])[0][0]
          .split('-')[0];
        todaysDrinks.add(drinkType);
        const cardObj = {
          drinkType: startCase(drinkType),
          drinkAmount: Math.ceil(recommendation / 6),
          drinkTime: time,
        };
        const cardObj2 = {
          drinkType: 'Water',
          drinkAmount: Math.ceil(recommendation / 6),
          drinkTime: time,
        };
        tempCardData.push(cardObj);
        tempCardData.push(cardObj2);
      });
      if (performanceScore < 70) {
        const drinksList = Object.keys(DRINKS).filter(
          d => !todaysDrinks.has(d),
        );
        const newDrink = `${startCase(
          drinksList[Math.floor(Math.random() * drinksList.length)],
        )} * new *`;
        tempCardData[1].drinkType = newDrink;
      }
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
          <Button
            buttonStyle={styles.closeButton}
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
      <View style={styles.temperatureView}>
        <Text style={styles.progressText}>
          Progress: {((intake * 100) / recommendation).toFixed(1)}%
        </Text>
      </View>
      <View style={styles.suggestionTextView}>
        <Icon
          style={styles.iconStyle}
          name="water"
          type="ionicon"
          color={COLORS.primary}
          size={200}
        />
        <View style={styles.wrapRecommendation}>
          <Text style={styles.suggestionText}>
            Today&apos;s water intake recommendation:{'\n'}
          </Text>

          <Text style={styles.suggestionIntakeText}>
            {recommendation.toFixed(0)} {measurementType}
          </Text>
        </View>
      </View>
      <View style={styles.suggestionIntakeView}>
        <Button
          title="My Drink Diary"
          buttonStyle={styles.diaryButton}
          titleStyle={styles.largerTextWhite}
          containerStyle={styles.diaryButtonContainer}
          onPress={() => setIsVisible(true)}
        />
      </View>
    </View>
  );
}
