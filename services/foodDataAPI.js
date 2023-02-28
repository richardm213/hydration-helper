import axios from 'axios';

const fileHeaders = {
  'X-Api-Key': 'YOUR_API_KEY',
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
