import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import { MainContext } from '../context/Provider';
import { getStorage } from '../services';
// Tratar recipe da pagina de favoritos.
function FavoriteButton({ id, type, recipe, testid }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { clickFavorite, setClickFavorite } = useContext(MainContext);
  function checkFavorite() {
    const data = getStorage('favoriteRecipes');
    const checkRecipe = data.some((item) => item.id === id);
    setIsFavorite(checkRecipe);
  }

  function favorite() {
    setIsFavorite(true);
    const data = getStorage('favoriteRecipes');

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

    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([...data, objRecipe]),
    );
  }

  function noFavorite() {
    setIsFavorite(false);
    const data = getStorage('favoriteRecipes');
    const newData = data.filter((item) => item.id !== id);

    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(newData),
    );
  }

  function handleClik() {
    if (isFavorite) noFavorite();
    else favorite();
    setClickFavorite(!clickFavorite);
  }

  useEffect(checkFavorite, [id]);

  return (
    <input
      type="image"
      data-testid={ testid || 'favorite-btn' }
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
