import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({ index, name, img, pathName, id }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <Link to={ `${pathName}${id}` }>
        <img src={ img } data-testid={ `${index}-card-img` } alt={ `${index}` } />
        <h2 data-testid={ `${index}-card-name` }>{ name }</h2>
      </Link>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  img: PropTypes.string,
}.isRequired;

export default RecipeCard;
