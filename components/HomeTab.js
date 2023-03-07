import {StyleSheet, View} from 'react-native';
import {Button, Card, Icon, Text} from '@rneui/base';
import Modal from 'react-native-modal';
import {useState} from 'react';
import COLORS from './Colors';

const styles = StyleSheet.create({
  cardStyle: {flexDirection: 'row', justifyContent: 'space-between'},
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    flex: 1,
    justifyContent: 'center',
  },
  largerTextWhite: {
    alignItems: 'center',
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    padding: 15,
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 100,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    height: 50,
    marginTop: 25,
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
  const [isVisible, setIsVisible] = useState(false);
  const measurementType = unit === 'us-system' ? 'oz' : 'ml';
  return (
    <View style={styles.container}>
      <Modal isVisible={isVisible}>
        <View style={styles.modalContainer}>
          <Button title="close" onPress={() => setIsVisible(false)} />
          <Card wrapperStyle={styles.cardStyle}>
            <Text>water</Text>
            <Text>10 oz</Text>
            <Text>10 am</Text>
          </Card>
          <Card wrapperStyle={styles.cardStyle}>
            <Text>tea</Text>
            <Text>14 oz</Text>
            <Text>12 pm</Text>
          </Card>
          <Card wrapperStyle={styles.cardStyle}>
            <Text>soda</Text>
            <Text>23 oz</Text>
            <Text>5 pm</Text>
          </Card>
          <Card wrapperStyle={styles.cardStyle}>
            <Text>coffee</Text>
            <Text>12 oz</Text>
            <Text>8 pm</Text>
          </Card>
        </View>
      </Modal>
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
        <Button
          title="View Details"
          buttonStyle={styles.submitButton}
          titleStyle={styles.largerTextWhite}
          onPress={() => setIsVisible(true)}
        />
      </View>
    </View>
  );
}
