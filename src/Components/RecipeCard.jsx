import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ key, name, img }) {
  return (
    <div data-testid={ `${key}-recipe-card` }>
      <img src={ img } data-testid={ `${key}-card-img` } alt={ `${key}` } />
      <h2 data-testid={ `${key}-card-name` }>{ name }</h2>
    </div>
  );
}

RecipeCard.propTypes = {
  key: PropTypes.number,
  name: PropTypes.string,
  img: PropTypes.string,
}.isRequired;

export default RecipeCard;
