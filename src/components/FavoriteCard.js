import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as myFuncHelper from '../services/helpers';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteCard({ checkIsFavorite, item, index, setFavorite }) {
  const [copySuccess, setCopySuccess] = useState('');
  if (!item) {
    return (<h1>Loading</h1>);
  }
  if (item.type === 'comida') {
    return (
      <div
        key={ index }
        style={ { display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' } }
      >
        <Link to={ `/comidas/${item.id}` }>
          <img
            alt={ item.name }
            data-testid={ `${index}-horizontal-image` }
            src={ item.image }
            style={ { heigth: '90px', width: '90px' } }
          />
        </Link>
        <div>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${item.area} - ${item.category}`}
          </p>
          <Link to={ `/comidas/${item.id}` }>
            <p
              data-testid={ `${index}-horizontal-name` }
              style={ { fontSize: '20px' } }
            >
              {item.name}
            </p>
          </Link>
          <div>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ () => myFuncHelper
                .copyToClipBoard(`http://localhost:3000/comidas/${item.id}`, setCopySuccess) }
            >
              <img src={ shareIcon } alt="share-icon" />
              {copySuccess}
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => setFavorite(item.id, item) }
              src={ checkIsFavorite(item.id) ? blackHeartIcon : whiteHeartIcon }
            >
              <img
                src={ checkIsFavorite(item.id) ? blackHeartIcon : whiteHeartIcon }
                alt="favorite-icon"
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      key={ index }
      style={ { display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' } }
    >
      <Link to={ `/bebidas/${item.id}` }>
        <img
          alt={ item.name }
          data-testid={ `${index}-horizontal-image` }
          src={ item.image }
          style={ { heigth: '90px', width: '90px' } }
        />
      </Link>
      <div>
        <p data-testid={ `${index}-horizontal-top-text` }>{item.alcoholicOrNot}</p>
        <Link to={ `/bebidas/${item.id}` }>
          <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
        </Link>
        <div>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            onClick={ () => myFuncHelper
              .copyToClipBoard(`http://localhost:3000/comidas/${item.id}`, setCopySuccess) }
          >
            <img src={ shareIcon } alt="share-icon" />
            {copySuccess}
          </button>
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => setFavorite(item.id, item) }
            src={ checkIsFavorite(item.id) ? blackHeartIcon : whiteHeartIcon }
          >
            <img
              src={ checkIsFavorite(item.id) ? blackHeartIcon : whiteHeartIcon }
              alt="favorite-icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

FavoriteCard.propTypes = {
  checkIsFavorite: PropTypes.func.isRequired,
  item: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  setFavorite: PropTypes.func.isRequired,
};

export default FavoriteCard;
