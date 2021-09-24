import React from 'react';
import PropTypes from 'prop-types';

function ButtonFilter({ categoryName }) {
  return (
    <button type="button" data-testid={ `${categoryName}-category-filter` }>
      {categoryName}
    </button>
  );
}

ButtonFilter.propTypes = {
  categoryName: PropTypes.string.isRequired,
};

export default ButtonFilter;
