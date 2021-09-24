import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function FoodCard({ index, data, thumb, name, id, route }) {
  return (
    <Link style={ { width: '48%', height: '70px' } } to={ `/${[route]}/${data[id]}` }>
      <div
        // style={ { width: '48%', height: '70px' } }
        data-testid={ `${index}-recipe-card` }
      >
        <img
          data-testid={ `${index}-card-img` }
          alt={ data.strCategory }
          src={ data[thumb] }
          style={ { heigth: '50px', width: '50px' } }
        />
        <p data-testid={ `${index}-card-name` }>{ data[name] }</p>
      </div>
    </Link>
  );
}

FoodCard.propTypes = {
  data: PropTypes.shape({
    strCategory: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

export default FoodCard; //
