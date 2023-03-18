import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Tab} from '@rneui/themed';
import COLORS from '../theme/Colors';
import Style from '../theme/Style';
import WeeklyTrendsGraph from '../components/WeeklyTrendsGraph';
import MonthlyTrendsGraph from '../components/MonthlyTrendsGraph';
import DrinksAccordian from '../components/DrinksAccordian';
import ScoresList from '../components/ScoresList';
import useGraphData from '../hooks/useGraphData';

const styles = StyleSheet.create({
  graphModeTab: {
    alignSelf: 'center',
    marginBottom: -5,
    marginTop: 7.5,
  },
  viewModeTab: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 115,
  },
  viewModeTitle: {
    color: COLORS.primary,
    fontSize: 16,
    marginVertical: -2.5,
  },
});

const VIEWMODE = {
  graph: 0,
  drinks: 1,
  scores: 2,
};

const GRAPHMODE = {
  weekly: 0,
  monthly: 1,
};

const buttonStyle = active => ({
  backgroundColor: active ? COLORS.iceBlue : COLORS.white,
});

export default function TrendsTab({recommendation, intake, unit, newDay}) {
  const [dataBarsWeek, setDataBarsWeek] = useState([]);
  const [dataBarsMonth, setDataBarsMonth] = useState([]);
  const [weeklyMax, setWeeklyMax] = useState(125);
  const [monthlyMax, setMonthlyMax] = useState(125);
  const [accordianData, setAccordianData] = useState([]);
  const [dataScores, setDataScores] = useState([]);
  const [performanceScore, setPerformanceScore] = useState(75);

  useGraphData(
    recommendation,
    intake,
    setWeeklyMax,
    setDataBarsWeek,
    setAccordianData,
    setMonthlyMax,
    setDataBarsMonth,
    newDay,
  );
  useEffect(() => {
    const fetchDrinkScores = async () => {
      const drinkScores = JSON.parse(
        await AsyncStorage.getItem('@drinkScores'),
      );
      const temp = [];
      Object.entries(drinkScores).forEach(entry =>
        temp.push({
          name: entry[0],
          score: entry[1],
        }),
      );
      temp.sort((a, b) => b.score - a.score);
      setDataScores(temp.slice(0, 6));
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

  const [viewMode, setViewMode] = useState(0);
  const [graphMode, setGraphMode] = useState(0);

  return (
    <View style={Style.container}>
      {viewMode === VIEWMODE.graph && (
        <View style={styles.graphModeTab}>
          <Tab
            value={graphMode}
            onChange={setGraphMode}
            titleStyle={styles.viewModeTitle}
            scrollable>
            <Tab.Item
              title="Weekly"
              containerStyle={active => buttonStyle(active)}
            />
            <Tab.Item
              title="Monthly"
              containerStyle={active => buttonStyle(active)}
            />
          </Tab>
        </View>
      )}

      {viewMode === VIEWMODE.graph && graphMode === GRAPHMODE.weekly && (
        <WeeklyTrendsGraph data={dataBarsWeek} maxValue={weeklyMax} />
      )}

      {viewMode === VIEWMODE.graph && graphMode === GRAPHMODE.monthly && (
        <MonthlyTrendsGraph data={dataBarsMonth} maxValue={monthlyMax} />
      )}

      {viewMode === VIEWMODE.drinks && (
        <DrinksAccordian data={accordianData} unit={unit} />
      )}

      {viewMode === VIEWMODE.scores && (
        <ScoresList
          performanceScore={performanceScore}
          drinkScores={dataScores}
        />
      )}

      <View style={styles.viewModeTab}>
        <Tab
          value={viewMode}
          onChange={setViewMode}
          titleStyle={styles.viewModeTitle}
          scrollable>
          <Tab.Item
            title="Graph"
            containerStyle={active => buttonStyle(active)}
          />
          <Tab.Item
            title="Drinks"
            buttonStyle={active => buttonStyle(active)}
          />
          <Tab.Item
            title="Scores"
            buttonStyle={active => buttonStyle(active)}
          />
        </Tab>
      </View>
    </View>
  );
}
