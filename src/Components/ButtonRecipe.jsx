import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import useApiId from '../Hooks/useApiId';

const ButtonRecipe = ({ id }) => {
  const { pathname } = useLocation();
  const pathnameCheck = (pathnameParam) => {
    switch (pathnameParam) {
    case `/comidas/${id}`:
      return 'themealdb';
    case `/bebidas/${id}`:
      return 'thecocktaildb';
    default:
      return null;
    }
  };

  const [data, isMeal] = useApiId(pathnameCheck(pathname), id);
  const [button, setButton] = useState('Iniciar Receita');
  const [mealOrCocktail, setMealOrCockTail] = useState('');
  const history = useHistory();
  console.log(data);

  useEffect(() => {
    if (isMeal) return setMealOrCockTail('meals');
    return setMealOrCockTail('cocktails');
  }, [isMeal]);

  const verifyDoneRecipes = () => {
    if (localStorage.doneRecipes) {
      const recipes = JSON.parse(localStorage.doneRecipes);
      return !recipes.some((recipe) => recipe.id === id);
    }
    return true;
  };

  const verifyInProgress = () => {
    if (localStorage.inProgressRecipes && mealOrCocktail) {
      const recipes = JSON.parse(localStorage.inProgressRecipes);
      if (recipes[mealOrCocktail]) {
        const keys = Object.keys(recipes[mealOrCocktail]);
        const keysSome = keys.some((recipe) => recipe === id);
        return keysSome;
      }
    }
    return false;
  };
  useEffect(() => {
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        { cocktails: {}, meals: {} },
      ));
    }
    const verifyButton = () => (
      verifyInProgress()
        ? setButton('Continuar Receita')
        : setButton('Iniciar Receita')
    );
    verifyButton();
  }, [mealOrCocktail]);

  const startOrContinueRecipe = () => {
    const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...recipes,
      [mealOrCocktail]: {
        ...recipes[mealOrCocktail],
        [id]: [],
      },
    }));
    if (isMeal) return history.push(`/comidas/${id}/in-progress`);
    return history.push(`/bebidas/${id}/in-progress`);
  };

  return (
    verifyDoneRecipes() && (
      <button
        className="btn-down"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ startOrContinueRecipe }
      >
        { button }
      </button>
    )
  );
};

ButtonRecipe.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ButtonRecipe;

// const inProgressRecipes = JSON.parse(
//   localStorage.getItem('inProgressRecipes'),
// ) || { cocktails: {},
//   meals: {} };

// const mealOrDrink = isMeal ? 'meals' : 'cocktails';

// const meals = {
//   ...inProgressRecipes.meals,
//   [id]: [],
// };
// const cocktails = {
//   ...inProgressRecipes.cocktails,
//   [id]: [],
// };
// console.log('36 mealOrDrink', mealOrDrink);
// if (inProgressRecipes[mealOrDrink]) {
//   console.log('if37', inProgressRecipes[mealOrDrink]);
//   return isMeal
//     ? history.push(`/comidas/${id}/in-progress`)
//     : history.push(`/bebidas/${id}/in-progress`);
// }

// const recipe = isMeal ? meals : cocktails;

// console.log('48', recipe);

// localStorage.setItem('inProgressRecipes', JSON.stringify(
//   [...inProgressRecipes, recipe],
// ));
// console.log('53', inProgressRecipes);

// const mealOrCocktail = isMeal ? 'meals' : 'cocktails';
// const InProgressRecipes = JSON.parse(
//   localStorage.getItem('InProgressRecipes'),
// ) || { cocktails: {}, meals: {} };
// if (InProgressRecipes[mealOrCocktail].id) {
//   console.log('passou');
//   return isMeal
//     ? history.push(`/comidas/${id}/in-progress`)
//     : history.push(`/bebidas/${id}/in-progress`);
// }
// console.log('aqui');

// const recipe = {
//   [mealOrCocktail]: {
//     ...localStorage.inProgressRecipes[mealOrCocktail],
//     [id]: [],
//   },
// };
