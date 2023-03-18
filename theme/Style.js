import {StyleSheet} from 'react-native';
import COLORS from './Colors';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  largeBlueText: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
  },
});
