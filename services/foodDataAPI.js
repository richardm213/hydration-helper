import axios from 'axios';

const fileHeaders = {
  'X-Api-Key': '66ANpnWvTZ80i7fmab4ZCIBtHtd1gDceAauJws23',
  'Content-Type': 'application/json',
};

export const getFoodItemData = async foodName => {
  try {
    const response = await axios.get(
      `https://api.nal.usda.gov/fdc/v1/food/${foodName}`,
      {
        headers: fileHeaders,
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getFoodItemDataWater = async fdcId => {
  try {
    const response = await axios.get(
      `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?nutrients=255`,
      {
        headers: fileHeaders,
      },
    );
    console.log(response.data.foodNutrients[0].amount);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getFoodsList = async () => {
  try {
    const response = await axios.get('https://api.example.com/foods/list', {
      headers: fileHeaders,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
