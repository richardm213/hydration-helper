import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import {FOOD_DATA_API_KEY} from '@env';

export const DRINKS = {
  water: 174158,
  appleJuice: 2003590,
  orangeJuice: 2003591,
  coffee: 171891,
  tea: 171917,
  soda: 174852,
  lemonade: 171878,
  milk: 746782,
  sparklingWater: 174827,
  cranberryJuice: 2003594,
  mocha: 174119,
  latte: 171880,
  rootBeer: 171871,
  coconutWater: 174831,
  boba: 2346078,
  carrotJuice: 170491,
};

const fileHeaders = {
  'X-Api-Key': FOOD_DATA_API_KEY,
  'Content-Type': 'application/json',
};

export const getWaterRank = async foodName => {
  try {
    const fdcId = DRINKS[foodName];
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
    return null;
  }
};
