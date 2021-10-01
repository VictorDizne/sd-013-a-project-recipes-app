export const isThisRecipeDone = (id) => {
  if (localStorage.getItem('doneRecipes')) {
    const done = JSON.parse(localStorage.getItem('doneRecipes'));
    const thereIs = done.find((recipe) => recipe.id === id);
    // se existir aquela receita em done, então o botão iniciar tem que desaparecer., senão existir, então ele tem que aparecer (visibility === true)
    return thereIs;
  }
};

export function isThisRecipeInProgress(id, type) {
  if (localStorage.getItem('inProgressRecipes')) {
    const { meals, cocktails } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (type === 'comida') {
      return Object.keys(meals).some((key) => key === id);
    }
    if (type === 'bebida') {
      return Object.keys(cocktails).some((key) => key === id);
    }
  }
}

export function setDoneRecipe(recipe, typ) {
  const done = JSON.parse(localStorage.doneRecipes);
  localStorage.setItem('doneRecipes', JSON.stringfy([
    ...done,
    {
      id: typ === 'comida' ? recipe.idMeal : recipe.idDrink,
      // type: comida-ou-bebida,
      type: typ === 'comida' ? 'comida' : 'bebida',
      // area: area-da-receita-ou-texto-vazio,
      area: recipe.strArea ? recipe.strArea : '',
      // category: categoria-da-receita-ou-texto-vazio,
      category: recipe.strCategory ? recipe.strCategory : '',
      // alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
      alcoholicOrNot: recipe.strAlcoolic ? recipe.strAlcoholic : '',
      // name: nome-da-receita,
      name: typ === 'comida' ? recipe.strMeal : recipe.strDrink,
      // image: imagem-da-receita,
      image: typ === 'comida' ? recipe.strMealThumb : recipe.strDrinkThumb,
      // doneDate: quando-a-receita-foi-concluida,
      doneDate: new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
      // tags: array-de-tags-da-receita-ou-array-vazio
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
    },
  ]));
}

export function isThisRecipeFavorited(id) {
  console.log(id);
  if (localStorage.getItem('favoriteRecipes')) {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return favoriteRecipes.some((element) => element.id === id);
  }
}

export function setDefaultLocalStorage(email) {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);

  if (!localStorage.user) {
    localStorage.setItem('user', JSON.stringify({ email }));
  }
  if (!localStorage.inProgressRecipes) {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ cocktails: {}, meals: {} }),
    );
  }
  if (!localStorage.doneRecipes) {
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([]),
    );
  }
  if (!localStorage.favoriteRecipes) {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([]),
    );
  }
}

export function getDoneRecipes(
  setDoneRecipes, setDoneFoodRecipes, setDoneDrinkecipes, setDisableFilters,
) {
  const done = JSON.parse(localStorage.getItem('doneRecipes'));
  if (done) {
    const donefoodRecipes = done.filter((doneRecipe) => doneRecipe.type === 'comida');
    const doneDrinkRecipes = done.filter((doneRecipe) => doneRecipe.type === 'bebida');
    if (donefoodRecipes) setDoneFoodRecipes(donefoodRecipes);
    if (doneDrinkRecipes) setDoneDrinkecipes(doneDrinkRecipes);
    setDoneRecipes(done);
    setDisableFilters(false);
  } else {
    setDisableFilters(true);
  }
}

export function getFavRecipes(
  setFavoritedRecipes, setFavFoodRecipes, setFavDrinkecipes, setDisableFilters,
) {
  const fav = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (fav) {
    const favfoodRecipes = fav.filter((favRecipe) => favRecipe.type === 'comida');
    const favDrinkRecipes = fav.filter((favRecipe) => favRecipe.type === 'bebida');
    if (favfoodRecipes) setFavFoodRecipes(favfoodRecipes);
    if (favDrinkRecipes) setFavDrinkecipes(favDrinkRecipes);
    setFavoritedRecipes(fav);
    setDisableFilters(false);
  } else {
    setDisableFilters(true);
  }
}

const FOOD_INGREDIENTS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const DRINK_INGREDIENTS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const LENGTH = 12;

export async function fetchIngredients(type) {
  if (type === 'comidas') {
    const response = await fetch(FOOD_INGREDIENTS);
    const result = await response.json();

    return result.meals.slice(0, LENGTH);
  }
  if (type === 'bebidas') {
    const response = await fetch(DRINK_INGREDIENTS);
    const result = await response.json();

    return result.drinks.slice(0, LENGTH);
  }
}

const FOOD_BY_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

const DRINK_BY_INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

export async function fetchRecipesByIngredients(setFoodRecipes, state, type) {
  let RECIPE_BY_INGREDIENT = '';
  if (type === 'meals') RECIPE_BY_INGREDIENT = FOOD_BY_INGREDIENT;
  if (type === 'drinks') RECIPE_BY_INGREDIENT = DRINK_BY_INGREDIENT;
  const response = await fetch(`${RECIPE_BY_INGREDIENT}${state}`);
  const result = await response.json();
  setFoodRecipes(result[type].slice(0, LENGTH));
}

const AREAS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

export async function fetchFoodRecipeOrigins() {
  const response = await fetch(AREAS_ENDPOINT);
  const result = await response.json();

  return result.meals;
}

const FILTER_BY_AREA = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

export async function fetchFoodsByOrigin(setFoodRecipes, origin) {
  const response = await fetch(`${FILTER_BY_AREA}${origin}`);
  const result = await response.json();

  setFoodRecipes(result.meals.slice(0, LENGTH));
}
