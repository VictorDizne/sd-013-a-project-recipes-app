import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { shareMealHelper } from '../services/helpers';
import shareIcon from '../images/shareIcon.svg';

function DoneDrinkCard({ recipe, index }) {
  const { id, alcoholicOrNot, name, image, doneDate } = recipe;
  const [messageAlert, setMessageAlert] = useState('');
  const history = useHistory();

  const shareRecipe = () => {
    shareMealHelper(id, setMessageAlert);
  };

  const sendToDetailsPage = () => {
    history.push(`/bebidas/${id}`);
  };

  return (
    <div>
      <p>{messageAlert}</p>
      <button
        type="button"
        onClick={ shareRecipe }
      >
        <img
          src={ shareIcon }
          alt="Share Icon"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      <button
        type="button"
        onClick={ sendToDetailsPage }
      >
        <img
          src={ image }
          alt={ `foto de ${name}` }
          data-testid={ `${index}-horizontal-image` }
          width="80px"
        />
      </button>
      <p data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</p>
      <button
        type="button"
        onClick={ sendToDetailsPage }
      >
        <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
      </button>
      <p data-testid={ `${index}-horizontal-done-date` }>{`Feita em ${doneDate}`}</p>
    </div>
  );
}

DoneDrinkCard.propTypes = {
  recipe: PropTypes.object,
  index: PropTypes.number,
  alcoholicOrNot: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  doneDate: PropTypes.string,
}.isRequired;

export default DoneDrinkCard;
