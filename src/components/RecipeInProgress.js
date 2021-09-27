import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import Ingredients from './Ingredients';

function RecipeInProgress({ recipe, isMeal }) {
  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      {
        cocktails: {},
        meals: {},
      },
    ));
  }, []);

  return (
    <div>

      <img
        data-testid="recipe-photo"
        src={ isMeal ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt={ isMeal ? 'foto da comida' : 'foto do drink' }
      />

      <h2 data-testid="recipe-title">{isMeal ? recipe.strMeal : recipe.strDrink}</h2>

      <input
        type="image"
        src={ shareIcon }
        alt="compartilhar receita"
        data-testid="share-btn"
      />

      <input
        type="image"
        src={ favoriteIcon }
        alt="favoritar receita"
        data-testid="favorite-btn"
      />

      <h3
        data-testid="recipe-category"
      >
        {`${recipe.strCategory} ${recipe.strAlcoholic}`}
      </h3>

      <Ingredients recipe={ recipe } isMeal={ isMeal } />

      <p data-testid="instructions">{recipe.strInstructions}</p>

      <button type="button" data-testid="finish-recipe-btn">Finalizar receita</button>

    </div>
  );
}

RecipeInProgress.propTypes = {
  recipe: PropTypes.shape({
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strVideo: PropTypes.string,
    strIngredient: PropTypes.string,
    strAlcoholic: PropTypes.string,
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
  isMeal: PropTypes.bool.isRequired,
};

export default RecipeInProgress;
