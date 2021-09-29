import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchRecipeById from '../services/fetchRecipeById';
import IngredientsListDrink from '../components/IngredientsListDrink';

function BebidasProgress({ match, history }) {
  const { recipeId } = match.params;

  const [drink, setDrink] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [ingredientList, setIngredientList] = useState([]);
  const [disabledButton, setDisabledButton] = useState(true);
  const [compareCheckBox, setCompareCheckBox] = useState(0);
  const checkboxes = document.querySelectorAll('.checkboxes');

  useEffect(() => {
    const getDrink = async (id) => {
      const result = await fetchRecipeById(id, false);
      setDrink(result);
    };
    getDrink(recipeId);
    setIsLoading(false);
  }, [recipeId]);

  const ingredients = [
    drink.strIngredient1,
    drink.strIngredient2,
    drink.strIngredient3,
    drink.strIngredient4,
    drink.strIngredient5,
    drink.strIngredient6,
    drink.strIngredient7,
    drink.strIngredient8,
    drink.strIngredient9,
    drink.strIngredient10,
    drink.strIngredient11,
    drink.strIngredient12,
    drink.strIngredient13,
    drink.strIngredient14,
    drink.strIngredient15,
    drink.strIngredient16,
    drink.strIngredient17,
    drink.strIngredient18,
    drink.strIngredient19,
    drink.strIngredient20,
  ];

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
          cocktails: {
            [recipeId]: [...ingredientList, target.value],
          },
        }));
      } else {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          cocktails: {
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
        cocktails: {
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
        type: 'drink',
        area: '',
        category: drink.strCategory,
        alcoholicOrNot: drink.strAlcoholic,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
        doneDate: drink.dateModified,
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
      <h2 data-testid="recipe-title">{drink.strDrink}</h2>
      <h3 data-testid="recipe-category">{drink.strCategory}</h3>
      <img
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
        data-testid="recipe-photo"
      />
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">S2</button>

      <h4>Ingredientes</h4>
      <ul>
        <IngredientsListDrink
          handleCheckbox={ handleCheckbox }
          ingredients={ ingredients }
          checkboxes={ checkboxes }
          recipeId={ recipeId }
        />
      </ul>

      <h4>Instruções</h4>
      <p data-testid="instructions">{drink.strInstructions}</p>

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

BebidasProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.arrayOf([]).isRequired,
};

export default BebidasProgress;
