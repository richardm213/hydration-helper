import {Text} from '@rneui/base';
import {StyleSheet, View} from 'react-native';
import COLORS from '../theme/Colors';

const styles = StyleSheet.create({
  align: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftDot: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    height: 15,
    marginBottom: 6,
    marginRight: 8,
    width: 15,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 25,
    marginTop: 25,
  },
  rightDot: {
    backgroundColor: COLORS.lighterBlue,
    borderRadius: 15,
    height: 15,
    marginBottom: 6,
    marginRight: 8,
    width: 15,
  },
  textLegend: {
    color: COLORS.primary,
    fontSize: 15,
    height: 25,
  },
});

export default function GraphLegend() {
  return (
    <View style={styles.legend}>
      <View style={styles.align}>
        <View style={styles.leftDot} />
        <Text style={styles.textLegend}>Recommended Intake</Text>
      </View>
      <View style={styles.align}>
        <View style={styles.rightDot} />
        <Text style={styles.textLegend}>Recorded Intake</Text>
      </View>
    </View>
  );
}
