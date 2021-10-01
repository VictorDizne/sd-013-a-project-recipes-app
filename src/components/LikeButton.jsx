import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { isThisRecipeFavorited } from '../services/localStorageFunctions';
import formatedFavoriteRecipe from '../helpers/formatedFavoriteRecipe';
import { whiteHeartIcon, blackHeartIcon } from '../images';

function LikeButton({ recipe, id, favOrDone = false, idx }) {
  const [heartType, setHeartType] = useState();
  const [heartAlt, setHeartAlt] = useState();

  const addToFavorites = (thisRecipe) => {
    if (localStorage.favoriteRecipes) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const oneMoreFav = [...favoriteRecipes, thisRecipe];
      localStorage.setItem('favoriteRecipes', JSON.stringify(oneMoreFav));
    }
  };

  const removeFromFavorites = () => {
    if (localStorage.favoriteRecipes) {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const lessOneFav = favorites.filter((favorite) => favorite.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(lessOneFav));
    }
  };

  const handleClick = () => {
    // se esta receita estiver com coração branco, adiciona ela no localStorage e trnasforma o coração em preto
    if (heartType === whiteHeartIcon) {
      addToFavorites(() => formatedFavoriteRecipe(recipe));
      setHeartType(blackHeartIcon);
      setHeartAlt('black');
    }
    // se esta receita estiver com coração preto, remove ela dos favoritos e transforma o coração em branco
    if (heartType === blackHeartIcon) {
      removeFromFavorites();
      setHeartType(whiteHeartIcon);
      setHeartAlt('white');
    }
  };

  useEffect(() => {
    if (isThisRecipeFavorited(id)) {
      setHeartType(blackHeartIcon);
    } else {
      setHeartType(whiteHeartIcon);
    }
  }, [heartType, id]);

  return (
    <section>
      <button
        className="favBtn"
        type="button"
        data-testid={ favOrDone ? `${idx}-horizontal-favorite-btn` : 'favorite-btn' }
        onClick={ handleClick }
      >
        <img src={ heartType } alt={ `${heartAlt}heart` } />
      </button>
    </section>
  );
}

const { object, string, bool } = PropTypes;

LikeButton.propTypes = {
  recipe: object,
  id: string,
  favOrDone: bool,
  idx: string,
}.isRequired;

export default LikeButton;
