import axios from 'axios';
import {FOOD_DATA_API_KEY} from '@env';

const fdcIds = {
  Water: 174158,
  'Apple Juice': 2003590,
  'Orange Juice': 2003591,
  Coffee: 171891,
  Tea: 171917,
  Soda: 174852,
  Lemonade: 171878,
  Milk: 746782,
};

const fileHeaders = {
  'X-Api-Key': FOOD_DATA_API_KEY,
  'Content-Type': 'application/json',
};

export const getWaterRank = async foodName => {
  try {
    const fdcId = fdcIds[foodName];
    const url = `https://api.nal.usda.gov/fdc/v1/food/${fdcId}`;
    const params = {nutrients: '255'}; // Include nutrient ID for water only
    const response = await axios.get(url, {
      headers: fileHeaders,
      params,
    });
    const waterNutrient = response.data.foodNutrients.find(
      nutrient => nutrient.nutrient.number === '255',
    );
    const waterRank = waterNutrient ? waterNutrient.nutrient.rank : null;
    return waterRank;
  } catch (error) {
    console.error(error);
    return null;
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
