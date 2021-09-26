import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({ key, name, img, pathName, id }) {
  return (
    <div data-testid={ `${key}-recipe-card` }>
      <Link to={ `${pathName}/${id}` }>
        <img src={ img } data-testid={ `${key}-card-img` } alt={ `${key}` } />
        <h2 data-testid={ `${key}-card-name` }>{ name }</h2>
      </Link>
    </div>
  );
}

RecipeCard.propTypes = {
  key: PropTypes.number,
  name: PropTypes.string,
  img: PropTypes.string,
}.isRequired;

export default RecipeCard;
