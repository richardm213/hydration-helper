import {dailyForecast, getLocation} from 'react-native-weather-api';

async function getTemperature() {
  getLocation().then(location => {
    dailyForecast({
      key: '528778267c4021a81e2fb0d873c69b16',
      unit: 'metric',
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    }).then(data => data.daily[0].temp.max);
  });
}
// NOTE: added under app.json:
// "infoPlist": {
//    "NSLocationWhenInUseUsageDescription": "Please enable location services so that the app can use your local weather data in its calculations."
// }
// may need to change permissiosn to be for when app is in background as well
export default getTemperature;
