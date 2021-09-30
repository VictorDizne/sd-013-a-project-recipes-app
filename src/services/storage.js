// IN PROGRESS RECIPE LOCAL STORAGE
export const setProgressRecipe = (id, type) => {
  const progressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const newProgressRecipe = {
    ...progressRecipe,
    [type]: {
      ...progressRecipe[type],
      [id]: [],
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(newProgressRecipe));
};

export const checkProgressRecipe = (id, type) => {
  const result = JSON.parse(localStorage.getItem('inProgressRecipes'));
  return (Object.keys(result[type]).some((recipeId) => recipeId === id));
};

export const setInProgressRecipeLocalStorage = () => {
  const progressRecipe = {
    cocktails: {},
    meals: {},
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipe));
};

// FAVORITE RECIPE LOCAL STORAGE
export const checkFavoriteRecipe = (id) => {
  const result = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return (result.some((item) => item.id === id));
};

export const setFavoriteRecipe = (id, details, type) => {
  const result = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const check = result.some((item) => item.id === id);
  const favoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let newFavoriteRecipe = [];
  if (check) {
    newFavoriteRecipe = favoriteRecipe.filter((item) => item.id !== id);
  } else {
    newFavoriteRecipe = [
      ...favoriteRecipe,
      {
        id: details[`id${type}`],
        type: type === 'Drink' ? 'bebida' : 'comida',
        area: type === 'Drink' ? '' : details.strArea,
        category: details.strCategory,
        alcoholicOrNot: type === 'Drink' ? details.strAlcoholic : '',
        name: details[`str${type}`],
        image: details[`str${type}Thumb`],
      },
    ];
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipe));
  return checkFavoriteRecipe(id);
};

export const setFavoriteRecipeLocalStorage = () => {
  const favoriteRecipe = [];
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipe));
};

// DONE RECIPE LOCAL STORAGE
export const setDoneRecipesLocalStorage = () => {
  const doneRecipes = [];
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
};

export const checkDoneRecipe = (id) => {
  const result = JSON.parse(localStorage.getItem('doneRecipes'));
  return (result.some((item) => item.id === id));
};

// SET ALL LOCAL STORAGE IF DONT HAVE NO ONE
export const setAllLocalStorage = (paramsValue) => {
  const {
    doneRecipes,
    progressRecipes,
    favoriteRecipes,
    setCheckProgress,
    setCheckFavorite,
    setCheckDone,
    id,
    type,
  } = paramsValue;

  if (!doneRecipes) {
    setDoneRecipesLocalStorage();
  } else {
    setCheckDone(checkDoneRecipe(id));
  }

  if (!progressRecipes) {
    setInProgressRecipeLocalStorage();
  } else {
    setCheckProgress(checkProgressRecipe(id, type)
      ? 'Continuar Receita' : 'Iniciar Receita');
  }

  if (!favoriteRecipes) {
    setFavoriteRecipeLocalStorage();
  } else {
    setCheckFavorite(checkFavoriteRecipe(id));
  }
};
