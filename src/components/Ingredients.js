import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Ingredients({ recipe, isMeal }) {
  const verifyChecked = (event, indexIng, id) => {
    console.log(event.target.checked);
    console.log(id);

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (event.target.checked === true && isMeal) {
      const updatedMeals = {
        ...inProgressRecipes,
        meals: {
          [id]: inProgressRecipes.meals[id]
            ? [...inProgressRecipes.meals[id], indexIng] : [indexIng],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(updatedMeals));
    } else if (event.target.checked === false || !isMeal) {
      const updatedCocktails = {
        ...inProgressRecipes,
        cocktails: {
          [id]: inProgressRecipes.cocktails[id]
            ? [...inProgressRecipes.cocktails[id], indexIng] : [indexIng],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(updatedCocktails));
    }
  };

  const [recipeIngredients, setRecipeIngredients] = useState([]);

  useEffect(() => {
    const getIngredients = () => {
      const MAX_INGREDIENTS = 16;
      console.log(recipe, 'recipe');

      const entries = Object.entries(recipe);

      if (entries.length) {
        const ingredients = entries
          .filter(([chave, valor]) => chave.includes('strIngredient') && valor)
          .map(([chave, valor]) => (
            { [chave]: valor }
          ));

        console.log(ingredients, 'marcação!!!');

      }
      // for (let i = 0; i < MAX_INGREDIENTS; i += 1) {
      //   const auxObj = { name: '', measure: '' };

      //   if (recipe[`strIngredient${i}`]) {
      //     auxObj.name = recipe[`strIngredient${i}`];
      //     auxObj.measure = recipe[`strMeasure${i}`];
      //     setRecipeIngredients([...recipeIngredients, auxObj]);
      //   }
      // }
    };
    getIngredients();
  }, [recipe]);

  return (
    <ul>
      {recipeIngredients.map((ingredient, i) => (
        <label
          htmlFor={`${i}-ingredient-step`}
          key={`${ingredient.name} ${i}`}
          data-testid={`${i}-ingredient-step`}
        >
          <input
            type="checkbox"
            onClick={(event) => {
              verifyChecked(event, i, recipe.idMeal || recipe.idDrink);
            }}
          />
          {`${ingredient.name} ${ingredient.measure}`}
        </label>
      ))}
    </ul>
  );
}

Ingredients.propTypes = {
  recipe: PropTypes.shape(),
}.isRequired;

export default Ingredients;
