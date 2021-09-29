import React from 'react';
import { Link } from 'react-router-dom';
import FavDrinkCard from './favDrinkCard';
import FavMealCard from './favMealCard';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function CardMealRecipes() {
  const receitas = JSON.parse(localStorage.favoriteRecipes);
  function DrinkURL(id) {
    const toDetails = {
      pathname: `/bebidas/${id}`,
      id,
    };
    return toDetails;
  }

  const compartilhar = () => {
    copy(window.location);
    global.alert('Link copiado!');
  };

  function MealURL(id) {
    const toDetails = {
      pathname: `/comidas/${id}`,
      id,
    };
    return toDetails;
  }

  if (!receitas) return null;
  return (
    <div>
      {receitas.map((recipe, i) => (
        <div
          name={ recipe.type }
          key={ i }
        >
          {recipe.type === 'Drink'
            ? <Link to={ () => DrinkURL(recipe.id) }><FavDrinkCard r={ recipe } /></Link>
            : <Link to={ () => MealURL(recipe.id) }><FavMealCard r={ recipe } /></Link> }
          <button
            type="button"
            data-testid="share-btn"
            onClick={ compartilhar }
          >
            <img
              src={ shareIcon }
              alt="share button"
            />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
            // onClick={ desfavoritar }
          >
            <img
              src={ whiteHeartIcon }
              alt="Favoritar"
            />
          </button>
        </div>
      ))}
    </div>
  );
}

export default CardMealRecipes;
