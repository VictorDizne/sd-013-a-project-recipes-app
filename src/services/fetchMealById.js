const URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const fetchMealById = async (recipeId) => {
  try {
    const response = await fetch(`${URL}${recipeId}`);
    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.error(error);
  }
};

export default fetchMealById;
