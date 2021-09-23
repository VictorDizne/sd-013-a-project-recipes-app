import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipesContext from './RecipesContext';

const RecipesContextProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const contextValue = {
    meals, setMeals, drinks, setDrinks,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
};

export default RecipesContextProvider;

RecipesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
