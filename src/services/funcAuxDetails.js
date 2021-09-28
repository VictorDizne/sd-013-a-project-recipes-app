export const btnContinuar = (id) => {
  if (localStorage.getItem('inProgressRecipes') === null) {
    localStorage.setItem('inProgressRecipes', JSON
      .stringify({ meals: {}, cocktails: {} }));
  }
  const test = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const chaves = Object.keys(test.meals).some((chave) => chave === id);
  return chaves;
};

/* const SIX = 6;
const cocktailsRequest = async () => {
  const drink = await cocktailsAPIRequest();
  const drinkSix = drink.slice(0, SIX);
  return drinkSix;
};
const mealsRequest = async () => {
  const food = await foodAPIRequest();
  const foodSix = food.slice(0, SIX);
  return foodSix;
};
export const recomendation = (tipo) => {
  if (tipo === 'meal') {
    return cocktailsRequest();
  } if (tipo === 'cocktail') {
    return mealsRequest();
  }
};
 */
export const btnFavoritar = (id) => {
  if (localStorage.getItem('favoriteRecipes') === null) {
    localStorage.setItem('favoriteRecipes', JSON
      .stringify([]));
  }
  const testFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const chavesFav = testFav.some((chave) => chave.id === id);
  return chavesFav;
};

export const ingredientMeasures = (obj, tipo) => {
  const keysOfApi = Object.keys(obj);
  if (tipo === 'medida') {
    const measurementKeys = keysOfApi.filter((chave) => chave.includes('strMeasure'))
      .map((measure) => obj[measure])
      .filter((measure) => measure !== ' ' && measure !== null);
    return measurementKeys;
  }
  if (tipo === 'ingredientes') {
    const ingredientsKeys = keysOfApi.filter((chave) => chave.includes('strIngredient'));
    const ingredientsValues = ingredientsKeys
      .map((ingredient) => obj[ingredient])
      .filter((ingredient) => ingredient !== '' && ingredient !== null);
    return ingredientsValues;
  }
};
