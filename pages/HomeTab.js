/* 
The Home Tab displays the user's water
intake recommendation, but also has
additional features. 

The current temperature is fetched and 
displayed in the header.

The user's current progress to reaching
their daily goal is presented in percent.

Lastly, the user can view and hide
their Drink Diary.
*/
import {StyleSheet, View} from 'react-native';
import {Text} from '@rneui/base';
import {useState} from 'react';
import {Button, Icon} from '@rneui/themed';
import COLORS from '../theme/Colors';
import useTodaysDrinks from '../hooks/useTodaysDrinks';
import Style from '../theme/Style';
import DiaryModal from '../components/DiaryModal';

const styles = StyleSheet.create({
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

  return (
    <View style={Style.container}>
      <DiaryModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        cardData={cardData}
        measurementType={measurementType}
      />
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
