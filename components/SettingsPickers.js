import {Picker} from '@react-native-picker/picker';

const ageList = Array.from(new Array(95), (x, i) => `${i + 5}`);
const heightList = Array.from(new Array(215), (x, i) => `${i + 35}`);
const weightList = Array.from(new Array(300), (x, i) => `${i + 50}`);

const agePicker = (age, updateAge) => (
  <Picker selectedValue={age} onValueChange={updateAge}>
    {ageList.map(item => (
      <Picker.Item key={item} label={item} value={item} />
    ))}
  </Picker>
);

const heightPicker = (height, updateHeight) => (
  <Picker selectedValue={height} onValueChange={updateHeight}>
    {heightList.map(item => (
      <Picker.Item key={item} label={item} value={item} />
    ))}
  </Picker>
);

const weightPicker = (weight, updateWeight) => (
  <Picker selectedValue={weight} onValueChange={updateWeight}>
    {weightList.map(item => (
      <Picker.Item key={item} label={item} value={item} />
    ))}
  </Picker>
);

const genderPicker = (gender, updateGender) => (
  <Picker selectedValue={gender} onValueChange={updateGender}>
    <Picker.Item label="male" value="male" />
    <Picker.Item label="female" value="female" />
  </Picker>
);

const unitPicker = (unit, updateUnit) => (
  <Picker selectedValue={unit} onValueChange={updateUnit}>
    <Picker.Item label="metric" value="metric" />
    <Picker.Item label="US system" value="us-system" />
  </Picker>
);

export {agePicker, genderPicker, heightPicker, weightPicker, unitPicker};
