import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecomendedCard({ index, data, thumb, name, id, route, testid }) {
  return (
    <Link style={ { width: '170px', height: '200px', margin: '10px' } } to={ `/${[route]}/${data[id]}` }>
      <div
        data-testid={ testid }
      >
        <img
          data-testid={ `${index}-card-img` }
          alt={ data.strCategory }
          src={ data[thumb] }
          style={ { heigth: '50px', width: '150px' } }
        />
        <p data-testid={ `${index}-recomendation-title` }>{ data[name] }</p>
      </div>
    </Link>
  );
}

RecomendedCard.propTypes = {
  data: PropTypes.shape({
    strCategory: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecomendedCard;
