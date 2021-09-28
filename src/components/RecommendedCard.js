import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom';

function RecommendedCard({ iterator, recommended }) {
  const location = useLocation();
  const { pathname } = location;

  const recipes = {};

  const styleLi = {
    display: 'inline-block',
    textAlign: 'center',
    padding: '14px',
    textDecoration: 'none',
    width: '50%',
  };

  if (pathname.includes('comidas')) {
    recipes.title = recommended.strDrink;
    recipes.category = recommended.strAlcoholic;
    recipes.image = recommended.strDrinkThumb;
  } else {
    recipes.title = recommended.strMeal;
    recipes.category = recommended.strCategory;
    recipes.image = recommended.strMealThumb;
  }
  return (
    <li
      key={ iterator }
      data-testid={ `${iterator}-recomendation-card` }
      style={ styleLi }
    >
      <img src={ `${recipes.image}/preview` } width="100px" alt={ recipes.title } />
      <p>{recipes.category}</p>
      <h3 data-testid={ `${iterator}-recomendation-title` }>{recipes.title}</h3>
    </li>
  );
}

RecommendedCard.propTypes = {
  iterator: PropTypes.number.isRequired,
  recommended: PropTypes.shape({
    strAlcoholic: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
};

export default RecommendedCard;
