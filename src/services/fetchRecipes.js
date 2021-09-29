const LENGTH = 12;

const ALL_FOODS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const ALL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const FOODS_BY_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const DRINKS_BY_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

export async function fetchAllFoodRecipes(setFoodRecipes) {
  const response = await fetch(ALL_FOODS);
  const result = await response.json();
  setFoodRecipes(result.meals.slice(0, LENGTH));
}

export async function fetchAllDrinkRecipes(setDrinkRecipes) {
  const response = await fetch(ALL_DRINKS);
  const result = await response.json();
  setDrinkRecipes(result.drinks.slice(0, LENGTH));
}

export async function fetchFoodRecipesByCategory(category, setFoodRecipes) {
  const response = await fetch(`${FOODS_BY_CATEGORY}${category}`);
  const result = await response.json();
  setFoodRecipes(result.meals.slice(0, LENGTH));
}

export async function fetchDrinkRecipesByCategory(category, setDrinkRecipes) {
  const response = await fetch(`${DRINKS_BY_CATEGORY}${category}`);
  const result = await response.json();
  setDrinkRecipes(result.drinks.slice(0, LENGTH));
}
