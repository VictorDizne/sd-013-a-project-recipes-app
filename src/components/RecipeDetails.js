import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';

const RecipeDetails = ({ recipe, isMeal }) => {
  const recipeIngredients = [];

  const geraArrayProFilhoDaPutaQueNaoFez = () => {
    const MAX_INGREDIENTS = 16;
    for (let i = 0; i < MAX_INGREDIENTS; i += 1) {
      const auxObj = { name: '', measure: '' };
      if (recipe[`strIngredient${i}`]) {
        auxObj.name = recipe[`strIngredient${i}`];
        auxObj.measure = recipe[`strMeasure${i}`];
        recipeIngredients.push(auxObj);
      }
    }

    return (
      <ul>
        {recipeIngredients.map((ingredient, i) => (
          <li
            key={ `${ingredient.name} ${i}` }
            data-testid={ `${i}-ingredient-name-and-measure` }
          >
            {`${ingredient.name} ${ingredient.measure}`}
          </li>
        ))}
      </ul>
    );
  };

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
      {geraArrayProFilhoDaPutaQueNaoFez()}
      <p data-testid="instructions">{recipe.strInstructions}</p>
      {isMeal && <a data-testid="video" href={ recipe.strVideo }>Video</a>}
      <p data-testid="0-recomendation-card">Ae</p>
      <button type="button" data-testid="start-recipe-btn">Começar receita</button>
    </div>
  );
};

RecipeDetails.propTypes = {
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
  }).isRequired,
  isMeal: PropTypes.bool.isRequired,
};

export default RecipeDetails;
