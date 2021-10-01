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
