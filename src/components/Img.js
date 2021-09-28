import React from 'react';

function Img(meal, recipe) {
  return (
    <img
      src={ meal ? recipe.strMealThumb : recipe.strDrinkThumb }
      alt={ meal ? recipe.strMeal : recipe.strDrink }
      className="img-fluid"
      data-testid="recipe-photo"
    />
  );
}

export default Img;
