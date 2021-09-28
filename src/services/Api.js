export async function getMealById(id) {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(endPoint).then((data) => data.json());
  return response.meals;
}

export async function getDrinkById(id) {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(endPoint).then((data) => data.json());
  return response.drinks;
}

export async function getDrinks(category = 'All') {
  let endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  if (category !== 'All') {
    endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  }
  const response = await fetch(endPoint).then((data) => data.json());
  return response.drinks;
}

export async function getMeals(category = 'All') {
  let endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  if (category !== 'All') {
    endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  }

  const response = await fetch(endPoint).then((data) => data.json());
  return response.meals;
}

export async function getCategories(type) {
  let search = '';
  if (type === 'meals') search = 'meal';
  if (type === 'drinks') search = 'cocktail';
  const endPoint = `https://www.the${search}db.com/api/json/v1/1/list.php?c=list`;
  const response = await fetch(endPoint).then((data) => data.json());
  return response[type];
}

export function getRecomendationsMeals() {
  return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((result) => result.json())
    .then((resolve) => resolve.meals);
}

export function getRecomendationsDrinks() {
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((result) => result.json())
    .then((resolve) => resolve.drinks);
}
