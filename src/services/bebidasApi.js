export async function fetchDrinkByIngredients(ingredient) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const json = await response.json();
  return json.drinks;
}

export async function fetchDrinkByName(name) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const json = await response.json();
  return json.drinks;
}

export async function fetchDrinkByLetter(letter) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  const json = await response.json();
  return json.drinks;
}

export async function fetchDrinkOnLoad() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const json = await response.json();
  console.log(json);
  return json.drinks;
}

export async function fetchDrinkCategories() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const json = await response.json();
  return json.drinks;
}

export async function fetchDrinkByCategories(category) {
  const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const json = await res.json();
  return json.drinks;
}
