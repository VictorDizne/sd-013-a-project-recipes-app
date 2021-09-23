import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({
  page,
  index,
  recipe: { strMeal, strMealThumb, strDrink, strDrinkThumb },
}) {
  return (
    <div data-testid={ `${index}-recipe-card` } className="contente">
      <img
        src={ (page === 'foods') ? strMealThumb : strDrinkThumb }
        data-testid={ `${index}-card-img` }
        alt="Imagem da receita"
      />
      <p data-testid={ `${index}-card-name` }>
        { (page === 'foods') ? strMeal : strDrink }
      </p>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number,
}.isRequired;

export default RecipeCard;
