import React, { useEffect } from 'react';
import { useDebugState } from 'use-named-state';
import ComponentDoneCard from './ComponentDoneCard';

function ComponentDoneRecipes() {
  const [filter, setFilter] = useDebugState('filter', 'All');
  const [array, setArray] = useDebugState('array', null);
  const storage = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    if (filter !== 'All') {
      const storageFilter = storage.filter((recipe) => recipe.type === filter);
      setArray(storageFilter);
    } else {
      setArray(storage);
    }
  }, [filter]);

  const handleClick = ({ target }) => {
    setFilter(target.value);
  };

  if (array === null) return <h1>Nenhuma Receita Encontrada</h1>;
  return (
    <div>
      <div className="doneRecipes-container-filters">
        <button
          type="button"
          onClick={ handleClick }
          data-testid="filter-by-all-btn"
          value="All"
          className="doneRecipes-btn-filter"
        >
          All
        </button>
        <button
          type="button"
          onClick={ handleClick }
          data-testid="filter-by-food-btn"
          value="comida"
          className="doneRecipes-btn-filter"
        >
          Foods
        </button>
        <button
          type="button"
          onClick={ handleClick }
          data-testid="filter-by-drink-btn"
          value="bebida"
          className="doneRecipes-btn-filter"
        >
          Drinks
        </button>
      </div>
      <div className="doneRecipes-card-list">
        {array.map((item, index) => (
          <ComponentDoneCard key={ index } currentData={ item } dataIndex={ index } />
        ))}
      </div>
    </div>
  );
}

export default ComponentDoneRecipes;