import React from 'react';

function AllDrinksFood() {
  return (
    <span>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
    </span>
  );
}

export default AllDrinksFood;
