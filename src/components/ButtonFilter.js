import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function ButtonFilter({ categoryName, onClick, isMeal }) {
  const { handleBtnClick } = useContext(RecipesContext);
  const [isFiltered, setIsFiltered] = useState(true);

  const toggle = (isFilteredParam) => {
    // setIsLoading(true);
    if (isFilteredParam) {
      console.log('primeira vez');
      onClick(categoryName);
      setIsFiltered(false);
    } else {
      console.log('segunda vez');
      handleBtnClick({
        input: '',
        isMeal: isMeal === 'meal',
        radio: 'Nome',
      });
      setIsFiltered(true);
    }
  };

  return (
    <button
      type="button"
      data-testid={ `${categoryName}-category-filter` }
      onClick={ () => toggle(isFiltered) }
    >
      {categoryName}
    </button>
  );
}

ButtonFilter.propTypes = {
  categoryName: PropTypes.string.isRequired,
  isMeal: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonFilter;
