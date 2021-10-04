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

const createDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const date = `${day}/${month}/${year}`;

  return date;
};

export const doneMealsList = (recipe, savedDoneRecipes) => {
  let doneRecipes = [];
  const { idMeal, strArea, strCategory, strMeal, strMealThumb, strTags } = recipe[0];
  const tagsArray = (strTags === null) ? [] : strTags.split(',');
  if (savedDoneRecipes) {
    doneRecipes = [
      ...savedDoneRecipes,
      {
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
        doneDate: createDate(),
        tags: tagsArray,
      },
    ];
  } else {
    doneRecipes = [
      {
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
        doneDate: createDate(),
        tags: tagsArray,
      },
    ];
  }

  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
};

export const doneDrinksList = (recipe, savedDoneRecipes) => {
  let doneRecipes = [];
  const { idDrink,
    strArea, strCategory, strDrink, strDrinkThumb, strTags, strAlcoholic } = recipe[0];
  const tagsArray = (strTags === null) ? [] : strTags.split(',');
  if (savedDoneRecipes) {
    doneRecipes = [
      ...savedDoneRecipes,
      {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
        doneDate: createDate(),
        tags: tagsArray,
      },
    ];
  } else {
    doneRecipes = [
      {
        id: idDrink,
        type: 'bebida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
        doneDate: createDate(),
        tags: tagsArray,
      },
    ];
  }

  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
};

export const setMealsProgress = (historyId, newIngredientsSave) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (inProgressRecipes) {
    const newList = {
      ...inProgressRecipes,
      meals: {
        ...inProgressRecipes.meals,
        [historyId]: newIngredientsSave,
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(newList));
  } else {
    const listUnstructured = {
      cocktails: {},
      meals: {
        [historyId]: newIngredientsSave,
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(listUnstructured));
  }
};

export const setDrinksProgress = (historyId, newIngredientsSave) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (inProgressRecipes) {
    const newList = {
      ...inProgressRecipes,
      cocktails: {
        ...inProgressRecipes.cocktails,
        [historyId]: newIngredientsSave,
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(newList));
  } else {
    const listUnstructured = {
      cocktails: {
        [historyId]: newIngredientsSave,
      },
      meals: {},
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(listUnstructured));
  }
};
