import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
// import { meals } from '../../cypress/mocks/meals';

function RecipeInProgress({ recipe, isMeal }) {
  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      {
        cocktails: {},
        meals: {},
      },
    ));
  }, []);

  const verifyChecked = (event, indexIng, id) => {
    console.log(event.target.checked);
    console.log(id);

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (event.target.checked === true && isMeal) {
      const updatedMeals = {
        ...inProgressRecipes,
        meals: { [id]: [...inProgressRecipes.meals[id], indexIng] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(updatedMeals));
    } else if (event.target.checked === false || !isMeal) {
      const updatedCocktails = {
        ...inProgressRecipes,
        cocktails: { [id]: [...inProgressRecipes.cocktails[id], indexIng] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(updatedCocktails));
    }
  };

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
          <label
            htmlFor={ `${i}-ingredient-step` }
            key={ `${ingredient.name} ${i}` }
            data-testid={ `${i}-ingredient-step` }
          >
            <input
              type="checkbox"
              onClick={ (event) => {
                verifyChecked(event, i, recipe.idMeal || recipe.idDrink);
              } }
            />
            {`${ingredient.name} ${ingredient.measure}`}
          </label>
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

      {getIngredients()}

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
