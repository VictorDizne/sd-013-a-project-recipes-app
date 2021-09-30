import React, { useContext } from 'react';
import appContext from '../contexts/appContext';

function AllDrinksFood() {
  const { state, setState } = useContext(appContext);
  return (
    <span>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setState({ ...state, filterDoneFood: 'all' }) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setState({ ...state, filterDoneFood: 'comida' }) }
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setState({ ...state, filterDoneFood: 'bebida' }) }
      >
        Drinks
      </button>
    </span>
  );
}

export default AllDrinksFood;
