import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function IngredientsDrinkCard({ ingredient, index, onClick }) { // componente montado para renderizar os ingredientes tanto de bebidas quanto de comidas
  return (
    <Link
      to="/bebidas"
      onClick={ onClick }
      type="button"
      className="ingredients-container"
      data-testid={ `${index}-ingredient-card` }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` }
        alt={ ingredient }
      />
      <span
        className="ingredientName"
        data-testid={ `${index}-card-name` }
      >
        { ingredient }
      </span>
    </Link>
  );
}

IngredientsDrinkCard.propTypes = ({
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
});

export default IngredientsDrinkCard;
