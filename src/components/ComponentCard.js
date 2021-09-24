import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import recipeContext from '../context';

function ComponentCard({ recipeIndex, recipeItem }) {
  const currentContext = useContext(recipeContext).ContextCard;
  const { dataForFetch: { currentPage } } = currentContext;

  const renderCard = (title, thumb) => (
    <div data-testid={ `${recipeIndex}-recipe-card` }>
      <p data-testid={ `${recipeIndex}-card-name` }>{title}</p>
      <img
        data-testid={ `${recipeIndex}-card-img` }
        src={ thumb }
        alt={ title }
        width="100px"
      />
    </div>
  );

  const conditionalCardsRender = () => {
    if (currentPage === 'themealdb') {
      return renderCard(recipeItem.strMeal, recipeItem.strMealThumb);
    }
    if (currentPage === 'thecocktaildb') {
      return renderCard(recipeItem.strDrink, recipeItem.strDrinkThumb);
    }
  };

  return (
    <div>
      { conditionalCardsRender() }
    </div>
  );
}

export default ComponentCard;

ComponentCard.propTypes = {
  recipeIndex: PropTypes.number,
  recipeItem: PropTypes.objectOf(Object),
}.isRequired;
