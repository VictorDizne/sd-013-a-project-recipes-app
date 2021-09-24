import React from 'react';

const filters = ['All', 'Beef', 'Lamb', 'Chicken', 'BreakFast', 'Dessert'];

function ButtonsFilters() {
  return (
    <div>
      { filters.map((item, index) => (
        <button
          type="button"
          key={ index }
        >
          {item}
        </button>)) }
    </div>
  );
}

export default ButtonsFilters;
