import React from 'react';
import Header from '../components/Header';
import MadeCard from '../components/MadeCard';
import { getStorage } from '../services';

function MadeRecipes() {
  const doneRecipes = getStorage('doneRecipes');
  return (
    <>
      <Header />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      {
        doneRecipes.map((recipe, index) => (<MadeCard
          key={ recipe.id }
          recipe={ recipe }
          index={ index }
        />))
      }
    </>
  );
}

export default MadeRecipes;
