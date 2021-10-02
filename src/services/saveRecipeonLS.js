function saveRecipeonLS(mealOrDrink, recipe) {
  // Monta o objeto a ser colocado no LocalStorage
  let newRecipe;
  if (mealOrDrink === 'Meal') {
    newRecipe = {
      [recipe.idMeal]: [],
    };
  } else {
    newRecipe = {
      [recipe.idDrink]: [],
    };
  }
  // Checa se já existe a chave de receitas em progresso, caso não existe cria chave
  // correspondente à categoria
  if (!localStorage.getItem('inProgressRecipes')) {
    if (mealOrDrink === 'Meal') {
      const newMeal = { meals: newRecipe };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newMeal));
    } else {
      const newMeal = { cocktails: newRecipe };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newMeal));
    }
  } else {
    // Busca a chave do LocalStorage, se for uma comida coloca a nova receita na chave
    // de comidas, caso contrário na chave de cocktails
    const currentRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (mealOrDrink === 'Meal') {
      const newRecipes = { ...currentRecipes,
        meals: {
          ...currentRecipes.meals,
          ...newRecipe,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipes));
    } else {
      const newRecipes = { ...currentRecipes,
        cocktails: {
          ...currentRecipes.cocktails,
          ...newRecipe,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipes));
    }
  }
}
export default saveRecipeonLS;
