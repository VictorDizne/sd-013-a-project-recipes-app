import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useCategories from '../hooks/useCategories';
import { Button } from '.';

import Div from './styles/FiltersContainer';

function FilterRecipes({ pageTitle, handleFilter }) {
  const [categories, setCategories] = useState([]);

  const { foodCategories, drinkCategories } = useCategories();

  useEffect(() => {
    const setFoodCategories = async () => {
      const options = {
        Comidas: [{ strCategory: 'All' }, ...(await foodCategories)],
        Bebidas: [{ strCategory: 'All' }, ...(await drinkCategories)],
        both: [
          { strCategory: 'All' },
          { strCategory: 'Food' },
          { strCategory: 'Drink' },
        ],
      };
      setCategories(options[pageTitle]);
    };
    setFoodCategories();
  }, [drinkCategories, foodCategories, pageTitle]);

  return (
    <Div>
      {
        categories.map((category, index) => (
          <Button
            name={ category.strCategory }
            key={ index }
            type="button"
            id={ pageTitle === 'both'
              ? `filter-by-${category.strCategory.toLowerCase()}-btn`
              : `${category.strCategory}-category-filter` }
            buttonText={ category.strCategory }
            onClick={ handleFilter }
          />
        ))
      }
    </Div>
  );
}

const { string, func } = PropTypes;

FilterRecipes.propTypes = {
  pageTitle: string,
  handleFilter: func,
}.isRequired;

export default FilterRecipes;
