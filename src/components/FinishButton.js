import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../css/FinishButton.css';
import { divide } from 'lodash-es';

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
      name: isMeal ? recipe.strMeal : recipe.strDrink,
      image: isMeal ? recipe.strMealThumb : recipe.strDrinkThumb,
      doneDate: recipe.dateModified,
      tags: '',
    };
    itemDone.push(item);
    localStorage.setItem('doneRecipes', JSON.stringify(itemDone));
  };

  return (
    <div className="d-flex btn-test">
      <Link
        to="/receitas-feitas"
        className="btn btn-danger"
      >
        <button
          type="button"
          className="removeStyle btn-danger text-center mx-auto"
          data-testid="finish-recipe-btn"
          onClick={ handleOnClick }
          disabled={ disabledButton }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
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
    strDrink: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
  }).isRequired,
};

export default FinishButton;
