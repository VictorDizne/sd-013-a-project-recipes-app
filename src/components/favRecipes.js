import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FavDrinkCard from './favDrinkCard';
import FavMealCard from './favMealCard';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function CardMealRecipes() {
  const receitas = JSON.parse(localStorage.favoriteRecipes);
  const [render, setRender] = useState(receitas);
  function DrinkURL(id) {
    const toDetails = {
      pathname: `/bebidas/${id}`,
      id,
    };
    return toDetails;
  }

  const desfavoritar = ({ target: { name } }) => {
    const afterDesfav = receitas.filter((receita) => receita.name !== name);
    console.log(afterDesfav);
    localStorage.favoriteRecipes = JSON.stringify(afterDesfav);
    setRender(afterDesfav);
  };

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

  const filterRecipes = ({ target: { name } }) => {
    if (name === 'All' || null) return setRender(receitas);
    const recipeFiltradas = receitas.filter((receita) => receita.type === name);
    setRender(recipeFiltradas);
  };

  return (
    <div>
      <button onClick={ filterRecipes } name="Meals" type="button">Food</button>
      <button onClick={ filterRecipes } name="Drink" type="button">Drinks</button>
      <button onClick={ filterRecipes } name="All" type="button">All</button>
      {render.map((recipe, i) => (
        <div
          name={ recipe.name }
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
            name={ recipe.name }
            type="button"
            data-testid="favorite-btn"
            onClick={ desfavoritar }
          >
            <img
              name={ recipe.name }
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
