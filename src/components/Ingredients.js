import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Ingredients({ recipe, isMeal }) {
  const verifyMeal = (checked, indexIng, id, inProgressRecipes) => {
    if (checked) {
      const updatedMeals = {
        ...inProgressRecipes,
        meals: {
          ...inProgressRecipes.meals,
          [id]: inProgressRecipes.meals[id]
            ? [...inProgressRecipes.meals[id], indexIng] : [indexIng],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(updatedMeals));
    } else {
      const removedIngredient = inProgressRecipes.meals[id]
        .filter((ingredient) => ingredient !== indexIng);

      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressRecipes,
        meals: {
          ...inProgressRecipes.meals,
          [id]: removedIngredient,
        },
      }));
    }
  };
  const verifyDrink = (checked, indexIng, id, inProgressRecipes) => {
    if (checked) {
      const updatedCocktails = {
        ...inProgressRecipes,
        cocktails: {
          ...inProgressRecipes.cocktails,
          [id]: inProgressRecipes.cocktails[id]
            ? [...inProgressRecipes.cocktails[id], indexIng] : [indexIng],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(updatedCocktails));
    } else {
      const removedIngredient = inProgressRecipes.cocktails[id]
        .filter((ingredient) => ingredient !== indexIng);

      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressRecipes,
        cocktails: {
          ...inProgressRecipes.cocktails,
          [id]: removedIngredient,
        },
      }));
    }
  };

  const verifyChecked = (event, indexIng, id) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (isMeal) {
      verifyMeal(event.target.checked, indexIng, id, inProgressRecipes);
    } else {
      verifyDrink(event.target.checked, indexIng, id, inProgressRecipes);
    }
  };

  const [recipeIngredients, setRecipeIngredients] = useState([]);

  useEffect(() => {
    const getIngredients = () => {
      // console.log(recipe, 'recipe');
      const entries = Object.entries(recipe);

      if (entries.length) {
        const ingredients = entries
          .filter(([chave, valor]) => chave.includes('strIngredient') && valor)
          .map(([, valor]) => (
            { name: valor }
          ));

        const measures = entries
          .filter(([chave, valor]) => chave.includes('strMeasure') && valor)
          .map(([, valor]) => (
            { measure: valor }
          ));

        const ingredientsAndMeasures = ingredients
          .map((ingredient, index) => ({ ...ingredient, ...measures[index] }));

        // console.log(ingredientsAndMeasures, 'marcação!!!');
        setRecipeIngredients(ingredientsAndMeasures);
      }
    };
    getIngredients();
  }, [recipe]);

  return (
    <ul>
      {recipeIngredients.map((ingredient, i) => (
        <label
          htmlFor={ `${i}-ingredient-step` }
          key={ `${ingredient.name} ${i}` }
          data-testid={ `${i}-ingredient-step` }
        >
          <input
            name={ `${i}-ingredient-step` }
            id={ `${i}-ingredient-step` }
            type="checkbox"
            onClick={ (event) => {
              verifyChecked(event, i, recipe.idMeal || recipe.idDrink);
            } }
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
