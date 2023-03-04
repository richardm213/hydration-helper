import {StyleSheet, Text, View} from 'react-native';
import {AccordionList} from 'react-native-accordion-list-view';
import {BarChart} from 'react-native-gifted-charts';
import COLORS from './Colors';

const styles = StyleSheet.create({
  align: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  leftDot: {
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    height: 7,
    marginRight: 8,
    width: 7,
  },
  legend: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 25,
    marginTop: 25,
  },
  rightDot: {
    backgroundColor: COLORS.lighterBlue,
    borderRadius: 6,
    height: 7,
    marginRight: 8,
    width: 7,
  },
  textLegend: {
    color: COLORS.primary,
    height: 25,
  },
});

const data = [
  {
    date: '3-2-2023',
    rec: 57,
    intake: 23,
    exercise: 30,
    calorie_intake: 1222,
    rec_drink: 'orange juice',
  },
  {
    date: '3-3-2023',
    rec: 69,
    intake: 37,
    exercise: 75,
    calorie_intake: 757,
    rec_drink: 'coffee',
  },
  {
    date: '3-4-2023',
    rec: 69,
    intake: 37,
    exercise: 75,
    calorie_intake: 757,
    rec_drink: 'orange juice',
  },
  {
    date: '3-5-2023',
    rec: 69,
    intake: 37,
    exercise: 75,
    calorie_intake: 757,
    rec_drink: 'apple juice',
  },
  {
    date: '3-6-2023',
    rec: 69,
    intake: 37,
    exercise: 75,
    calorie_intake: 757,
    rec_drink: 'sparkling water',
  },
  {
    date: '3-7-2023',
    rec: 69,
    intake: 37,
    exercise: 75,
    calorie_intake: 757,
    rec_drink: 'smoothie',
  },
];

const dataBars = [
  {
    label: '3-2-2023',
    value: 57,
    spacing: 2,
    frontColor: COLORS.primary,
  },
  {value: 37, frontColor: COLORS.lighterBlue},
  {
    label: '3-3-2023',
    value: 69,
    spacing: 2,
    frontColor: COLORS.primary,
  },
  {value: 57, frontColor: COLORS.lighterBlue},
  {
    label: '3-4-2023',
    value: 85,
    spacing: 2,
    frontColor: COLORS.primary,
  },
  {value: 59, frontColor: COLORS.lighterBlue},
  {
    label: '3-5-2023',
    value: 73,
    spacing: 2,
    frontColor: COLORS.primary,
  },
  {value: 37, frontColor: COLORS.lighterBlue},
  {
    label: '3-6-2023',
    value: 111,
    spacing: 2,
    frontColor: COLORS.primary,
  },
  {value: 67, frontColor: COLORS.lighterBlue},
  {
    label: '3-7-2023',
    value: 97,
    spacing: 2,
    frontColor: COLORS.primary,
  },
  {value: 77, frontColor: COLORS.lighterBlue},
];

function listTitle(props) {
  return <Text>{props.date}</Text>;
}
function listAttribute(props) {
  return (
    <View>
      <Text>
        Recommended water intake: {props.intake}
        {props.unit === 'us-system' ? 'oz' : 'ml'}
      </Text>
      <Text>Recommended drink: {props.rec_drink}</Text>
      <Text>
        Water intake: {props.intake} {props.unit === 'us-system' ? 'oz' : 'ml'}
      </Text>
      <Text>Exercise: {props.exercise} minutes</Text>
      <Text>Calorie intake: {props.calorie_intake} cals</Text>
    </View>
  );
}

export default function TrendsTab() {
  return (
    <View style={styles.container}>
      <View>
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
      </View>
      <View styles={{marginBottom: 93}}>
        <BarChart
          data={dataBars}
          spacing={27}
          barWidth={7}
          xAxisThickness={1}
          labelsExtraHeight={-2}
          rotateLabel={5}
          yAxisThickness={1}
          yAxisTextStyle={{color: COLORS.primary}}
          noOfSections={7}
          maxValue={120}
          labelWidth={55}
        />
      </View>
      <AccordionList
        data={data}
        customTitle={item => listTitle(item)}
        customBody={item => listAttribute(item)}
      />
    </View>
  );
}
