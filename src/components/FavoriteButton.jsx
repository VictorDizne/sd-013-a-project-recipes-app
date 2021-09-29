import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({ url, recipe, isMeal }) {
  const [clicked, setClicked] = useState(false);

  const favoriteRecipes = () => {
    if (!localStorage.favoriteRecipes) {
      const arrayFavorite = [];
      localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavorite));
    }
    let itemFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (clicked) {
      itemFavorite = itemFavorite
        .filter((item) => item.id !== recipe.idMeal || item.id === recipe.idDrink);
    }
    const item = {
      id: isMeal ? recipe.idMeal : recipe.idDrink,
      type: isMeal ? 'comida' : 'bebida',
      area: isMeal ? recipe.strArea : '',
      category: recipe.strCategory,
      alcoholicOrNot: isMeal ? '' : recipe.strAlcoholic,
      name: isMeal ? recipe.strMeal : recipe.strDrink,
      image: isMeal ? recipe.strMealThumb : recipe.strDrinkThumb,
    };
    if (!clicked) {
      itemFavorite.push(item);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(itemFavorite));
  };

  const handleClick = () => {
    favoriteRecipes();
    setClicked(!clicked);
  };

  useEffect(() => {
    const loadPage = () => {
      const itemFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (itemFavorite !== null) {
        const blablabla = itemFavorite
          .some((item) => item.id === recipe.idMeal || item.id === recipe.idDrink);
        if (blablabla) setClicked(true);
      }
    };
    loadPage();
  });

  return (
    <input
      type="image"
      src={ clicked ? blackHeartIcon : whiteHeartIcon }
      alt="Ícone de compartilhar"
      data-testid="favorite-btn"
      onClick={ handleClick }
    />
  );
}

FavoriteButton.propTypes = {
  url: PropTypes.string.isRequired,
  recipe: PropTypes.string.isRequired,
};

export default FavoriteButton;
