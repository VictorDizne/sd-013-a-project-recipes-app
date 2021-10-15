import React, { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const FavoriteCard = ({ recipe, index, markFavorite }) => {
  const [copiado, setCopiado] = useState('');
  const [heartIcon] = useState(blackHeartIcon);
  const history = useHistory();

  function copyText(id, type) {
    if (type === 'comida') {
      clipboardCopy(`http://localhost:3000/comidas/${id}`);
    } else {
      clipboardCopy(`http://localhost:3000/bebidas/${id}`);
    }
    setCopiado('Link copiado!');
  }

  if (recipe.type === 'bebida') {
    return (
      <button className="favoriteCard" type="button">
        <button
          type="button"
          className="no-style-btn"
          onClick={ () => history.push(`/bebidas/${recipe.id}`) }
        >
          <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
          <img
            className="imgFavorite"
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
        </button>
        <h3
          data-testid={ `${index}-horizontal-top-text` }
        >
          {`${recipe.alcoholicOrNot} - ${recipe.category}`}
        </h3>
        <button
          type="button"
          className="no-style-btn"
          onClick={ () => copyText(recipe.id, recipe.type) }
        >
          <img
            src={ shareIcon }
            alt="Botão de compartilhar"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        <button
          type="button"
          className="no-style-btn"
          onClick={ () => markFavorite(recipe.id) }
        >
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ heartIcon }
            alt="Botão de favoritar"
          />
        </button>
        <p>{copiado}</p>
      </button>
    );
  }

  return (
    <button className="favoriteCard" type="button">
      <button
        type="button"
        className="no-style-btn"
        onClick={ () => history.push(`/comidas/${recipe.id}`) }
      >
        <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
        />
      </button>
      <h3
        data-testid={ `${index}-horizontal-top-text` }
      >
        {`${recipe.area} - ${recipe.category}`}
      </h3>
      <button
        type="button"
        className="no-style-btn"
        onClick={ () => copyText(recipe.id, recipe.type) }
      >
        <img
          src={ shareIcon }
          alt="Botão de compartilhar"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      <button
        type="button"
        className="no-style-btn"
        onClick={ () => markFavorite(recipe.id) }
      >
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ heartIcon }
          alt="Botão de favoritar"
        />
      </button>
      <p>{copiado}</p>
    </button>
  );
};

FavoriteCard.propTypes = {
  recipe: PropTypes.object,
  index: PropTypes.number,
  markFavorite: PropTypes.func,
}.isRequired;

export default FavoriteCard;
