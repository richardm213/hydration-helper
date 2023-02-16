import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
  Text, View, StyleSheet,
  SafeAreaView,
  Alert,
  Image
} from 'react-native';
import { Button, Icon, Input, Header } from 'react-native-elements';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';
const white = '#fff';


const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#DEFBFF',
  },
  center: {
    flex: 5,
    backgroundColor: 'white',

  },
  footer: {
    flex: 1,
    backgroundColor: '#DEFBFF',

  },
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      </View>

      <View style={styles.center}>
      </View>

      <View style={styles.footer}>
        <NavigationContainer>
        </NavigationContainer>
      </View>

    </SafeAreaView>
  );
}
