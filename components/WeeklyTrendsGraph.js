import {StyleSheet} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';

const styles = StyleSheet.create({
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
    <BarChart
      data={data}
      spacing={27}
      barWidth={20}
      xAxisThickness={1}
      yAxisThickness={1}
      yAxisTextStyle={styles.yAxisTextStyle}
      labelsExtraHeight={15}
      noOfSections={7}
      maxValue={maxValue}
      labelWidth={85}
      height={380}
      xAxisLabelTextStyle={styles.xAxisLegendStyle}
    />
  );
}
