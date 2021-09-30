import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const FavoriteButton = ({ recipeDetails }) => {
  const history = useHistory();
  const [favoriteImg, changeFavoriteImg] = useState(whiteHeartIcon);
  const { pathname } = history.location;
  const recipeId = pathname.includes('bebidas')
    ? recipeDetails.idDrink : recipeDetails.idMeal;

  function filter() {
    const favoriteLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteLocalStorage) {
      const favoritesFilter = favoriteLocalStorage.map((obj) => (
        Object.values(obj).some((key) => key === recipeId)));
      // console.log(favoriteLocalStorage);
      favoritesFilter
        .forEach((favorite) => favorite && changeFavoriteImg(blackHeartIcon));
    }
  }

  useEffect(() => {
    filter();
  }, []);

  function SetLocalStorage(newFavorite) {
    const allFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (allFavorite) {
      return localStorage.setItem(
        'favoriteRecipes', JSON.stringify(
          [...allFavorite, newFavorite],
        ),
      );
    }

    return localStorage.setItem(
      'favoriteRecipes', JSON.stringify(
        [newFavorite],
      ),
    );
  }

  function handleClickFavorite() {
    if (favoriteImg === blackHeartIcon) {
      return changeFavoriteImg(whiteHeartIcon);
    }
    changeFavoriteImg(blackHeartIcon);

    let favoriteLocalStorageObject = {
      id: '',
      type: '',
      category: '',
      area: '',
      alcoholicOrNot: '',
      name: '',
      image: '',
    };
    if (pathname.includes('bebidas')) {
      favoriteLocalStorageObject = {
        id: recipeDetails.idDrink,
        type: 'bebida',
        category: recipeDetails.strCategory,
        area: '',
        alcoholicOrNot: recipeDetails.strAlcoholic,
        name: recipeDetails.strDrink,
        image: recipeDetails.strDrinkThumb,
      };
    } else {
      favoriteLocalStorageObject = {
        id: recipeDetails.idMeal,
        type: 'comida',
        category: recipeDetails.strCategory,
        area: recipeDetails.strArea,
        alcoholicOrNot: '',
        name: recipeDetails.strMeal,
        image: recipeDetails.strMealThumb,
      };
    }
    SetLocalStorage(favoriteLocalStorageObject);
  }

  function button() {
    console.log(favoriteImg, 'fav');
    return (
      <button
        type="button"
        onClick={ () => handleClickFavorite() }
      >
        <img
          data-testid="favorite-btn"
          src={ favoriteImg === whiteHeartIcon ? whiteHeartIcon : blackHeartIcon }
          alt="favoritar"
        />
      </button>
    );
  }

  return (
    button()
  );
};

FavoriteButton.propTypes = {
  recipeDetails: PropTypes.shape({
    id: PropTypes.string,
  }),
}.isRequired;
export default FavoriteButton;
