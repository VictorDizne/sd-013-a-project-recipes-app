import React, { useState, useEffect } from 'react';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import FavoriteCard from '../components/FavoriteCard';

const ReceitasFavoritas = () => {
  const [favorites, setFavorites] = useState('');

  /* src={ favoriteImg === whiteHeartIcon ? whiteHeartIcon : blackHeartIcon } */
  function resetFilter() {
    const favoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    );
    setFavorites(favoriteRecipes);
  }

  useEffect(() => {
    resetFilter();
  }, []);

  function filterFavorites(mealOrDrink) {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = favoriteRecipes
      .filter((favorite) => favorite.type === mealOrDrink);
    setFavorites(newFavorites);
  }

  function markFavorite(id) {
    const newFavorites = favorites.filter((favorite) => favorite.id !== id);
    setFavorites(newFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  }

  // [{ id, type, area, category, alcoholicOrNot, name, image }]
  if (favorites) {
    return (
      <div className="favoritesPage">
        <div className="favoritesHeader">
          <HeaderWithoutSearch page="Receitas Favoritas" />
        </div>
        <div className="favoritesBody">
          <div className="favoritesButtonsFilters">
            <button
              type="button"
              data-testid="filter-by-all-btn"
              onClick={ () => resetFilter() }
            >
              All
            </button>
            <button
              onClick={ () => filterFavorites('bebida') }
              type="button"
              data-testid="filter-by-drink-btn"
            >
              Bebidas
            </button>
            <button
              onClick={ () => filterFavorites('comida') }
              type="button"
              data-testid="filter-by-food-btn"
            >
              Comidas
            </button>
          </div>
          <div className="favoritesCard">
            {favorites.map((recipe, index) => (
              <FavoriteCard
                key={ index }
                recipe={ recipe }
                index={ index }
                markFavorite={ markFavorite }
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favoritesPage">
      <div className="favoritesHeader">
        <HeaderWithoutSearch page="Receitas Favoritas" />
      </div>
      <div className="favoritesButtonsFilters">
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Bebidas
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Comidas
        </button>
      </div>
    </div>
  );
};

export default ReceitasFavoritas;
