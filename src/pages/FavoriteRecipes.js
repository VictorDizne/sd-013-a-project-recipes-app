import React, { useState } from 'react';
import Header from '../components/Header';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import '../styles/FavoriteRecipes.css';
import '../styles/Buttons.css';

const FavoriteRecipes = () => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [favRecipes, setFavRecipes] = useState(favoriteRecipes);
  const [recipeList, setRecipeList] = useState(favoriteRecipes);

  const handleClickFavoriteRecipes = () => {
    setRecipeList(favoriteRecipes);
  };

  const handleClickFavoriteMeals = () => {
    const favoriteMeals = favRecipes ? favRecipes
      .filter((recipe) => recipe.type === 'comida') : [];
    setRecipeList(favoriteMeals);
  };

  const handleClickFavoriteDrinks = () => {
    const favoriteDrinks = favRecipes ? favRecipes
      .filter((recipe) => recipe.type === 'bebida') : [];
    setRecipeList(favoriteDrinks);
  };

  const handleClickNotFavorite = (id) => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const newRecipesList = recipes.filter((i) => i.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipesList));
    setFavRecipes(newRecipesList);
    setRecipeList(newRecipesList);
  };

  return (
    <>
      <Header title="Receitas Favoritas" />
      <div className="recipes-list">
        <div className="select-buttons">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ handleClickFavoriteRecipes }
            className="buttons"
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ handleClickFavoriteMeals }
            className="buttons"
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ handleClickFavoriteDrinks }
            className="buttons"
          >
            Drink
          </button>
        </div>
        <div className="recipes-container">
          {
            recipeList && recipeList.map((recipe, index) => (
              <FavoriteRecipeCard
                key={ index }
                recipe={ recipe }
                index={ index }
                handleClickNotFavorite={ handleClickNotFavorite }
              />
            ))
          }
        </div>
      </div>
    </>
  );
};

export default FavoriteRecipes;
