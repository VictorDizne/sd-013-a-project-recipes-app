import React from 'react';
import { useSelector } from 'react-redux';

function RecipesList({ type }) {
  const lists = useSelector((state) => state.api.recipesList);
  const name = type === 'Meal' ? 'strMeal' : 'strDrink';
  const thumb = type === 'Meal' ? 'strMealThumb' : 'strDrinkThumb';
  const maxListLength = 12;

  if (!lists) {
    return null;
  }

  return (
    <div>
      <h1>List</h1>
      {
        lists.slice(0, maxListLength).map((list, i) => (
          <div data-testid={ `${i}-recipe-card` } key={ i }>
            <img data-testid={ `${i}-card-img` } src={ list[thumb] } alt="Recipe" />
            <p data-testid={ `${i}-card-name` }>{list[name]}</p>
          </div>
        ))
      }
    </div>
  );
}

export default RecipesList;
