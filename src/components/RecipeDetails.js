import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia,
  CardContent, Typography } from '@mui/material';
import shareIcon from '../images/shareIcon.svg';
import favoritedIcon from '../images/blackHeartIcon.svg';
import unfavoritedIcon from '../images/whiteHeartIcon.svg';
import RecipeRecomendations from './RecipeRecomendations';
import './css/RecipeDetails.css';
import StartRecipeBtn from './StartRecipeBtn';
import RecipesContext from '../context/RecipesContext';

const copy = require('clipboard-copy');

const RecipeDetails = ({ recipe, isMeal, showBtn, history }) => {
  const { toggleFavoriteBtnDetails, isFavorite } = useContext(RecipesContext);
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
      <ul className="ingredient-list">
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

  return (
    <>
      <Card sx={ { maxWidth: 360 } }>
        <CardMedia
          component="img"
          height="300"
          data-testid="recipe-photo"
          src={ isMeal ? recipe.strMealThumb : recipe.strDrinkThumb }
          alt={ isMeal ? 'foto da comida' : 'foto do drink' }
        />
        <CardContent>
          <Typography
            data-testid="recipe-title"
            gutterBottom
            variant="h5"
            component="h2"
          >
            {isMeal ? recipe.strMeal : recipe.strDrink}
          </Typography>
          <Typography
            data-testid="recipe-category"
            variant="subtitle1"
            component="h3"
          >
            {`${recipe.strCategory} ${isMeal ? '' : recipe.strAlcoholic}`}
          </Typography>
          {getIngredients()}
          <div className="instructions-paragraph">
            <Typography
              data-testid="instructions"
              variant="body1"
              component="p"
            >
              {recipe.strInstructions}
            </Typography>
          </div>
          {isMeal && <a data-testid="video" href={ recipe.strVideo }>Video</a>}
          <div className="share-favorite-icons">
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
              onClick={ () => toggleFavoriteBtnDetails(recipe, isMeal) }
            />
          </div>
        </CardContent>
        <div className="recomendation-content">
          <div className="recomendation-container">
            <RecipeRecomendations isMeal={ isMeal } />
          </div>
        </div>
      </Card>
      {showBtn && <StartRecipeBtn
        history={ history }
        recipe={ recipe }
        isMeal={ isMeal }
      />}
    </>
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
