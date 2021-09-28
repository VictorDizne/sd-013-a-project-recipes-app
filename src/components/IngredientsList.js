import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function IngredientsList(props) {
  console.log(props);
  const { ingredients, handleCheckbox, recipeId } = props;

  const [checkboxesState, setCheckboxesState] = useState([]);

  const checkboxes = document.querySelectorAll('.checkboxes');

  const loadPage = () => {
    const listRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(checkboxes[0])
    console.log(checkboxesState);
    //setCheckboxesState(checkboxes)


    if(listRecipe !== null) {
      console.log('teste1')
      console.log(listRecipe)
      const cocktails = listRecipe.cocktails;
      console.log(cocktails);
      const numberCocktails = Number(Object.keys(cocktails));
      const numberId = Number(recipeId)
      const arrayChecked = Object.values(cocktails)[0];
      if(numberCocktails === numberId) {
        if(checkboxes !== null && checkboxes.length > 0) {
          checkboxes.forEach((checkbox, index) =>  {
            if(checkbox.value = arrayChecked[index]) {
              checkbox.checked = true;
              checkbox.parentElement.style.textDecorationLine = 'line-through';
              checkbox.parentElement.style.textDecorationStyle = 'solid';
            } else {
              checkbox.checked = false;
              checkbox.parentElement.style.textDecorationLine = '';
              checkbox.parentElement.style.textDecorationStyle = '';
            }
          })
        }
      }
    }
  };

  useEffect(() => {
    loadPage();
  }, [])

  const ingredientsArrayList = () => {
    loadPage();
    return (
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
  )};

  return(
    <div>
      {ingredientsArrayList()}
    </div>
    
  )
}


export default IngredientsList;

