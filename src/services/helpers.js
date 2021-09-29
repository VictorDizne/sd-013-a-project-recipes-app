// solução feita a partir do repositório https://github.com/tryber/sd-013-a-project-recipes-app/blob/main-group-3-requisito-28/src/components/RecipeDetailCard.jsx

export const getIngredients = (meal) => {
  const strMeal = Object.entries(meal[0]);
  const strIngredient = strMeal.filter(([key, value]) => key
    .includes('strIngredient') && value);
  const strMeasure = strMeal.filter(([key, value]) => key
    .includes('strMeasure') && value);
  return strIngredient.map((item, index) => `${item[1]} - ${strMeasure[index][1]}`);
};

export const createDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const date = `${day}/${month}/${year}`;

  return date;
};

export const favoriteMealRecipe = (recipe, previousRecipes, favorite, historyId) => {
  let favoriteRecipes = [];
  const { idMeal, strArea, strCategory, strMeal, strMealThumb } = recipe[0];
  if (previousRecipes) {
    favoriteRecipes = [
      ...previousRecipes,
      {
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      },
    ];
  } else {
    favoriteRecipes = [
      {
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      },
    ];
  }

  if (!favorite) {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }

  if (favorite) {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const removeRecipe = favRecipes
      .filter((favRecipe) => favRecipe.id !== historyId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeRecipe));
  }
};

export const favoriteDrinkRecipe = (recipe, previousRecipes, favorite, historyId) => {
  let favoriteRecipes = [];
  const { idDrink, strCategory, strAlcoholic, strDrink, strDrinkThumb } = recipe[0];
  if (previousRecipes) {
    favoriteRecipes = [
      ...previousRecipes,
      {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      },
    ];
  } else {
    favoriteRecipes = [
      {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      },
    ];
  }

  if (!favorite) {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }

  if (favorite) {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const removeRecipe = favRecipes
      .filter((favRecipe) => favRecipe.id !== historyId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeRecipe));
  }
};
