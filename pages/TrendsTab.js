import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Text} from '@rneui/base';
import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {AccordionList} from 'react-native-accordion-list-view';
import {BarChart} from 'react-native-gifted-charts';
import {getCurrentDate, getDayOfMonth, getDayOfWeek} from '../utils/DateUtils';
import COLORS from '../theme/Colors';
import {Tab} from '@rneui/themed';

const styles = StyleSheet.create({
  align: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  barChart: {paddingHorizontal: 20},
  cardStyle: {flexDirection: 'row', justifyContent: 'space-between'},
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  graphModeTab: {
    marginTop: 7.5,
    marginBottom: -5,
    alignSelf: 'center',
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
  scoresHeader: {textAlign: 'center', color: COLORS.primary, marginTop: 15},
  viewModeTab: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 115,
    alignSelf: 'center',
  },
  viewModeTitle: {
    color: COLORS.primary,
    fontSize: 16,
    marginVertical: -2.5,
  },
  xAxisLegendStyle: {
    fontSize: 15,
    marginLeft: 12.5,
    marginBottom: -5,
  },
  xAxisLegendStyle2: {
    marginLeft: 10,
  },
  yAxisTextStyle: {
    fontSize: 15,
  },
});

const BARCHART = {
  spacing: 2,
  yAxisThickness: 1,
  xAxisThickness: 1,
};

const VIEWMODE = {
  graph: 0,
  drinks: 1,
  scores: 2,
};

const GRAPHMODE = {
  weekly: 0,
  monthly: 1,
};

const buttonStyle = active => {
  return {
    backgroundColor: active ? COLORS.iceBlue : COLORS.white,
  };
};

const listTitle = item => {
  return <Text>{item.date}</Text>;
};

const listAttribute = (item, unit) => {
  return (
    <View>
      <Text>
        Recommendation: {item.goal} {unit === 'us-system' ? 'oz' : 'ml'}
      </Text>
      <Text>
        Water intake: {item.intake} {unit === 'us-system' ? 'oz' : 'ml'}
      </Text>
      <Text>Exercise: {item.exercise} minutes</Text>
    </View>
  );
};

