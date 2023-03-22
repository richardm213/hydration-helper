import {Text} from '@rneui/base';
import {Icon, Slider} from '@rneui/themed';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  iconContainerStyle: {bottom: 20, right: 20},
  sliderStyle: {marginBottom: 10},
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

export default function ExerciseSlider({exerciseAmount, setExerciseAmount}) {
  /* 
  Determine the maximum value for the
  slider to be 180 minutes, aka 3 hours
  */
  const maxAmount = 3 * 60;
  return (
    <View style={styles.viewStyle}>
      <Slider
        maximumValue={maxAmount}
        onValueChange={value => setExerciseAmount(value)}
        step={5}
        style={styles.sliderStyle}
        thumbStyle={styles.thumbStyle}
        thumbProps={{
          children: (
            <Icon
              containerStyle={styles.iconContainerStyle}
              name="run-circle"
              reverse
              size={20}
              type="material-icons"
            />
          ),
        }}
        thumbTouchSize={styles.thumbTouchSize}
        trackStyle={styles.trackStyle}
        value={exerciseAmount}
      />
      <Text h4 style={styles.textStyle}>
        {exerciseAmount} minutes
      </Text>
    </View>
  );
}
