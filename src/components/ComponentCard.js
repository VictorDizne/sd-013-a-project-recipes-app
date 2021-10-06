import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import recipeContext from '../context';

function ComponentCard({ recipeIndex, recipeItem }) {
  const currentContext = useContext(recipeContext).ContextCard;
  const { setCurrentID, dataForFetch: { currentPage } } = currentContext;

  const renderCard = (title, thumb, id) => (
    <button className="button-card" type="button" onClick={ () => setCurrentID(id) }>
      <div className="card-img-contain" data-testid={ `${recipeIndex}-recipe-card` }>
        <img
          data-testid={ `${recipeIndex}-card-img` }
          src={ thumb }
          alt={ title }
          loading="lazy"
          width="130px"
        />
        <div className="recipe-title">
          <p data-testid={ `${recipeIndex}-card-name` }>{title}</p>
        </div>
      </div>
    </button>
  );

  const conditionalCardsRender = () => {
    if (currentPage === 'themealdb') {
      return renderCard(recipeItem.strMeal, recipeItem.strMealThumb, recipeItem.idMeal);
    }
    if (currentPage === 'thecocktaildb') {
      return renderCard(recipeItem.strDrink,
        recipeItem.strDrinkThumb, recipeItem.idDrink);
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
