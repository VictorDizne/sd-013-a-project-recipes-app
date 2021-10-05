import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../context/Provider';
import { getStorage } from '../services';
import FavoriteCard from './FavoriteCard';

function FavoriteButtons() {
  let data = getStorage('favoriteRecipes');
  const [filter, setFilter] = useState('');
  const { clickFavorite, isStorageReady } = useContext(MainContext);

  useEffect(() => {
    data = getStorage('favoriteRecipes');
  }, [clickFavorite]);

  return (
    <>
      <button
        type="button"
        onClick={ () => setFilter('') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        onClick={ () => setFilter('comida') }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        onClick={ () => setFilter('bebida') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {isStorageReady
      && data
        .filter((recipe) => recipe.type.includes(filter))
        .map((element, index) => (
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
