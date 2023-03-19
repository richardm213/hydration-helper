import {StyleSheet, View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import GraphLegend from './GraphLegend';
import GRAPH from './GRAPH';

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
        height={GRAPH.height}
        initialSpacing={GRAPH.initialSpacing}
        labelWidth={GRAPH.labelWidth}
        maxValue={maxValue}
        noOfSections={GRAPH.noOfSections}
        spacing={GRAPH.spacing}
        xAxisLabelTextStyle={styles.xAxisLegendStyle}
        xAxisThickness={GRAPH.xAxisThickness}
        yAxisTextStyle={styles.yAxisTextStyle}
        yAxisThickness={GRAPH.yAxisThickness}
      />
    </View>
  );
}
