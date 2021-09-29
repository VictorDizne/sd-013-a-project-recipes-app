import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import favoritedIcon from '../images/blackHeartIcon.svg';
import unfavoritedIcon from '../images/whiteHeartIcon.svg';
import RecipeRecomendations from './RecipeRecomendations';
import './css/RecipeDetails.css';
import StartRecipeBtn from './StartRecipeBtn';
import RecipesContext from '../context/RecipesContext';

const copy = require('clipboard-copy');

const RecipeDetails = ({ recipe, isMeal, showBtn, history }) => {
  const { toggleFavoriteBtn, isFavorite } = useContext(RecipesContext);
  const recipeIngredients = [];

  const getIngredients = () => {
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

  const handleShareBtn = () => {
    const { location: { pathname } } = history;
    copy(`http://localhost:3000${pathname}`);

    const h4 = document.createElement('h4');
    h4.textContent = 'Link copiado!';
    const father = document.querySelector('[data-testid="recipe-category"]');
    father.insertAdjacentElement('afterend', h4);
  };

  const handleFavoriteBtn = () => {
    toggleFavoriteBtn(recipe, isMeal);
  };

  return (
    <div>

      <img
        className="recipe-thumbnail"
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
        onClick={ handleShareBtn }
      />

      <input
        type="image"
        src={ isFavorite ? favoritedIcon : unfavoritedIcon }
        alt="favoritar receita"
        data-testid="favorite-btn"
        onClick={ handleFavoriteBtn }
      />

      <h3
        data-testid="recipe-category"
      >
        {`${recipe.strCategory} ${isMeal ? '' : recipe.strAlcoholic}`}

      </h3>

      {getIngredients()}
      <p data-testid="instructions">{recipe.strInstructions}</p>
      {isMeal && <a data-testid="video" href={ recipe.strVideo }>Video</a>}
      <div className="recomendation-content">
        <div className="recomendation-container">
          <RecipeRecomendations isMeal={ isMeal } />
        </div>
      </div>
      {showBtn && <StartRecipeBtn
        history={ history }
        recipe={ recipe }
        isMeal={ isMeal }
      />}
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
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
  isMeal: PropTypes.bool.isRequired,
  showBtn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeDetails;
