import React from 'react';
import PropTypes from 'prop-types';
import '../css/Img.css';

function Img({ meal, recipe }) {
  return (
    <img
      src={ meal ? recipe.strMealThumb : recipe.strDrinkThumb }
      alt={ meal ? recipe.strMeal : recipe.strDrink }
      className="imgDetails img-fluid"
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
