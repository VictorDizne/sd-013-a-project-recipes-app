import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function DrinkCard({ recipe, index }) {
  function details(id) {
    const toDetails = {
      pathname: `/bebidas/${id}`,
      id,
    };
    return toDetails;
  }
  return (
    <Link to={ () => details(recipe.idDrink) }>
      <button type="button">
        <img
          src={ recipe.strDrinkThumb }
          alt="Recipe thumbnail"
          width="150"
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>
          { recipe.strDrink }
        </p>
      </button>
    </Link>
  );
}

DrinkCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinkCard;
