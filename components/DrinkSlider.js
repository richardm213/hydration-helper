import {Text} from '@rneui/base';
import {Icon, Slider} from '@rneui/themed';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  iconContainerStyle: {bottom: 20, right: 20},
  sliderStyle: {marginBottom: 5},
  textStyle: {
    textAlign: 'center',
  },
  thumbStyle: {height: 20, width: 20},
  thumbTouchSize: {height: 40, width: 40},
  trackStyle: {borderRadius: 20, height: 10},
  viewStyle: {
    justifyContent: 'center',
    padding: '10%',
    width: '100%',
  },
});

export default function DrinkSlider({drinkAmount, setDrinkAmount, unit}) {
  const measurementType = unit === 'us-system' ? 'oz' : 'ml';
  const maxAmount = unit === 'us-system' ? 40 : 1200;

  return (
    <View style={styles.viewStyle}>
      <Slider
        maximumValue={maxAmount}
        onValueChange={value => setDrinkAmount(value)}
        step={1}
        style={styles.sliderStyle}
        thumbStyle={styles.thumbStyle}
        thumbProps={{
          children: (
            <Icon
              name="tint"
              type="font-awesome"
              size={20}
              reverse
              containerStyle={styles.iconContainerStyle}
            />
          ),
        }}
        thumbTouchSize={styles.thumbTouchSize}
        trackStyle={styles.trackStyle}
        value={drinkAmount}
      />
      <Text h4 style={styles.textStyle}>
        {drinkAmount} {measurementType}
      </Text>
    </View>
  );
}
