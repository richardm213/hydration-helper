import {StyleSheet, View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import GraphLegend from './GraphLegend';

const styles = StyleSheet.create({
  container: {paddingHorizontal: 20},
  xAxisLegendStyle: {
    fontSize: 15,
    marginBottom: -5,
    marginLeft: 12.5,
  },
  yAxisTextStyle: {
    fontSize: 15,
  },
});

export default function WeeklyTrendsGraph({data, maxValue}) {
  return (
    <View style={styles.container}>
      <GraphLegend />
      <BarChart
        barWidth={20}
        data={data}
        height={380}
        initialSpacing={25}
        labelsExtraHeight={15}
        labelWidth={85}
        maxValue={maxValue}
        noOfSections={7}
        spacing={27}
        xAxisLabelTextStyle={styles.xAxisLegendStyle}
        xAxisThickness={1}
        yAxisTextStyle={styles.yAxisTextStyle}
        yAxisThickness={1}
      />
    </View>
  );
}
