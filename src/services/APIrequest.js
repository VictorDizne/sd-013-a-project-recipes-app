export const foodAPIRequest = async (param = '') => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${param}`;
  const { meals } = await fetch(url).then((result) => result.json());
  return meals;
};

export const cocktailsAPIRequest = async (param = '') => {
  const url2 = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${param}`;
  const { drinks } = await fetch(url2).then((result) => result.json());
  return drinks;
};
