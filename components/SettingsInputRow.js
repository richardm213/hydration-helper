import {Text} from '@rneui/base';
import {startCase} from 'lodash';
import {StyleSheet, TouchableOpacity} from 'react-native';
import COLORS from '../theme/Colors';

const styles = StyleSheet.create({
  label: {
    color: COLORS.primary,
  },
  rightText: {
    color: COLORS.gray,
    paddingRight: 15,
  },
  row: {
    borderColor: COLORS.lightGray2,
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 20.5,
    width: '100%',
  },
});

export default function SettingsInputRow({
  field,
  value,
  setPicker,
  setIsVisible,
  unit,
}) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => {
        setPicker(field);
        setIsVisible(true);
      }}>
      <Text h4 style={styles.label}>
        {startCase(field)}
      </Text>
      <Text h4 style={styles.rightText}>
        {value}
        {unit ? ` ${unit}` : ''}
      </Text>
    </TouchableOpacity>
  );
}
