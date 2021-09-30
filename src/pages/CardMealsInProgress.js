import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Loading from '../components/loadingComponent';

const CardMealsInProgress = () => {
  const history = useHistory();
  const [meal, updateMeal] = useState(false);
  function getId() {
    const { pathname } = history.location;
    const id = pathname.split('/')[2];
    return id;
  }

  async function fetchMeal(id) {
    const fetchResult = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { meals } = await fetchResult.json();
    updateMeal(meals[0]);
  }

  useEffect(() => {
    const id = getId();
    fetchMeal(id);
  }, []);

  if (meal === false) {
    return <Loading />;
  }

  function filtrarIngredients() {
    const ingredientesAndMensuresMeals = Object.keys(meal);
    const ingredientesMeals = [];
    for (let i = Number('9'); i < Number('28'); i += 1) {
      if (ingredientesAndMensuresMeals[i].includes('Ingredient')
      && meal[ingredientesAndMensuresMeals[i]] !== ''
      && meal[ingredientesAndMensuresMeals[i]] !== null) {
        ingredientesMeals.push(meal[ingredientesAndMensuresMeals[i]]);
      }
    }
    return ingredientesMeals;
  }

  return (
    <div>
      <img
        src={ meal.strMealThumb }
        alt={ meal.strMeal }
        data-testid="recipe-photo"
        width="150px"
      />
      <h1 data-testid="recipe-title">{ meal.strMeal }</h1>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        finalizar receita
      </button>
      <p data-testid="recipe-category">{ meal.strCategory }</p>
      <ul>
        {filtrarIngredients().map((ingredient, index) => (
          <li key={ index }>
            <label htmlFor={ ingredient } data-testid="ingredient-step">
              {ingredient}
              <input
                id={ ingredient }
                type="checkbox"
                value={ ingredient }
              />
            </label>
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ meal.strInstructions }</p>
    </div>
  );
};

export default CardMealsInProgress;
