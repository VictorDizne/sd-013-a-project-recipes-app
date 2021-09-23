import React from 'react';

function ButtonFilter({ categoryName }) {
  return (
    <button type="button" data-testid={ `${categoryName}-category-filter` }>
      {categoryName}
    </button>
  );
}

export default ButtonFilter;