export default function TrendsTab({recommendation, intake, unit, newDay}) {
  const [dataBarsWeek, setDataBarsWeek] = useState([]);
  const [dataBarsMonth, setDataBarsMonth] = useState([]);
  const [weeklyMax, setWeeklyMax] = useState(125);
  const [monthlyMax, setMonthlyMax] = useState(125);
  const [accordianData, setAccordianData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // fetch data for week chart
      const newDataBarsWeek = [];
      const newAccordianData = [];
      let days = [];
      for (let i = 1; i <= 7; i += 1) {
        days.push(AsyncStorage.getItem(`@${getCurrentDate(7 - i)}`));
      }
      days = await Promise.all(days);
      let maxVal = -1;
      for (let i = 0; i < 6; i += 1) {
        const day = days[i];
        if (day) {
          const dailyEntry = JSON.parse(day);
          maxVal = Math.max(maxVal, dailyEntry.recommendation);
          maxVal = Math.max(maxVal, dailyEntry.intake);
          const recommendationBar = {
            label: getDayOfWeek(6 - i),
            value: dailyEntry.recommendation,
            spacing: BARCHART.spacing,
            frontColor: COLORS.primary,
          };
          const intakeBar = {
            value: dailyEntry.intake,
            frontColor: COLORS.lighterBlue,
          };
          newDataBarsWeek.push(recommendationBar, intakeBar);
          const accordianEntry = {
            date: getCurrentDate(6 - i),
            goal: dailyEntry.recommendation,
            intake: dailyEntry.intake,
            exercise: dailyEntry.exercise,
          };
          newAccordianData.push(accordianEntry);
        }
      }
      const todayRecommendationBar = {
        label: getDayOfWeek(0),
        value: recommendation,
        spacing: BARCHART.spacing,
        frontColor: COLORS.primary,
      };
      const todayIntakeBar = {
        value: intake,
        frontColor: COLORS.lighterBlue,
      };
      setWeeklyMax(maxVal);
      newDataBarsWeek.push(todayRecommendationBar, todayIntakeBar);
      setDataBarsWeek(newDataBarsWeek);
      setAccordianData(newAccordianData);

      // fetch data for month chart
      let maxVal2 = -1;
      const newDataBarsMonth = [];
      let daysMonth = [];
      for (let i = 1; i <= 30; i += 1) {
        daysMonth.push(AsyncStorage.getItem(`@${getCurrentDate(30 - i)}`));
      }
      daysMonth = await Promise.all(daysMonth);
      for (let i = 0; i < 30; i += 1) {
        const day = daysMonth[i];
        if (day) {
          const dailyEntry = JSON.parse(day);
          maxVal2 = Math.max(maxVal, dailyEntry.recommendation);
          maxVal2 = Math.max(maxVal, dailyEntry.intake);
          const recommendationBar = {
            label: getDayOfMonth(29 - i),
            value: dailyEntry.recommendation,
            spacing: BARCHART.spacing,
            frontColor: COLORS.primary,
          };
          const intakeBar = {
            value: dailyEntry.intake,
            frontColor: COLORS.lighterBlue,
          };
          newDataBarsMonth.push(recommendationBar, intakeBar);
        }
      }
      setMonthlyMax(maxVal2);
      const todayRecommendationBar2 = {
        label: getDayOfMonth(0),
        value: recommendation,
        spacing: BARCHART.spacing,
        frontColor: COLORS.primary,
      };
      newDataBarsMonth.push(todayRecommendationBar2, todayIntakeBar);
      setDataBarsMonth(newDataBarsMonth);
    };
    fetchData();
  }, [intake, newDay]);

  const [dataScores, setDataScores] = useState([]);
  const [performanceScore, setPerformanceScore] = useState(75);
  useEffect(() => {
    const fetchDrinkScores = async () => {
      drinkScores = JSON.parse(await AsyncStorage.getItem('@drinkScores'));
      let temp = [];
      Object.entries(drinkScores).forEach(entry =>
        temp.push({
          name: entry[0],
          score: entry[1],
        }),
      );
      temp.sort((a, b) => b.score - a.score);
      setDataScores(temp);
    };
    const fetchPerformanceScore = async () => {
      let score = await AsyncStorage.getItem('@performanceScore');
      if (!score) {
        score = 75;
        await AsyncStorage.setItem('@performanceScore', score.toString());
      }
      setPerformanceScore(score);
    };
    fetchDrinkScores();
    fetchPerformanceScore();
  }, [newDay]);

  const renderScores = ({item}) => (
    <Card wrapperStyle={styles.cardStyle}>
      <Text>{item.name}</Text>
      <Text>{item.score}</Text>
    </Card>
  );

  const [viewMode, setViewMode] = useState(0);
  const [graphMode, setGraphMode] = useState(0);

  return (
    <View style={styles.container}>
      {viewMode == VIEWMODE.graph && (
        <View style={styles.graphModeTab}>
          <Tab
            value={graphMode}
            onChange={setGraphMode}
            titleStyle={styles.viewModeTitle}
            scrollable>
            <Tab.Item containerStyle={active => buttonStyle(active)}>
              Weekly
            </Tab.Item>
            <Tab.Item containerStyle={active => buttonStyle(active)}>
              Monthly
            </Tab.Item>
          </Tab>
        </View>
      )}

      {viewMode == VIEWMODE.graph && graphMode == GRAPHMODE.weekly && (
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
            data={dataBarsWeek}
            spacing={27}
            barWidth={20}
            xAxisThickness={BARCHART.xAxisThickness}
            yAxisThickness={BARCHART.yAxisThickness}
            yAxisTextStyle={styles.yAxisTextStyle}
            labelsExtraHeight={15}
            noOfSections={7}
            maxValue={weeklyMax}
            labelWidth={85}
            height={380}
            xAxisLabelTextStyle={styles.xAxisLegendStyle}
          />
        </View>
      )}

      {viewMode == VIEWMODE.graph && graphMode == GRAPHMODE.monthly && (
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
            data={dataBarsMonth}
            initialSpacing={25}
            spacing={13}
            barWidth={15}
            xAxisThickness={BARCHART.xAxisThickness}
            yAxisThickness={BARCHART.yAxisThickness}
            yAxisTextStyle={styles.yAxisTextStyle}
            noOfSections={7}
            maxValue={monthlyMax}
            labelWidth={85}
            height={380}
            autoShiftLabels
            xAxisLabelTextStyle={styles.xAxisLegendStyle2}
          />
        </View>
      )}

      {viewMode == VIEWMODE.drinks && (
        <View>
          <AccordionList
            marginTop={55}
            data={accordianData}
            customTitle={item => listTitle(item)}
            customBody={item => listAttribute(item, unit)}
          />
        </View>
      )}

      {viewMode == VIEWMODE.scores && (
        <View>
          <Text style={styles.scoresHeader} h4>
            User Performance Score
          </Text>
          <Card wrapperStyle={styles.cardStyle}>
            <Text>Performance score</Text>
            <Text>{performanceScore}</Text>
          </Card>
          <Text style={styles.scoresHeader} h4>
            Drink Tendency Scores
          </Text>
          <FlatList
            data={dataScores}
            renderItem={renderScores}
            keyExtractor={item => item.name}
          />
        </View>
      )}

      <View style={styles.viewModeTab}>
        <Tab
          value={viewMode}
          onChange={setViewMode}
          titleStyle={styles.viewModeTitle}
          scrollable>
          <Tab.Item containerStyle={active => buttonStyle(active)}>
            Graph
          </Tab.Item>
          <Tab.Item buttonStyle={active => buttonStyle(active)}>
            Drinks
          </Tab.Item>
          <Tab.Item buttonStyle={active => buttonStyle(active)}>
            Scores
          </Tab.Item>
        </Tab>
      </View>
    </View>
  );
}
