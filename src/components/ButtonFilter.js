import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import RecipesContext from '../context/RecipesContext';

function ButtonFilter({ categoryName, onClick, isMeal }) {
  const { handleBtnClick } = useContext(RecipesContext);
  const [isFiltered, setIsFiltered] = useState(true);

  const toggle = (isFilteredParam) => {
    // setIsLoading(true);
    if (isFilteredParam) {
      onClick(categoryName);
      setIsFiltered(false);
    } else {
      handleBtnClick({
        input: '',
        isMeal: isMeal === 'meal',
        radio: 'Nome',
      });
      setIsFiltered(true);
    }
  };

  return (
    <Button
      data-testid={ `${categoryName}-category-filter` }
      onClick={ () => toggle(isFiltered) }
      size="large"
    >
      {categoryName}
    </Button>

  );
}

ButtonFilter.propTypes = {
  categoryName: PropTypes.string.isRequired,
  isMeal: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonFilter;
