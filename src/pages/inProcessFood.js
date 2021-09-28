import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import appContext from '../contexts/appContext';
import ShareButton from '../components/shareButton';
import FavoriteButton from '../components/favoriteButton';

function ProcessFood() {
  const [meal, setMeal] = useState({});
  const [check, setCheck] = useState(true);
  const { getIngredients } = useContext(appContext);
  const history = useHistory();
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
    if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: { [id]: [] }, cocktails: {},
      }));
    }
  }, [id]);

  const isFinishDisabled = () => {
    const ingredientsLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (ingredientsLocal === null) {
      return false;
    }
    const currentIngredients = ingredientsLocal.meals[id];
    return (currentIngredients.length === ingredients.length);
  };

  const finishRecipe = () => {
    const currentDate = new Date();
    const createDate = `${currentDate
      .getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`;
    const { idMeal, strArea, strCategory, strMeal, strMealThumb, strTags } = meal;
    const mealFinished = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: createDate,
      tags: [strTags],
    };
    if (!JSON.parse(localStorage.getItem('doneRecipes'))) {
      localStorage.setItem('doneRecipes', JSON.stringify([mealFinished]));
    } else {
      const oldDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      localStorage.setItem(
        'doneRecipes', JSON.stringify([...oldDoneRecipes, mealFinished]),
      );
    }
    return history.push('/receitas-feitas');
  };

  const isChecked = (ingredientName) => {
    const NOT_FOUND = -1;
    const ingredientsLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (ingredientsLocal.meals[id] && ingredientsLocal.meals[id]
      .indexOf(ingredientName) !== NOT_FOUND) {
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
      const oldIngredients = ingredientsLocal.meals[id];
      const newObject = { ...ingredientsLocal,
        meals: { ...oldMeals, [id]: [...oldIngredients, ingredientName] } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObject));
    } else {
      const ingredientsNotChecked = ingredientsLocal.meals[id]
        .filter((ingredient) => ingredient !== ingredientName);
      const newObject = { ...ingredientsLocal,
        meals: { ...oldMeals, [id]: ingredientsNotChecked } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObject));
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
            onChange={ (e) => {
              onChangeIngredient(e.target.checked, e.target.value);
              setCheck(!check);
            } }
          />
        </label>
      ))}
      <p data-testid="instructions">{ meal.strInstructions }</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !isFinishDisabled() }
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProcessFood;
