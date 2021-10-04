import React from 'react';
import PropTypes from 'prop-types';

const DrinksRecomendationCard = (drink, indice) => (
  <section>
    <div
      className="recomended-drinks-card"
      data-testid={ `${indice}-recomendation-card` }
    />
    <div className="recomended-card" data-testid={ `${indice}-recomendation-card` }>
      <img src={ drink.strDrinkThumb } alt="drink" data-testid={ `${indice}-card-img` } />
      <p data-testid={ `${indice}-card-name` }>{ drink.strDrink }</p>
    </div>
  </section>
);
DrinksRecomendationCard.propTypes = {
  drink: PropTypes.shape({
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
};
export default DrinksRecomendationCard;
