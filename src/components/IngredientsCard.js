import React,{ useState } from 'react';
import PropTypes from 'prop-types';

function IngredientsCard({index, ingredientImg, ingredientName }) {
  return (
    <div
      data-testid={`${index}-ingredient-card`}
      style={{ margin:'1%', width: '48%', border: '1px solid black' }}   
    >
      <img
        src={ ingredientImg }
        alt={ingredientName}
        data-testid={`${index}-card-img`}
        style={ { width: '50px' }}
      />
      <h5 data-testid={`${index}-card-name`}>{ingredientName}</h5>
    </div>
  );
} 

IngredientsCard.propTypes = {
  index: PropTypes.string,
  ingredientImg: PropTypes.string,
  ingredientName: PropTypes.string,
}.isRequired;

export default IngredientsCard;
