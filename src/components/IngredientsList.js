import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context';

function IngredientsList({ recipe, disableButton, isMeal, recipeId }) {
  const [ingredientList, setIngredientList] = useState([]);
  const { compareCheckBox, setCompareCheckBox,
    setIngredientsLength } = useContext(Context);

  const ingredients = () => {
    let i = 1;
    const ingList = [];
    while (recipe[`strIngredient${i}`]) {
      ingList.push(`${recipe[`strIngredient${i}`]}`);
      i += 1;
    }
    setIngredientsLength(ingList.length);
    return ingList;
  };

  useEffect(() => {
    const createLocalStore = () => {
      if (!localStorage.inProgressRecipes) {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          meals: {},
          cocktails: {},
        }));
      }
      const itemProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (itemProgress.cocktails[recipeId] !== undefined
        || itemProgress.meals[recipeId] !== undefined) {
        if (isMeal) {
          setIngredientList(itemProgress.meals[recipeId]);
          setCompareCheckBox(itemProgress.meals[recipeId].length);
        } else {
          setIngredientList(itemProgress.cocktails[recipeId]);
          setCompareCheckBox(itemProgress.cocktails[recipeId].length);
        }
      }
    };
    createLocalStore();
  }, [isMeal, recipeId, setCompareCheckBox]);

  // Funcao para adicionar o localStorage inProgressRecipes
  const addInProgress = (value) => {
    const itemProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (isMeal) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...itemProgress,
        meals: {
          ...itemProgress.meals,
          [recipeId]: [...ingredientList, value],
        },
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...itemProgress,
        cocktails: {
          ...itemProgress.cocktails,
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
          ...itemProgress.meals,
          [recipeId]: ingredientList,
        },
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...itemProgress,
        cocktails: {
          ...itemProgress.cocktails,
          [recipeId]: ingredientList,
        },
      }));
    }
  };

  // Funcao de clique nos checkboxes
  const handleCheckbox = ({ target }, index) => {
    if (target.checked === true) {
      console.log(compareCheckBox);
      setCompareCheckBox(compareCheckBox + 1);
      setIngredientList([...ingredientList, target.value]);
      addInProgress(target.value);
    } else if (target.checked === false) {
      ingredientList.splice(index, 1);
      setIngredientList(ingredientList);
      setCompareCheckBox(compareCheckBox - 1);
      removeInProgress(index);
    }
    disableButton();
  };

  const ingredientsArrayList = () => {
    const itemProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let arrayIngredients = [];
    if (itemProgress !== null && (itemProgress.cocktails[recipeId] !== undefined
      || itemProgress.meals[recipeId] !== undefined)) {
      if (isMeal) {
        arrayIngredients = itemProgress.meals[recipeId];
      } else {
        arrayIngredients = itemProgress.cocktails[recipeId];
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
                  checked={ ingredient === arrayIngredients[index] }
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
