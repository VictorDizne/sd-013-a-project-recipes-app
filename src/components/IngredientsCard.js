import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function IngredientsCard({ index, ingredient, ingredientImg, ingredientName, page }) {
  return (
    <Link
      style={ { margin: '1%', width: '48%', border: '1px solid black' } }
      to={ { pathname: `/${page}`, query: { ingredient } } }
    >
      <div
        data-testid={ `${index}-ingredient-card` }
      >
        <img
          src={ ingredientImg }
          alt={ ingredientName }
          data-testid={ `${index}-card-img` }
          style={ { width: '50px' } }
        />
        <h5 data-testid={ `${index}-card-name` }>{ingredientName}</h5>
      </div>
    </Link>
  );
}

IngredientsCard.propTypes = {
  index: PropTypes.string,
  ingredientImg: PropTypes.string,
  ingredientName: PropTypes.string,
}.isRequired;

export default IngredientsCard;
