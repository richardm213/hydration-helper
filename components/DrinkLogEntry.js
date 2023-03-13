import {Text, View, StyleSheet} from 'react-native';
import COLORS from './Colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.iceBlue,
    borderColor: COLORS.primaryFaded,
    borderRadius: 15,
    borderWidth: 2,
    margin: 10,
  },
  entry: {
    color: COLORS.primary,
    fontSize: 24,
    padding: 10,
  },
});

export default function DrinkLogEntry({drinkEntry, unit}) {
  const formatTime = time => {
    const hour = parseInt(time.slice(0, time.indexOf(':')), 10);
    return hour > 12
      ? `${(hour - 12).toString() + time.slice(time.indexOf(':'))} PM`
      : `${time}AM`;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.entry}>
        You drank {drinkEntry.drinkAmount} {unit === 'us-system' ? 'oz' : 'ml'}{' '}
        of {drinkEntry.drinkType}
        {'\n'}
        at {formatTime(drinkEntry.drinkTime)}.
      </Text>
    </View>
  );
}
