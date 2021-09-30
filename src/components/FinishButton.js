import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function FinishButton({ disabledButton, isMeal, recipe, recipeId }) {
  // Funcao para adicionar o localStorage doneRecipes
  const handleOnClick = () => {
    if (!localStorage.doneRecipes) {
      const arrayDone = [];
      localStorage.setItem('doneRecipes', JSON.stringify(arrayDone));
    }
    const itemDone = JSON.parse(localStorage.getItem('doneRecipes'));
    const item = {
      id: recipeId,
      type: isMeal ? 'comida' : 'bebida',
      area: isMeal ? recipe.strArea : '',
      category: recipe.strCategory,
      alcoholicOrNot: isMeal ? '' : recipe.strAlcoholic,
      name: isMeal ? recipe.strMeal : recipe.srtDrink,
      image: isMeal ? recipe.strMealThumb : recipe.strDrinkThumb,
      doneDate: recipe.dateModified,
      tags: '',
    };
    itemDone.push(item);
    localStorage.setItem('doneRecipes', JSON.stringify(itemDone));
  };

  return (
    <Link
      to="/receitas-feitas"
    >
      <button
        type="button"
        className="btn btn-primary"
        data-testid="finish-recipe-btn"
        onClick={ handleOnClick }
        disabled={ disabledButton }
      >
        Finalizar Receita
      </button>
    </Link>
  );
}

FinishButton.propTypes = {
  disabledButton: PropTypes.bool.isRequired,
  isMeal: PropTypes.bool.isRequired,
  recipeId: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    strArea: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    srtDrink: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
  }).isRequired,
};

export default FinishButton;
