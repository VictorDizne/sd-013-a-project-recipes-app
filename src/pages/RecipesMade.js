import React, { useState } from 'react';
import Header from '../components/Header';
import DoneMealCard from '../components/DoneMealCard';
import DoneDrinkCard from '../components/DoneDrinkCard';
import '../styles/RecipesMade.css';
import '../styles/Buttons.css';

const RecipesMade = () => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const doneMeals = doneRecipes ? doneRecipes
    .filter((recipe) => recipe.type === 'comida') : [];
  const doneDrinks = doneRecipes ? doneRecipes
    .filter((recipe) => recipe.type === 'bebida') : [];

  const [recipeList, setRecipeList] = useState(doneRecipes);

  const handleClickDoneRecipes = () => {
    setRecipeList(doneRecipes);
  };

  const handleClickDoneMeals = () => {
    setRecipeList(doneMeals);
  };

  const handleClickDoneDrinks = () => {
    setRecipeList(doneDrinks);
  };

  return (
    <>
      <Header title="Receitas Feitas" />
      <div className="recipes-list">
        <div className="select-buttons">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ handleClickDoneRecipes }
            className="buttons"
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ handleClickDoneMeals }
            className="buttons"
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ handleClickDoneDrinks }
            className="buttons"
          >
            Drink
          </button>
        </div>
        <div>
          { recipeList && recipeList.map((recipe, index) => {
            if (recipe.type === 'comida') {
              return <DoneMealCard key={ index } recipe={ recipe } index={ index } />;
            }
            if (recipe.type === 'bebida') {
              return <DoneDrinkCard key={ index } recipe={ recipe } index={ index } />;
            }
            return recipe;
          })}
        </div>
      </div>
    </>
  );
};

export default RecipesMade;
