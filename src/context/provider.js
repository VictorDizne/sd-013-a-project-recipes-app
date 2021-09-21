import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '.';
import fetchAPI from '../services/fetchAPI';

function Provider({ children }) {
  const [meals, setMeals] = useState({});
  const [drinks, setDrinks] = useState({});

  useEffect(() => {
    setMeals(fetchAPI('https://www.themealdb.com/api/json/v1/1/search.php?f=a'));
    setDrinks(fetchAPI('www.thecocktaildb.com/api/json/v1/1/search.php?f=a'));
  }, []);

  const context = {
    meals,
    drinks,
  };
  return (
    <recipesContext.Provider value={ context }>
      { children }
    </recipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
