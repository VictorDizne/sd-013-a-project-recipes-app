import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchMealById from '../services/fetchMealById';

function ComidaProgress({ match, history }) {
  const { recipeId } = match.params;

  const [meal, setMeal] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [ingredientList, setIngredientList] = useState([]);
  const [disabledButton, setDisabledButton] = useState(true);
  const [compareCheckBox, setCompareCheckBox] = useState(0);
  const checkboxes = document.querySelectorAll('.checkboxes');

  /* const loadPage = () => {
    const checkboxes = document.querySelectorAll('.checkboxes');
    const listRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if(listRecipe !== null) {
      const cocktails = listRecipe.cocktails;
      const numberCocktails = Number(Object.keys(cocktails));
      const numberId = Number(recipeId)
      const arrayChecked = Object.values(cocktails)[0];
      let compareCheckBoxes = 0;
      if(numberCocktails === numberId) {
        if(checkboxes !== null && checkboxes.length > 0) {
          checkboxes.forEach((checkbox, index) =>  {
            if(checkbox.value = arrayChecked[index]) {
              checkbox.checked = true;
              checkbox.parentElement.style.textDecorationLine = 'line-through';
              checkbox.parentElement.style.textDecorationStyle = 'solid';
              compareCheckBoxes += 1;
            } else {
              checkbox.checked = false;
              checkbox.parentElement.style.textDecorationLine = '';
              checkbox.parentElement.style.textDecorationStyle = '';
            }
          })
          if(compareCheckBoxes === checkboxes.length) {
            setDisabledButton(false);
          } else {
            setDisabledButton(true);
          }
        }
      }
    }
  }; */

  useEffect(() => {
    const getMeal = async (id) => {
      const result = await fetchMealById(id);
      setMeal(result);
    };
    getMeal(recipeId);
    setIsLoading(false);
    // loadPage();
  }, [recipeId]);

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

  const handleCheckbox = ({ target }, index) => {
    console.log(checkboxes.length);
    console.log(compareCheckBox);
    if (target.checked === true) {
      setCompareCheckBox(compareCheckBox + 1);
      target.parentElement.style.textDecorationLine = 'line-through';
      target.parentElement.style.textDecorationStyle = 'solid';
      setIngredientList([...ingredientList, target.value]);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {
          [recipeId]: [...ingredientList, target.value],
        },
      }));
    } else if (target.checked === false) {
      setCompareCheckBox(compareCheckBox - 1);
      target.parentElement.style.textDecorationLine = '';
      target.parentElement.style.textDecorationStyle = '';
      ingredientList.splice(index, 1);
      setIngredientList(ingredientList);
    }
    if (compareCheckBox === checkboxes.length - 1) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };

  const handleOnClick = () => {
    const arrayList = [
      {
        id: recipeId,
        type: 'meal',
        area: '',
        category: meal.strCategory,
        alcoholicOrNot: meal.strAlcoholic,
        name: meal.strMeal,
        image: meal.strMealThumb,
        doneDate: meal.dateModified,
        tags: '',
      },
    ];
    localStorage.setItem('doneRecipes', JSON.stringify(arrayList));
    history.push('/receitas-feitas');
  };

  const ingredientsArrayList = () => (
    ingredients.filter((ingredient) => typeof ingredient === 'string'
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
              className="checkboxes"
              value={ ingredient }
              id={ index }
              type="checkbox"
              onClick={ ({ target }) => handleCheckbox({ target }, index) }
            />
            {ingredient}
          </label>
        </div>))
  );

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
        { ingredientsArrayList() }
        { /* ingredients.filter((ingredient) => typeof ingredient === 'string'
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
                  onClick={ ({ target }) => handleCheckbox({ target }, index) }
                />
                {ingredient}
              </label>
          </div>)) */}
      </ul>

      <h4>Instruções</h4>
      <p data-testid="instructions">{meal.strInstructions}</p>

      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleOnClick }
        disabled={ disabledButton }
      >
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
  history: PropTypes.arrayOf({}).isRequired,
};

export default ComidaProgress;
