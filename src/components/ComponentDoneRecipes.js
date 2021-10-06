import React from 'react';
import ComponentDoneCard from './ComponentDoneCard';

function ComponentDoneRecipes() {
  const storage = JSON.parse(localStorage.getItem('doneRecipes'));
  if (storage === null) return <h1>Nenhuma Receita Encontrada</h1>;
  return (
    <div>
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Foods</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      <div>
        {storage.map((item, index) => (
          <ComponentDoneCard key={ index } currentData={ item } dataIndex={ index } />
        ))}
      </div>
    </div>
  );
}

export default ComponentDoneRecipes;
