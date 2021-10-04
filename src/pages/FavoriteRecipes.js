import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCard';

import * as myFuncStorage from '../services/storage';

function FavoriteRecipes() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [recipes, setRecipes] = useState([]);
  const [checkFavorite, setCheckFavorite] = useState(false);
  const [foodFilter, setFoodFilter] = useState(false);
  const [drinkFilter, setDrinkFilter] = useState(false);

  const getFavoriteRecipes = () => {
    setRecipes(favoriteRecipes);
  };

  const setFavorite = (id, recipe) => {
    const newRecipes = recipes.filter((item) => item.id !== id);
    setRecipes(newRecipes);
    myFuncStorage.setFavoriteRecipe(id, recipe, 'Meal');
    setCheckFavorite(myFuncStorage.checkFavoriteRecipe(id));
  };

  const checkIsFavorite = (id) => (
    recipes.some((recipe) => recipe.id === id)
  );

  const handleFilterClick = ({ target }) => {
    if (target.id === 'All') {
      setFoodFilter(false);
      setDrinkFilter(false);
    } else if (target.id === 'Food') {
      setFoodFilter(true);
    } else if (target.id === 'Drinks') {
      setDrinkFilter(true);
    }
  };

  useEffect(() => {
    getFavoriteRecipes();
  }, []);

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <button
        data-testid="filter-by-all-btn"
        id="All"
        onClick={ handleFilterClick }
        type="button"
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        id="Food"
        onClick={ handleFilterClick }
        type="button"
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        id="Drinks"
        onClick={ handleFilterClick }
        type="button"
      >
        Drinks
      </button>
      <div style={ { display: 'flex', flexFlow: 'column', alignItems: 'center' } }>
        { (recipes !== null && (foodFilter || drinkFilter)) ? recipes
          .filter((iFilter) => (foodFilter ? iFilter.type === 'comida'
            : iFilter.type === 'bebida'))
          .map((item, index) => (<FavoriteCard
            checkIsFavorite={ checkIsFavorite }
            item={ item }
            index={ index }
            key={ index }
            setFavorite={ setFavorite }
          />)) : recipes
          .map((item, index) => recipes !== null && <FavoriteCard
            checkIsFavorite={ checkIsFavorite }
            item={ item }
            index={ index }
            key={ index }
            setFavorite={ setFavorite }
          />) }
      </div>
    </div>
  );
}

export default FavoriteRecipes;
