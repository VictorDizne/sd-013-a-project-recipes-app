export async function fetchFoodByIngredients(ingredient) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const json = await response.json();
  return json.meals;
}

export async function fetchFoodByName(name) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const json = await response.json();
  return json.meals;
}

export async function fetchFoodByLetter(letter) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const json = await response.json();
  return json.meals;
}

export async function fetchFoodOnLoad() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const json = await response.json();
  return json.meals;
}

export async function fetchFoodCategories() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const json = await response.json();
  return json.meals;
}

export async function fetchFoodByCategories(category) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const json = await res.json();
  return json.meals;
}

export function fetchFoodById(id) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((results) => results.json()
      .then((data) => (results
        .ok ? Promise.resolve(data.meals) : Promise.reject(data.meals))));
}

export async function fetchRecommendedMeals() {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const json = await res.json();
  return json.meals;
}

export async function fetchRandomMeal() {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const json = await res.json();
  return json.meals;
}

export async function fetchAllFoodIngredients() {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const json = await res.json();
  return json.meals;
}

export async function fetchAreas() {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const json = await res.json();
  return json.meals;
}

export async function fetchFoodsByArea(area) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  const json = await res.json();
  return json.meals;
}
