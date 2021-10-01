const LENGTH = 12;
const RECOMENDATIONS_LIMIT = 6;

const ALL_FOODS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const ALL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const FOODS_BY_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const DRINKS_BY_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

const RANDOM_FOOD = 'https://www.themealdb.com/api/json/v1/1/random.php';

const RANDOM_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

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

export const fetchRandomFoodRecipe = async () => {
  const response = await fetch(RANDOM_FOOD);
  const result = await response.json();
  return result.meals[0].idMeal;
};

export const fetchRandomDrinkRecipe = async () => {
  const response = await fetch(RANDOM_DRINK);
  const result = await response.json();
  return result.drinks[0].idDrink;
};

export const fetchFoodDetails = async (id, setFoodRecipeDetails) => {
  const END_POINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(END_POINT);
  const result = await response.json();
  setFoodRecipeDetails(result.meals[0]);
};

export const fetchDrinkDetails = async (id, setDrinkRecipeDetails) => {
  const END_POINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(END_POINT);
  const result = await response.json();
  setDrinkRecipeDetails(result.drinks[0]);
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const fetchFoodRecomendations = async (setRecomended) => {
  const END_POINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(END_POINT);
  const results = await response.json();
  setRecomended(shuffleArray(results.drinks).slice(0, RECOMENDATIONS_LIMIT));
};

export const fetchDrinkRecomendations = async (setRecomended) => {
  const END_POINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(END_POINT);
  const results = await response.json();
  setRecomended(shuffleArray(results.meals).slice(0, RECOMENDATIONS_LIMIT));
};
