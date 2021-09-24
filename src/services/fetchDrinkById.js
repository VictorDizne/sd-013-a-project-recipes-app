const URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const fetchDrinkById = async (recipeId) => {
  try {
    const response = await fetch(`${URL}${recipeId}`);
    const data = await response.json();
    return data.drinks[0];
  } catch (error) {
    console.error(error);
  }
};

export default fetchDrinkById;
