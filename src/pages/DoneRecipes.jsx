import React from 'react';
import { Header } from '../components/index';
import DoneRecipeCard from '../components/DoneRecipeCard';

export default function DoneRecipes() {
  return (
    <div>
      <Header title="Receitas Feitas" visibility={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <DoneRecipeCard />
    </div>
  );
}
