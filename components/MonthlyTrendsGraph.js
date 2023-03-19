import {StyleSheet, View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import GraphLegend from './GraphLegend';

const styles = StyleSheet.create({
  container: {paddingHorizontal: 20},
  xAxisLegendStyle: {
    marginLeft: 10,
  },
  yAxisTextStyle: {
    fontSize: 15,
  },
});

export default function MonthlyTrendsGraph({data, maxValue}) {
  return (
    <View style={styles.container}>
      <GraphLegend />
      <BarChart
        autoShiftLabels
        barWidth={15}
        data={data}
        height={380}
        initialSpacing={25}
        labelWidth={85}
        maxValue={maxValue}
        noOfSections={7}
        spacing={26}
        xAxisLabelTextStyle={styles.xAxisLegendStyle}
        xAxisThickness={1}
        yAxisTextStyle={styles.yAxisTextStyle}
        yAxisThickness={1}
      />
    </View>
  );
}
