import {StyleSheet, View} from 'react-native';
import {Icon, Text} from '@rneui/base';
import COLORS from './Colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    flex: 1,
    justifyContent: 'center',
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
    marginHorizontal: 40,
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
  const measurementType = unit === 'us-system' ? 'oz' : 'ml';
  return (
    <View style={styles.container}>
      <View style={styles.temperatureView}>
        <Text h4>Weather: {temperature.toFixed(1)}&#8457;</Text>
      </View>
      <View style={styles.suggestionTextView}>
        <Icon name="water" type="ionicon" color={COLORS.primary} size={200} />
        <Text style={styles.suggestionText}>
          Your personalized recommendation for water intake today is:
        </Text>
      </View>
      <View style={styles.suggestionIntakeView}>
        <Text style={styles.suggestionIntakeText}>
          {recommendation.toFixed(0)} {measurementType}
        </Text>
      </View>
    </View>
  );
}
