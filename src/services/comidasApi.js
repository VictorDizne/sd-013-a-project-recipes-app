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
  console.log(json);
  return json.meals;
}