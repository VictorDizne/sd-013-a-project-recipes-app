import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ title, url }) {
  return (
    <div>
      <img src={ url } alt={ title } />
      <h3>{ title }</h3>
    </div>
  );
}

const { string } = PropTypes;

RecipeCard.propTypes = {
  title: string,
  url: string,
}.isRequired;

export default RecipeCard;
