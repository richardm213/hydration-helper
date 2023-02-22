import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {useState} from 'react';

const white = '#fff';
const turquoise = '#0F5059';
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: white,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  iconView: {
    flex: 1.5,
    justifyContent: 'center',
  },
  suggestionIntakeText: {
    color: turquoise,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  suggestionIntakeView: {
    flex: 1,
  },
  suggestionText: {
    color: turquoise,
    fontSize: 26,
    fontWeight: 'bold',
    marginHorizontal: 30,
    textAlign: 'center',
  },
  suggestionTextView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default function RecommendationTab() {
  const [measurementType, setMeasurementType] = useState('');
  const [recommendation, setRecommendation] = useState(30);
  useFocusEffect(() => {
    const fetchMeasurementType = async () =>
      setMeasurementType(await AsyncStorage.getItem('@measurement_type'));
    const updateRecommendation = async () => {
      setRecommendation(measurementType === 'ml' ? 3000 : 120);
      await AsyncStorage.setItem('@recommendation', recommendation.toString());
    };
    fetchMeasurementType();
    updateRecommendation();
  });
  return (
    <View style={styles.container}>
      <View style={styles.iconView}>
        <Icon name="water" type="ionicon" color="#0F5059" size="200" />
      </View>
      <View style={styles.suggestionTextView}>
        <Text style={styles.suggestionText}>
          Your personalized recommendation for water intake today is:
        </Text>
      </View>
      <View style={styles.suggestionIntakeView}>
        <Text style={styles.suggestionIntakeText}>
          {recommendation} {measurementType}
        </Text>
      </View>
    </View>
  );
}
