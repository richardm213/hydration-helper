import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default function IntakeTab() {
  return (
    <View style={styles.container}>
      <Text>Intake!</Text>
    </View>
  );
}
