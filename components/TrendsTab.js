import AsyncStorage from '@react-native-async-storage/async-storage';
import {Tab, Text} from '@rneui/base';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {AccordionList} from 'react-native-accordion-list-view';
import {BarChart} from 'react-native-gifted-charts';
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
  textLegend: {
    color: COLORS.primary,
    fontSize: 15,
    height: 25,
  },
  viewModeTab: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 120,
    alignSelf: 'center',
  },
  viewModeTitle: {
    color: COLORS.primary,
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
  const [viewMode, setViewMode] = useState(0);

  return (
    <View style={styles.container}>
      {viewMode == 0 && (
        <View style={styles.barChart}>
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
      )}

      {viewMode == 1 && (
        <View>
          <AccordionList
            marginTop={55}
            data={data}
            customTitle={item => listTitle(item)}
            customBody={item => listAttribute(item)}
          />
        </View>
      )}

      <View style={styles.viewModeTab}>
        <Tab
          value={viewMode}
          onChange={setViewMode}
          titleStyle={styles.viewModeTitle}
          scrollable>
          <Tab.Item
            containerStyle={active => ({
              backgroundColor: active ? COLORS.iceBlue : undefined,
            })}>
            Graph
          </Tab.Item>
          <Tab.Item
            buttonStyle={active => ({
              backgroundColor: active ? COLORS.iceBlue : undefined,
            })}>
            Drinks
          </Tab.Item>
        </Tab>
      </View>
    </View>
  );
}
