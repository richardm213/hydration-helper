import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';

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
        <Text style={styles.suggestionIntakeText}>3000 ml</Text>
      </View>
    </View>
  );
}
