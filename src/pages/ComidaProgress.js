import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchMealById from '../services/fetchMealById';

function ComidaProgress({ match }) {
  const { recipeId } = match.params;

  const [meal, setMeal] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMeal = async (id) => {
      const result = await fetchMealById(id);
      setMeal(result);
    };
    getMeal(recipeId);
    setIsLoading(false);
  }, [setMeal, recipeId]);

  const ingredients = [
    meal.strIngredient1,
    meal.strIngredient2,
    meal.strIngredient3,
    meal.strIngredient4,
    meal.strIngredient5,
    meal.strIngredient6,
    meal.strIngredient7,
    meal.strIngredient8,
    meal.strIngredient9,
    meal.strIngredient10,
    meal.strIngredient11,
    meal.strIngredient12,
    meal.strIngredient13,
    meal.strIngredient14,
    meal.strIngredient15,
    meal.strIngredient16,
    meal.strIngredient17,
    meal.strIngredient18,
    meal.strIngredient19,
    meal.strIngredient20,
  ];

  const handleCheckbox = ({ target }) => {
    console.log(target.parentElement.innerText);
    if (target.checked === true) {
      target.parentElement.style.textDecorationLine = 'line-through';
      target.parentElement.style.textDecorationStyle = 'solid';
    } else if (target.checked === false) {
      target.parentElement.style.textDecorationLine = '';
      target.parentElement.style.textDecorationStyle = '';
    }
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>
        Detalhes da Receita de Comida
        {recipeId}
      </h1>
      <h2 data-testid="recipe-title">{meal.strMeal}</h2>
      <h3 data-testid="recipe-category">{meal.strCategory}</h3>
      <img
        src={ meal.strMealThumb }
        alt={ meal.strMeal }
        data-testid="recipe-photo"
      />
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">S2</button>

      <h4>Ingredientes</h4>
      <ul>
        {ingredients.filter((ingredient) => typeof ingredient === 'string'
        && ingredient !== '')
          .map((ingredient, index) => (
            <div
              key={ ingredient }
            >
              <label
                htmlFor={ index }
                key={ ingredient }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  value={ ingredient }
                  id={ index }
                  type="checkbox"
                  onClick={ handleCheckbox }
                />
                {ingredient}
              </label>
            </div>))}
      </ul>

      <h4>Instruções</h4>
      <p data-testid="instructions">{meal.strInstructions}</p>

      <button type="button" data-testid="finish-recipe-btn">
        Finalizar Receita
      </button>

    </div>
  );
}

ComidaProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ComidaProgress;
