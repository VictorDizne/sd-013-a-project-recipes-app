import React from 'react';
import PropTypes from 'prop-types';

function FoodCard({ data, index, thumb }) {
  return (
    <div
      style={ { width: '48%', height: '70px' } }
      data-testid={ `${index}-recipe-card` }
    >
      <img
        data-testid={ `${index}-card-img` }
        alt={ data.strCategory }
        src={ data[thumb] }
        style={ { heigth: '50px', width: '50px' } }
      />
      <p data-testid={ `${index}-card-name` }>{ data.strCategory }</p>
    </div>
  );
}

FoodCard.propTypes = {
  data: PropTypes.shape({
    strCategory: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default FoodCard; //
