const fetchAPI = async (chooseUrl, query) => {
  const verifyUrl = {
    fetchMealByIngredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`,

    fetchMealByName: `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,

    fetchMealByFirstLetter: `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`,

    fetchCocktailByIngredient: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`,

    fetchCocktailByName: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`,

    fetchCocktailByFirstLetter: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${query}`,
  };

  if (query.length !== 1
    && (chooseUrl === 'fetchMealByFirstLetter'
    || chooseUrl === 'fetchCocktailByFirstLetter')) {
    global.alert('Sua busca deve conter somente 1 (um) caracter');
  }
  const response = await fetch(
    verifyUrl[chooseUrl],
  );
  const data = await response.json();
  return data;
};

export default fetchAPI;

// const fetchByIngredient = async (recipeType, query) => {
//   const response = await fetch(
//     `https://www.the${recipeType}db.com/api/json/v1/1/filter.php?i=${query}`,
//   );
//   const data = await response.json();
//   return data;
// };

// const fetchByName = async (recipeType, query) => {
//   const response = await fetch(
//     `https://www.the${recipeType}db.com/api/json/v1/1/search.php?s=${query}`,
//   );
//   const data = await response.json();
//   return data;
// };

// const fetchByFirstLetter = async (recipeType, query) => {
//   if (query.length === 1) {
//     const response = await fetch(
//       `https://www.the${recipeType}db.com/api/json/v1/1/search.php?f=${query}`,
//     );
//     const data = await response.json();
//     return data;
//   }
//   global.alert('Sua busca deve conter somente 1 (um) caracter');
// };
