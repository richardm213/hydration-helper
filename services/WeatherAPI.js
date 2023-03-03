import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
// eslint-disable-next-line import/no-unresolved
import {WEATHER_API_KEY} from '@env';

export default class WeatherAPI {
  constructor() {
    this.temperature = 0;
  }

  getTemperature(f) {
    return Geolocation.getCurrentPosition(async val => {
      const {longitude, latitude} = val.coords;
      const exclude = 'current,minutely,hourly,alerts';
      const units = 'imperial';
      const apiKey = WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=${exclude}&units=${units}&appid=${apiKey}`;
      const obj = JSON.parse((await axios.get(url)).request._response);
      const todaysWeather = obj.daily[0];
      this.temperature = todaysWeather.temp.max;
      f(this.temperature);
    });
  }
}
