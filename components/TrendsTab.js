import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from '@rneui/base';
import {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {AccordionList} from 'react-native-accordion-list-view';
import {BarChart} from 'react-native-gifted-charts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getCurrentDate, getDayOfWeek} from '../util/getCurrentDate';
import COLORS from './Colors';

const styles = StyleSheet.create({
  align: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  barChart: {paddingHorizontal: 20},
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  leftDot: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    height: 15,
    marginBottom: 6,
    marginRight: 8,
    width: 15,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 25,
    marginTop: 25,
  },
  rightDot: {
    backgroundColor: COLORS.lighterBlue,
    borderRadius: 15,
    height: 15,
    marginBottom: 6,
    marginRight: 8,
    width: 15,
  },
  scrollView: {marginBottom: 65},
  textLegend: {
    color: COLORS.primary,
    fontSize: 15,
    height: 25,
  },
  xAxisLegendStyle: {
    fontSize: 15,
    marginBottom: -5,
  },
  yAxisTextStyle: {
    fontSize: 15,
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
        const day = days[i];
        if (day) {
          const dailyEntry = JSON.parse(day);
          const recommendationBar = {
            label: getDayOfWeek(6 - i),
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
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <ScrollView style={styles.scrollView}>
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
        <View style={styles.barChart}>
          <BarChart
            data={dataBars}
            spacing={27}
            barWidth={20}
            xAxisThickness={1}
            labelsExtraHeight={15}
            yAxisThickness={1}
            yAxisTextStyle={styles.yAxisTextStyle}
            noOfSections={7}
            maxValue={125}
            labelWidth={85}
            height={400}
            xAxisLabelTextStyle={styles.xAxisLegendStyle}
          />
        </View>

        <AccordionList
          marginTop={55}
          data={data}
          customTitle={item => listTitle(item)}
          customBody={item => listAttribute(item)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
