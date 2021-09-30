import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import appContext from '../contexts/appContext';
import FavoriteButton from '../components/favoriteButton';
import ShareButton from '../components/shareButton';

function ProcessFood({ props }) {
  const [meal, setMeal] = useState({});
  const [render, setRender] = useState(true);
  const { getIngredients } = useContext(appContext);
  const { id } = useParams();
  const { ingredients } = getIngredients(meal);

  useEffect(() => {
    const getMeal = async () => {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(URL);
      const { meals } = await response.json();
      setMeal(meals[0]);
    };
    getMeal();
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: { [id]: [] }, cocktails: {},
      }));
    }
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

  const isChecked = (ingredientName) => {
    const NOT_FOUND = -1;
    const ingredientsLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (ingredientsLocal.meals[id] && ingredientsLocal.meals[id]
      .indexOf(ingredientName) === NOT_FOUND) {
      return true;
    }
    return false;
  };

  const onChangeIngredient = (isMarked, ingredientName) => {
    const input = document.getElementById(ingredientName);
    input.checked = isMarked;
    const ingredientsLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const oldMeals = ingredientsLocal.meals;
    if (isMarked) {
      const ingredientsNotChecked = ingredientsLocal.meals[id]
        .filter((ingredient) => ingredient !== ingredientName);
      const newObject = { ...ingredientsLocal,
        meals: { ...oldMeals, [id]: ingredientsNotChecked } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObject));
      setRender(!render);
    } else {
      const oldIngredients = ingredientsLocal.meals[id];
      const newObject = { ...ingredientsLocal,
        meals: { ...oldMeals, [id]: [...oldIngredients, ingredientName] } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObject));
      setRender(!render);
    }
  };

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
            checked={ isChecked(ingredient) }
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
      <ShareButton />
      <FavoriteButton meal={ meal } />
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
