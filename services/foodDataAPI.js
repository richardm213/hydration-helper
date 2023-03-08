import axios from 'axios';

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
  'X-Api-Key': 'YOUR_API_KEY',
  'Content-Type': 'application/json',
};

export const getFoodItemData = async foodName => {
  try {
    const foodID = fdcIds[foodName];
    const response = await axios.get(
      `https://api.nal.usda.gov/fdc/v1/food/${foodID}`,
      {
        headers: fileHeaders,
      },
    );
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
