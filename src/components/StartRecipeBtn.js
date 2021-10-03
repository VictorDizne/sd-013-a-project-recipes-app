import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function StartRecipeBtn({ isMeal, recipe }) {
  const recipeId = recipe.idMeal || recipe.idDrink;

  const isDone = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!doneRecipes.length) return false;

    return doneRecipes.find(({ id }) => {
      if (id === recipeId) return true;
      return false;
    });
  };

  return (
    <Link
      to={ `${isMeal ? '/comidas/' : '/bebidas/'}${recipeId}/in-progress` }
      className="btn btn-primary start-recipe"
      data-testid="start-recipe-btn"
      hidden={ isDone() }
    >
      Iniciar Receita
    </Link>
  );
}

StartRecipeBtn.propTypes = {
  isMeal: PropTypes.bool.isRequired,
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
};

export default StartRecipeBtn;
