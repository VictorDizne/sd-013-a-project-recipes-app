import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ title, src, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img src={ src } alt={ title } data-testid={ `${index}-card-img` } />
      <h3 data-testid={ `${index}-card-name` }>{ title }</h3>
    </div>
  );
}

const { string } = PropTypes;

RecipeCard.propTypes = {
  index: string,
  title: string,
  url: string,
}.isRequired;

export default RecipeCard;
