import PropTypes from 'prop-types';
import React from 'react';

function ComponentDetailsCard({ detailItem }) {
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ detailItem.strMealThumb }
        alt={ detailItem.strMeal }
      />
      <h1 data-testid="recipe-title">{detailItem.strMeal}</h1>
      <h4 data-testid="recipe-category">{detailItem.strCategory}</h4>
      <p data-testid="instructions">{detailItem.strInstructions}</p>
      <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ detailItem.strYoutube }
        title={ detailItem.strMeal }
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write;
        encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

ComponentDetailsCard.propTypes = {
  detailItem: PropTypes.objectOf(Object).isRequired,
};

export default ComponentDetailsCard;
