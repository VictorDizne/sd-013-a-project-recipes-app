import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

function ComponentDetailsCard({ detailItem, renderIngredients }) {
  const history = useHistory();
  const handlePage = history.location.pathname.includes('/comidas');

  const renderMeal = () => {
    const video = detailItem.strYoutube.replace('watch?v=', 'embed/');
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ detailItem.strMealThumb }
          alt={ detailItem.strMeal }
        />
        <button type="button" data-testid="share-btn">
          Compartilhar
        </button>
        <button type="button" data-testid="favorite-btn">
          Favoritar
        </button>
        <h1 data-testid="recipe-title">{detailItem.strMeal}</h1>
        <h4 data-testid="recipe-category">{detailItem.strCategory}</h4>
        {renderIngredients()}
        <p data-testid="instructions">{detailItem.strInstructions}</p>
        <iframe
          data-testid="video"
          width="560"
          height="315"
          src={ video }
          title={ detailItem.strMeal }
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write;
        encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  };

  const renderDrink = () => (
    <div>
      <img
        data-testid="recipe-photo"
        src={ detailItem.strDrinkThumb }
        alt={ detailItem.strDrink }
      />
      <button type="button" data-testid="share-btn">
        Compartilhar
      </button>
      <button type="button" data-testid="favorite-btn">
        Favoritar
      </button>
      <h1 data-testid="recipe-title">{detailItem.strDrink}</h1>
      <h4 data-testid="recipe-category">
        {detailItem.strCategory}
        ,
        {' '}
        {detailItem.strAlcoholic}
      </h4>
      {renderIngredients()}
      <p data-testid="instructions">{detailItem.strInstructions}</p>
    </div>
  );

  return (
    <div>
      {handlePage ? renderMeal() : renderDrink()}
    </div>
  );
}

ComponentDetailsCard.propTypes = {
  detailItem: PropTypes.objectOf(Object).isRequired,
  renderIngredients: PropTypes.func.isRequired,
};

export default ComponentDetailsCard;
