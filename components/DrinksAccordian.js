import {Text} from '@rneui/base';
import {useCallback} from 'react';
import {View} from 'react-native';
import {AccordionList} from 'react-native-accordion-list-view';

export default function DrinksAccordian({data, unit}) {
  const listTitle = useCallback(item => <Text>{item.date}</Text>, []);
  const listAttribute = useCallback(
    item => (
      <View>
        <Text>
          Recommendation: {item.goal} {unit === 'us-system' ? 'oz' : 'ml'}
        </Text>
        <Text>
          Water intake: {item.intake} {unit === 'us-system' ? 'oz' : 'ml'}
        </Text>
        <Text>Exercise: {item.exercise} minutes</Text>
      </View>
    ),
    [],
  );

  return (
    <AccordionList
      marginTop={55}
      data={data}
      customTitle={item => listTitle(item)}
      customBody={item => listAttribute(item)}
    />
  );
}
