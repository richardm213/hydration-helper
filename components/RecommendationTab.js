import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';

const white = '#fff';
const turquoise = '#0F5059';
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: white,
    flex: 1,
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
    marginHorizontal: 40,
    marginTop: 10,
    textAlign: 'center',
  },
  suggestionTextView: {
    flex: 1.5,
    justifyContent: 'center',
  },
});

export default function RecommendationTab({recommendation, unit}) {
  const measurementType = unit === 'us-system' ? 'oz' : 'ml';
  return (
    <View style={styles.container}>
      <View style={styles.suggestionTextView}>
        <Icon name="water" type="ionicon" color="#0F5059" size="200" />
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
