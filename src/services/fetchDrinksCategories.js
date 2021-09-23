const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const fetchDrinksCategories = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.error(error);
  }
};

export default fetchDrinksCategories;
