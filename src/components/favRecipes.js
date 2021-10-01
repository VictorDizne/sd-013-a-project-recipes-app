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
    <>
      <div className="non-header">
        <button onClick={ filterRecipes } name="Meals" type="button">Food</button>
        <button onClick={ filterRecipes } name="Drink" type="button">Drinks</button>
        <button onClick={ filterRecipes } name="All" type="button">All</button>
      </div>
      <div className="div-cards">
        {render.map((recip, i) => (
          <div
            className="eachFood"
            name={ recip.name }
            key={ i }
          >
            { recip.type === 'Drink'
              ? <Link to={ () => DrinkURL(recip.id) }><FavDrinkCard r={ recip } /></Link>
              : <Link to={ () => MealURL(recip.id) }><FavMealCard r={ recip } /></Link> }
            <div className="detail-header">
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
                name={ recip.name }
                type="button"
                data-testid="favorite-btn"
                onClick={ desfavoritar }
              >
                <img
                  name={ recip.name }
                  src={ whiteHeartIcon }
                  alt="Favoritar"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CardMealRecipes;
