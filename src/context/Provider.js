import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [meals, setMeals] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);

  const [drinks, setDrinks] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);

  const [toggleOn, setToggleOn] = useState('');

  const context = {
    meals,
    setMeals,
    mealsCategories,
    setMealsCategories,
    filteredMeals,
    setFilteredMeals,

    drinks,
    drinksCategories,
    setDrinks,
    setDrinksCategories,
    filteredDrinks,
    setFilteredDrinks,

    toggleOn,
    setToggleOn,
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
