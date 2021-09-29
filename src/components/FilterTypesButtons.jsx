import React from 'react';
import PropTypes from 'prop-types';

function FilterTypesButtons({ filterType }) {
  return (
    <div>
      <button
        onClick={ () => filterType() }
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ () => filterType('comida') }
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        onClick={ () => filterType('bebida') }
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drink
      </button>
    </div>
  );
}

FilterTypesButtons.propTypes = {
  filterType: PropTypes.func.isRequired,
};

export default FilterTypesButtons;
