import React from 'react';
import PropTypes from 'prop-types';

function Card({ index, recipeImage, recipeName }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ recipeImage }
        alt={ recipeName }
        data-testid={ `${index}-card-img` }
      />

      <div data-testid={ `${index}-card-name` }>
        { recipeName }
      </div>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  recipeImage: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  // key: PropTypes.string.isRequired,
  // recipe: PropTypes.shape().isRequired,
};

export default Card;
