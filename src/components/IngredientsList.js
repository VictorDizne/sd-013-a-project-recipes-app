import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context';

function IngredientsList({ recipe, disableButton, isMeal, recipeId }) {
  const [ingredientList, setIngredientList] = useState([]);
  const { compareCheckBox, setCompareCheckBox } = useContext(Context);

  const ingredients = () => {
    let i = 1;
    const ingList = [];
    while (recipe[`strIngredient${i}`]) {
      ingList.push(`${recipe[`strIngredient${i}`]}`);
      i += 1;
    }
    return ingList;
  };

  // Funcao para adicionar o localStorage inProgressRecipes
  const addInProgress = (value) => {
    if (!localStorage.inProgressRecipes) {
      const arrayInProgress = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(arrayInProgress));
    }
    const itemProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (isMeal) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...itemProgress,
        meals: {
          [recipeId]: [...ingredientList, value],
        },
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...itemProgress,
        cocktails: {
          [recipeId]: [...ingredientList, value],
        },
      }));
    }
  };

  // Funcao para adicionar o localStorage inProgressRecipes
  const removeInProgress = (index) => {
    const itemProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    ingredientList.splice(index, 1);
    if (isMeal) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...itemProgress,
        meals: {
          [recipeId]: ingredientList,
        },
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...itemProgress,
        cocktails: {
          [recipeId]: ingredientList,
        },
      }));
    }
  };

  // Funcao de clique nos checkboxes
  const handleCheckbox = ({ target }, index) => {
    if (target.checked === true) {
      setCompareCheckBox(compareCheckBox + 1);
      setIngredientList([...ingredientList, target.value]);
      addInProgress(target.value);
    } else if (target.checked === false) {
      setIngredientList(ingredientList);
      setCompareCheckBox(compareCheckBox - 1);
      removeInProgress(index);
    }
    disableButton();
  };

  const ingredientsArrayList = () => {
    const listRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let arrayIngredients = [];
    if (listRecipe !== null) {
      if (isMeal) {
        [arrayIngredients] = [Object.values(listRecipe.meals)];
      } else {
        [arrayIngredients] = [Object.values(listRecipe.cocktails)];
      }
    }
    return (
      <div>
        <h4>Ingredientes</h4>
        <ul>
          {ingredients().map((ingredient, index) => (
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
                  checked={
                    arrayIngredients[0] !== undefined
                && ingredient === arrayIngredients[0][index]
                  }
                  onClick={ ({ target }) => handleCheckbox({ target }, index) }
                />
                {ingredient}
              </label>
            </div>))}
        </ul>
      </div>

    );
  };

  return (
    <>
      {ingredientsArrayList()}
    </>
  );
}

IngredientsList.propTypes = {
  recipe: PropTypes.shape({}).isRequired,
  isMeal: PropTypes.bool.isRequired,
  disableButton: PropTypes.func.isRequired,
  recipeId: PropTypes.string.isRequired,

};

export default IngredientsList;
