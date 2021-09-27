import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function MealCard({ index, meal: { strMealThumb, strMeal, idMeal } }) {
  return (
    <Link
      to={ `/comidas/${idMeal}` }
    >
      <div data-testid={ `${index}-recipe-card` } className="card">
        <img
          src={ strMealThumb }
          alt={ strMeal }
          data-testid={ `${index}-card-img` }
          className="card-img-top"
        />
        <h3 data-testid={ `${index}-card-name` }>{strMeal}</h3>
      </div>
    </Link>
  );
}

MealCard.propTypes = {
  index: PropTypes.number.isRequired,
  meal: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    idMeal: PropTypes.string,
  }).isRequired,
};

export default MealCard;
