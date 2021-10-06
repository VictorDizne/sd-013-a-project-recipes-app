export const DRINKS_OPTIONS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const MEALS_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
export const DRINKS_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
export const MEAL_BY_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
export const DRINK_BY_CATEGORIY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

export async function searchFood() {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.meals;
}
