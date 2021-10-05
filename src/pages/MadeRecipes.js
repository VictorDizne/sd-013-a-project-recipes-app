import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import MadeCard from '../components/MadeCard';
import { MainContext } from '../context/Provider';
import { getStorage } from '../services';

function MadeRecipes() {
  const [filter, setFilter] = useState('');
  const { isStorageReady } = useContext(MainContext);
  const doneRecipes = getStorage('doneRecipes');

  return (
    <>
      <Header />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('comida') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('bebida') }
        >
          Drinks
        </button>
      </div>
      { isStorageReady && doneRecipes
        .filter((recipe) => recipe.type.includes(filter))
        .map((recipe, index) => (<MadeCard
          key={ recipe.id }
          recipe={ recipe }
          index={ index }
        />))}
    </>
  );
}

export default MadeRecipes;
