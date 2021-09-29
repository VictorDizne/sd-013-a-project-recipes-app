import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RecomendationCard = ({ item, index, pathname, isMeal }) => {
  pathname = isMeal ? `/bebidas/${item.idDrink}` : `/comidas/${item.idMeal}`;

  return (
    <div data-testid={ `${index}-recomendation-card` } key={ index }>
      <Link to={ pathname }>
        <img src={ item.strMealThumb || item.strDrinkThumb } alt={ index } />
        <h2>{ item.strMeal || item.strDrink }</h2>
      </Link>
    </div>
  );
};

RecomendationCard.propTypes = {
  item: PropTypes.shape({
    idMeal: PropTypes.number,
    idDrink: PropTypes.number,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
  }),
  index: PropTypes.number.isRequired,
  pathname: PropTypes.string.isRequired,
  isMeal: PropTypes.bool.isRequired,
};

RecomendationCard.defaultProps = {
  item: {
    idMeal: null,
    idDrink: null,
    strMealThumb: null,
    strDrinkThumb: null,
    strMeal: null,
    strDrink: null,
  },
};

export default RecomendationCard;
