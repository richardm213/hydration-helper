import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AccordionList} from 'react-native-accordion-list-view';
import {BarChart} from 'react-native-gifted-charts';
import getCurrentDate from '../util/getCurrentDate';
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
  xAxisLegendStyle: {
    fontSize: 12,
    marginBottom: -25,
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
  const [dataBars, setDataBars] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setDataBars([]);
      let days = [];
      for (let i = 1; i <= 7; i += 1) {
        days.push(AsyncStorage.getItem(`@${getCurrentDate(7 - i)}`));
      }
      days = await Promise.all(days);
      for (let i = 0; i < 7; i += 1) {
        const d = getCurrentDate(6 - i);
        const day = days[i];
        if (day) {
          const dailyEntry = JSON.parse(day);
          const recommendationBar = {
            label: d,
            value: dailyEntry.recommendation,
            spacing: 2,
            frontColor: COLORS.primary,
          };
          const intakeBar = {
            value: dailyEntry.intake,
            frontColor: COLORS.lighterBlue,
          };
          setDataBars(prev => [...prev, recommendationBar, intakeBar]);
        }
      }
      setDataBars(prev => [...prev, {value: 0}]);
    };
    fetchData();
  }, []);
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
      <View>
        <BarChart
          data={dataBars}
          spacing={27}
          barWidth={7}
          xAxisThickness={1}
          labelsExtraHeight={15}
          rotateLabel={1}
          yAxisThickness={1}
          yAxisTextStyle={{color: COLORS.primary}}
          noOfSections={7}
          maxValue={125}
          labelWidth={85}
          xAxisLabelTextStyle={styles.xAxisLegendStyle}
        />
      </View>
      <AccordionList
        marginTop={55}
        data={data}
        customTitle={item => listTitle(item)}
        customBody={item => listAttribute(item)}
      />
    </View>
  );
}
