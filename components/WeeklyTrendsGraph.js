import {StyleSheet, View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import GraphLegend from './GraphLegend';
import GRAPH from './GRAPH';

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
        height={GRAPH.height}
        initialSpacing={GRAPH.initialSpacing}
        labelsExtraHeight={15}
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
