import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './RecipeCard.css';

function RecipeCard({ type, rec, idx }) {
  const name = type === 'Meal' ? 'strMeal' : 'strDrink';
  const thumb = type === 'Meal' ? 'strMealThumb' : 'strDrinkThumb';
  const URL = type === 'Meal' ? `/comidas/${rec.idMeal}` : `/bebidas/${rec.idDrink}`;

  return (
    <Link to={ URL } key={ idx }>
      <div data-testid={ `${idx}-recipe-card` } className="card-container">
        <p data-testid={ `${idx}-card-name` }>{rec[name]}</p>
        <img data-testid={ `${idx}-card-img` } src={ rec[thumb] } alt="Rec" />
      </div>
    </Link>
  );
}

export default RecipeCard;

RecipeCard.propTypes = {
  type: PropTypes.string.isRequired,
  rec: PropTypes.objectOf(PropTypes.string).isRequired,
  idx: PropTypes.number.isRequired,
};
