import {Card, Text} from '@rneui/base';
import {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import COLORS from '../theme/Colors';

const styles = StyleSheet.create({
  cardStyle: {flexDirection: 'row', justifyContent: 'space-between'},
  scoresHeader: {color: COLORS.primary, marginTop: 15, textAlign: 'center'},
});

export default function ScoresList({performanceScore, drinkScores}) {
  const renderScores = useCallback(
    ({item}) => (
      <Card wrapperStyle={styles.cardStyle}>
        <Text>{item.name}</Text>
        <Text>{item.score}</Text>
      </Card>
    ),
    [],
  );

  return (
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
        data={drinkScores}
        renderItem={renderScores}
        keyExtractor={item => item.name}
      />
    </View>
  );
}
