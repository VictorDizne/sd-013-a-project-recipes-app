import React, { useContext, useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import appContext from '../contexts/appContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const FavoriteButton = ({ drink, meal }) => {
  const { favoriteRecipe, removeFavRecipe, verify } = useContext(appContext);
  const [favorited, setFavorited] = useState(false);
  const onClick = () => (favorited
    ? removeFavRecipe(drink, meal) : favoriteRecipe(drink, meal));

  useEffect(() => {
    const ONE_SECOND = 1000;
    setTimeout(() => verify(setFavorited, drink, meal), ONE_SECOND);
  }, [drink, meal, verify]);

  return (
    <button
      type="button"
      onClick={ () => {
        setFavorited(!favorited);
        onClick();
      } }
    >
      <img
        src={ favorited ? blackHeartIcon : whiteHeartIcon }
        data-testid="favorite-btn"
        alt="botão de favoritar receita"
      />
    </button>
  );
};

FavoriteButton.propTypes = {
  drink: Proptypes.shape(Object).isRequired,
  meal: Proptypes.shape(Object).isRequired,
};

export default FavoriteButton;
