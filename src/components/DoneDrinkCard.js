import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function DoneDrinkCard({ recipe, index }) {
  const { alcoholicOrNot, category, name, image, doneDate } = recipe;

  return (
    <div>
      <img
        src={ shareIcon }
        alt="Share Icon"
        data-testid={ `${index}-horizontal-share-btn` }
      />
      <img
        src={ image }
        alt={ `foto de ${name}` }
        data-testid={ `${index}-horizontal-image` }
      />
      <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>
      <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
      <p>{ alcoholicOrNot }</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{`Feita em ${doneDate}`}</p>
    </div>
  );
}

DoneDrinkCard.propTypes = {
  recipe: PropTypes.object,
  index: PropTypes.number,
  alcoholicOrNot: PropTypes.string,
  category: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  doneDate: PropTypes.string,
}.isRequired;

export default DoneDrinkCard;
