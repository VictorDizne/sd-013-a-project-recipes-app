import React from 'react';
import PropTypes from 'prop-types';

function IngredientsListMeals({ ingredients, handleCheckbox }) {
  // setRefs(useRef(React.createRef()))
  /* const [length, setLength] = useState(2);
  const refs = useRef([React.createRef(), React.createRef()]);
  console.log(refs)

  const getIngredientsLength = () => {
    const value = ingredients.filter((ingredient) => typeof ingredient === 'string'
    && ingredient !== '').map((ingredient) => ingredient);
    return value.length;
  }

  const updateLength = (index) => {
    setLength(index);
    refs.current = refs.current.splice(0, index);
    for(let i = 0; i< index; i++) {
      refs.current[i] = refs.current[i] || React.createRef();
    }
    refs.current = refs.current.map((item) => item || React.createRef());
  }

  const loadPage = () => {
    const listRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(refs);
    if(listRecipe !== null) {
      const cocktails = listRecipe.cocktails;
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
    refs.current[refs.current.length - 1].current.focus();
  }, [length]) */

  const ingredientsArrayList = () => {
    const listRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let arrayIngredients = [];
    if (listRecipe.length) {
      [arrayIngredients] = [Object.values(listRecipe.meals)];
    }

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
              // ref={ refs }
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
          </div>))
    );
  };

  return (
    <div>
      {ingredientsArrayList()}
    </div>

  );
}

IngredientsListMeals.propTypes = {
  ingredients: PropTypes.arrayOf([]).isRequired,
  handleCheckbox: PropTypes.func.isRequired,
};

export default IngredientsListMeals;
