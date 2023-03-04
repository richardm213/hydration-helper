import {StyleSheet, Text, View} from 'react-native';
import {AccordionList} from 'react-native-accordion-list-view';

const styles = StyleSheet.create({});

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
      <AccordionList
        data={data}
        customTitle={item => listTitle(item)}
        customBody={item => listAttribute(item)}
      />
    </View>
  );
}
