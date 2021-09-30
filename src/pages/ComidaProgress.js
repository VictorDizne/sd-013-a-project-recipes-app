import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchRecipeById from '../services/fetchRecipeById';
import IngredientsListMeals from '../components/IngredientsListMeals';

function ComidaProgress({ match, history }) {
  const { recipeId } = match.params;

  const [meal, setMeal] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [ingredientList, setIngredientList] = useState([]);
  const [disabledButton, setDisabledButton] = useState(true);
  const [compareCheckBox, setCompareCheckBox] = useState(0);
  const checkboxes = document.querySelectorAll('.checkboxes');

  useEffect(() => {
    const getMeal = async (id) => {
      const result = await fetchRecipeById(id, true);
      setMeal(result);
    };
    getMeal(recipeId);
    setIsLoading(false);
  }, [recipeId]);

  const handleCheckbox = ({ target }, index) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (target.checked === true) {
      setCompareCheckBox(compareCheckBox + 1);
      target.parentElement.style.textDecorationLine = 'line-through';
      target.parentElement.style.textDecorationStyle = 'solid';
      setIngredientList([...ingredientList, target.value]);
      if (inProgressRecipes !== null) {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          ...inProgressRecipes,
          meals: {
            [recipeId]: [...ingredientList, target.value],
          },
        }));
      } else {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          meals: {
            [recipeId]: [...ingredientList, target.value],
          },
        }));
      }
    } else if (target.checked === false) {
      setCompareCheckBox(compareCheckBox - 1);
      target.parentElement.style.textDecorationLine = '';
      target.parentElement.style.textDecorationStyle = '';
      ingredientList.splice(index, 1);
      setIngredientList(ingredientList);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressRecipes,
        meals: {
          [recipeId]: ingredientList,
        },
      }));
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
        <IngredientsListMeals
          handleCheckbox={ handleCheckbox }
          ingredients={ ingredients }
          checkboxes={ checkboxes }
          recipeId={ recipeId }
        />
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
