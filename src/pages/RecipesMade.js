import React, { useState } from 'react';
import Header from '../components/Header';
import DoneMealCard from '../components/DoneMealCard';
import DoneDrinkCard from '../components/DoneDrinkCard';
import '../styles/RecipesMade.css';

const RecipesMade = () => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const doneMeals = doneRecipes ? doneRecipes
    .filter((recipe) => recipe.type === 'comida') : [];
  const doneDrinks = doneRecipes ? doneRecipes
    .filter((recipe) => recipe.type === 'bebida') : [];
  console.log(doneRecipes);
  console.log(doneMeals);
  console.log(doneDrinks);
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
      <div className="done-recepies-btns">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleClickDoneRecipes }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleClickDoneMeals }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleClickDoneDrinks }
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
        })}
      </div>
    </>
  );
};

export default RecipesMade;
