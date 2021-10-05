import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../context/Provider';
import FavoriteCard from './FavoriteCard';

let result = [];

function FavoriteButtons() {
  const [favoriteResult, setFavoriteResult] = useState(
    JSON.parse(localStorage.getItem('favoriteRecipes')),
  );
  const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const { clickFavorite } = useContext(MainContext);
  function handleClick({ target }) {
    switch (target.textContent) {
    case 'All':
      setFavoriteResult(data);
      break;
    case 'Food':
      result = data.filter((elementType) => elementType.type === 'comida');
      setFavoriteResult(result);
      break;
    case 'Drinks':
      result = data.filter((elementType) => elementType.type === 'bebida');
      setFavoriteResult(result);
      break;
    default:
      break;
    }
  }

  useEffect(() => setFavoriteResult(
    JSON.parse(localStorage.getItem('favoriteRecipes')),
  ), [clickFavorite]);

  return (
    <>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {favoriteResult.map((element, index) => (
        // const { id, name, image, alcoholicOrNot, type, area } = element;
        <FavoriteCard
          key={ element.id }
          index={ index }
          recipe={ element }
          { ...element }
        />
      ))}
    </>
  );
}
export default FavoriteButtons;
