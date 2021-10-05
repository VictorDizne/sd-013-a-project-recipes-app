import React, { useState } from 'react';
import { Header, RecipesMadeCard } from '../components';

function RecipesMade() {
  const doneRecipe = localStorage.getItem('doneRecipes') !== null
    ? JSON.parse(localStorage.getItem('doneRecipes')) : [];
  const [type, setType] = useState('all');

  const returnFiltersButtons = () => (
    <div style={ { display: 'flex', justifyContent: 'space-evenly' } }>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setType('all') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setType('comida') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setType('bebida') }
      >
        Drinks
      </button>
    </div>
  );

  return (
    <div>
      <Header title="Receitas Feitas" search={ false } />
      { returnFiltersButtons() }
      <div style={ { display: 'flex', flexWrap: 'wrap' } }>
        { doneRecipe.filter((item) => (type === 'all' ? item : item.type === type))
          .map((item, index) => (<RecipesMadeCard
            data={ item }
            key={ index }
            index={ index }
          />)) }
      </div>
    </div>
  );
}

export default RecipesMade;
