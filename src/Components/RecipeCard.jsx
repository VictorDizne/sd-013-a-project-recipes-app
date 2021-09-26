import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ index, name, img }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img src={ img } data-testid={ `${index}-card-img` } alt={ `${index}` } />
      <h2 data-testid={ `${index}-card-name` }>{ name }</h2>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  img: PropTypes.string,
}.isRequired;

export default RecipeCard;
