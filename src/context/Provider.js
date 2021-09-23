import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [meals, setMeals] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);

  const context = {
    meals,
    mealsCategories,
    setMeals,
    setMealsCategories,
    drinks,
    drinksCategories,
    setDrinks,
    setDrinksCategories,
  };

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
