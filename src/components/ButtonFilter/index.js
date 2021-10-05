import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { Button } from '@mui/material';
import RecipesContext from '../../context/RecipesContext';

import style from './buttonFilter.module.scss';

function ButtonFilter({ categoryName, onClick, isMeal }) {
  const { handleBtnClick } = useContext(RecipesContext);
  const [isFiltered, setIsFiltered] = useState(true);
  const [displayName, setDisplayName] = useState(categoryName);

  const toggle = (isFilteredParam) => {
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

  useEffect(() => {
    const [name] = displayName.split(' ');
    const [firstName] = name.split('/');
    setDisplayName(firstName);
  }, [displayName]);

  return (
    <button
      className={ style.filter }
      type="button"
      data-testid={ `${categoryName}-category-filter` }
      onClick={ () => toggle(isFiltered) }
    >
      {displayName}
    </button>

  );
}

ButtonFilter.propTypes = {
  categoryName: PropTypes.string.isRequired,
  isMeal: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonFilter;
