import React, { useState, useEffect } from 'react';
import { Header } from '../../components/General';

function DoneRecipes() {
  const [filters, setFilters] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      setDone(doneRecipes);
      setFilters(doneRecipes);
    }
  }, []);

  return (
    <div>
      <div>
        Done Recipes Page
        <Header title="Receitas Feitas" />
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilters(done) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilters(done.filter((recipe) => recipe.type === 'comida')) }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilters(done.filter((recipe) => recipe.type === 'bebida')) }
        >
          Drinks
        </button>
      </div>
      <div>
        {filters.map((card, index) => (
          <div key={ index }>
            { card }
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
