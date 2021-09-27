const fetchDrinksFilterCategories = async (category) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.error(error);
  }
};

export default fetchDrinksFilterCategories;
