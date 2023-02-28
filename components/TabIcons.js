import {Icon} from '@rneui/base';
import {MaterialIcons} from '@expo/vector-icons';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  navIcon: {height: 50, marginBottom: 5},
});
const intakeIcon = ({color, size}) => (
  <MaterialIcons
    name="local-drink"
    type="ionicon"
    color={color}
    size={size * 1.5}
    style={styles.navIcon}
  />
);
const exerciseIcon = ({color, size}) => (
  <MaterialIcons
    name="run-circle"
    color={color}
    size={size * 1.5}
    style={styles.navIcon}
  />
);
const waterIcon = ({color, size}) => (
  <Icon
    name="water"
    type="ionicon"
    color={color}
    size={size * 1.5}
    style={styles.navIcon}
  />
);
const settingsIcon = ({color, size}) => (
  <MaterialIcons
    name="settings"
    color={color}
    size={size * 1.5}
    style={styles.navIcon}
  />
);

export {intakeIcon, exerciseIcon, waterIcon, settingsIcon};
