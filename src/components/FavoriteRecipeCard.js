import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { shareMealHelper } from '../services/helpers';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipeCard({ recipe, index, handleClickNotFavorite }) {
  const { id, type, category, name, image, area, alcoholicOrNot } = recipe;
  const [messageAlert, setMessageAlert] = useState('');
  const history = useHistory();

  const shareRecipe = () => {
    shareMealHelper(id, setMessageAlert);
  };

  const sendToDetailsPage = () => {
    history.push(`/${type}s/${id}`);
  };

  return (
    <div className="card">
      <button
        type="button"
        onClick={ sendToDetailsPage }
        className="card-img"
      >
        <img
          src={ image }
          alt={ `foto de ${name}` }
          data-testid={ `${index}-horizontal-image` }
        />
      </button>

      <div className="card-text">
        <p data-testid={ `${index}-horizontal-top-text` }>
          {(type === 'comida') ? `${area} - ${category}` : `${alcoholicOrNot}`}
        </p>

        <button
          type="button"
          onClick={ sendToDetailsPage }
          className="card-title"
        >
          <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
        </button>

        <p>{messageAlert}</p>

        <button
          type="button"
          onClick={ shareRecipe }
          className="card-buttons"
        >
          <img
            src={ shareIcon }
            alt="Share Icon"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>

        <button
          type="button"
          onClick={ () => handleClickNotFavorite(id) }
          className="card-buttons"
        >
          <img
            src={ blackHeartIcon }
            alt="heart"
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
        </button>
      </div>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.object,
  index: PropTypes.number,
  category: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  area: PropTypes.string,
  alcoholicOrNot: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default FavoriteRecipeCard;
