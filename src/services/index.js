export async function fetchIngredientFoods(ingredient) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  const { meals } = data;
  return meals;
}

export async function fetchNameFoods(name) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data;
}

export async function fetchFirstLetterFoods(firstLetter) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const data = await response.json();
  return data;
}

export async function fetchIngredientDrinks(ingredient) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  console.log(data);
  return data;
}

export async function fetchNameDrinks(name) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data;
}

export async function fetchFirstLetterDrinks(firstLetter) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const data = await response.json();
  return data;
}

export async function fetchByCategoryFoods(category) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  const magicNumber = 12;
  const SplitArray = data.meals.splice(0, magicNumber);
  return SplitArray;
}

export async function fetchByCategoryDrinks(category) {
  const response = await
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const { drinks } = await response.json();
  const magicNumber = 12;
  const SplitArray = drinks.splice(0, magicNumber);
  return SplitArray;
}

export async function fetchRandomFoodDetails() {
  const response = await
    fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const data = await response.json();
  const { meals } = data;
  return meals;
}

export async function fetchRandomDrinkDetails() {
  const response = await
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const data = await response.json();
  return data;
}

export async function fetchFoodById(id) {
  const response = await
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { meals } = await response.json();
  return meals;
}

export async function fetchDrinkById(id) {
  const response = await
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { drinks } = await response.json();
  return drinks;
}

export async function fetchIngredientofFoods() {
  const response = await
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const { meals } = await response.json();
  const magicNumber = 12;
  const SplitArray = meals.splice(0, magicNumber);
  return SplitArray;
}

export async function fetchIngredientofDrinks() {
  const response = await
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const { drinks } = await response.json();
  const magicNumber = 12;
  const SplitArray = drinks.splice(0, magicNumber);
  return SplitArray;
}
