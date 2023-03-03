import {NavigationContainer} from '@react-navigation/native';
import Tabs from './components/Tabs';
import NotificationSystem from './components/NotificationSystem';

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
      <NotificationSystem />
    </NavigationContainer>
  );
}
