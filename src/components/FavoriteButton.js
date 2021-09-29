import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({ id, type, recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);

  function checkFavorite() {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const checkRecipe = data.some((item) => item.id === id);
    setIsFavorite(checkRecipe);
  }

  function favorite() {
    setIsFavorite(true);
    const data = JSON.parse(localStorage.getItem('favoriteRecipes'));

    let objRecipe = {};

    if (type === 'comida') {
      objRecipe = {
        id,
        type,
        area: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      };
    } else {
      objRecipe = {
        id,
        type,
        area: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      };
    }
    console.log(objRecipe);

    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([...data, objRecipe]),
    );
  }

  function noFavorite() {
    setIsFavorite(false);
    const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newData = data.filter((item) => item.id !== id);

    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(newData),
    );
  }

  function handleClik() {
    if (isFavorite) noFavorite();
    else favorite();
  }

  useEffect(checkFavorite, [id]);

  return (
    <input
      type="image"
      data-testid="favorite-btn"
      src={ isFavorite ? BlackHeartIcon : whiteHeartIcon }
      alt="Favorite Icon"
      onClick={ handleClik }
    />
  );
}

FavoriteButton.propTypes = {
  id: PropTypes.string,
  recipe: PropTypes.shape({
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
  type: PropTypes.string,
}.isRequired;

export default FavoriteButton;
