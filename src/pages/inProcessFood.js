import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import appContext from '../contexts/appContext';

function ProcessFood({ props }) {
  const [meal, setMeal] = useState({});
  const { getIngredients } = useContext(appContext);
  const { id } = useParams();

  useEffect(() => {
    const getMeal = async () => {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(URL);
      const { meals } = await response.json();
      setMeal(meals[0]);
    };
    getMeal();
  }, []);

  // localStorage.inProgressRecipes = JSON.stringify({
  // cocktails: {
  //   id-da-bebida: [lista-de-ingredientes-utilizados],
  //   ...
  // },
  //   meals: {
  //   id-da-comida: [lista-de-ingredientes-utilizados],
  //   ...
  //   }
  // });

  // const [localState, setLocalState] = useState({cocktails: {
  //   id-da-bebida: [lista-de-ingredientes-utilizados],
  //   ...
  // },
  // meals: {
  //   id-da-comida: [lista-de-ingredientes-utilizados],
  //   ...
  // }})

  const finishRecipe = () => {
    props.history.push('/receitas-feitas');
  };

  const checkDisable = () => {
    const allCheckBox = document.querySelectorAll('.checkbox');
    console.log(allCheckBox);
  };

  const onChangeIngredient = (ingredientName) => {
    console.log(ingredientName);
  };

  const { ingredients } = getIngredients(meal);
  return (
    <div>
      <h1>comida em processo</h1>
      <img
        data-testid="recipe-photo"
        src={ meal.strMealThumb }
        alt=""
      />
      <h2 data-testid="recipe-title">{ meal.strMeal }</h2>
      <h3 data-testid="recipe-category">{ meal.strCategory }</h3>
      {ingredients.map((ingredient, index) => (
        <label
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ ingredient }
        >
          { ingredient }
          <input
            className="checkbox"
            type="checkbox"
            id={ ingredient }
            value={ ingredient }
            name="ingredients"
            onChange={ (e) => onChangeIngredient(e.target.value) }
          />
        </label>
      ))}
      <p data-testid="instructions">{ meal.strInstructions }</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ checkDisable }
        onClick={ finishRecipe }
      >
        Finalizar Receita
      </button>
      <button
        type="button"
        data-testid="share-btn"
        disabled=""
        onClick=""
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        disabled=""
        onClick=""
      >
        Favoritar
      </button>
    </div>
  );
}

ProcessFood.propTypes = {
  props: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  }).isRequired,
  history: PropTypes.shape().isRequired,
};

export default ProcessFood;
