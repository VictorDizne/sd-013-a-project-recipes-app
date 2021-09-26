import React, { useState } from 'react';
import PropTypes from 'prop-types';
import appContext from './appContext';

const AppProvider = ({ children }) => {
  const [state, setState] = useState({ foods: [], drinks: [], category: '', key: false });
  const [recipesInProgress, setRecipes] = useState([]);

  const getIngredients = (arrFood) => {
    const ingredients = [];
    const measures = [];
    const TWENTY_NUMBER = 20;
    for (let i = 1; i <= TWENTY_NUMBER; i += 1) {
      if (arrFood[`strIngredient${i}`]) {
        ingredients.push(arrFood[`strIngredient${i}`]);
        measures.push(arrFood[`strMeasure${i}`]);
      }
    }
    return { ingredients, measures };
  };

  const removeFavRecipe = (drinkDetail, mealDetail) => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (drinkDetail) {
      const { idDrink } = drinkDetail;
      const filteredRecipe = favRecipes.filter(({ id }) => id !== idDrink);
      return localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRecipe));
    }
    const { idMeal } = mealDetail;
    const filteredRecipe = favRecipes.filter(({ id }) => id !== idMeal);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRecipe));
  };

  const verify = (setFavorited, drink, meal) => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (drink) {
      const { idDrink } = drink;
      const isFav = favRecipes.some((recipe) => recipe.id === idDrink);
      return setFavorited(isFav);
    }
    const { idMeal } = meal;
    const isFav = favRecipes.some((recipe) => recipe.id === idMeal);
    return setFavorited(isFav);
  };

  const favoriteRecipe = (drinkDetail, mealDetail) => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (drinkDetail) {
      const { idDrink, strCategory, strDrink, strAlcoholic, strDrinkThumb } = drinkDetail;
      const recipeObj = {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      };
      const arrFavRecipes = [...favRecipes, recipeObj];
      return localStorage.setItem('favoriteRecipes', JSON.stringify(arrFavRecipes));
    }
    const {
      idMeal, strArea, strCategory, strMeal, strMealThumb } = mealDetail;

    const recipeObj = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    const arrFavRecipes = [...favRecipes, recipeObj];
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrFavRecipes));
  };

  const values = {
    state,
    setState,
    getIngredients,
    setRecipes,
    recipesInProgress,
    favoriteRecipe,
    removeFavRecipe,
    verify,
  };

  return (
    <appContext.Provider value={ values }>
      {children}
    </appContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProvider;
