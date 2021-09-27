import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useCategories from '../hooks/useCategories';
import { Button } from '.';

function FilterRecipes({ pageTitle, handleFilter }) {
  const [categories, setCategories] = useState([]);

  const { foodCategories, drinkCategories } = useCategories();

  useEffect(() => {
    const options = {
      comidas: foodCategories,
      bebidas: drinkCategories,
      both: ['All', 'Food', 'Drink'],
    };

    setCategories(options[pageTitle]);
  }, [drinkCategories, foodCategories, pageTitle]);

  return (
    categories.map((category, index) => (
      <Button
        key={ index }
        type="button"
        id={ `${category.strCategory}-category-filter` }
        buttonText={ category.strCategory }
        onClick={ handleFilter }
      />
    ))
  );
}

const { string, func } = PropTypes;

FilterRecipes.propTypes = {
  pageTitle: string,
  handleFilter: func,
}.isRequired;

export default FilterRecipes;
