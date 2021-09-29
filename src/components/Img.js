import React from 'react';
import PropTypes from 'prop-types';

function Img({ meal, recipe }) {
  return (
    <img
      src={ meal ? recipe.strMealThumb : recipe.strDrinkThumb }
      alt={ meal ? recipe.strMeal : recipe.strDrink }
      className="img-fluid"
      data-testid="recipe-photo"
    />
  );
}

Img.propTypes = {
  meal: PropTypes.bool.isRequired,
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
  }),
};

Img.defaultProps = {
  recipe: {},
};

export default Img;
