import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '.';

function Provider({ children }) {
  const [meals, setMeals] = useState({});
  const [drinks, setDrinks] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const mealsResponse = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const baseMeals = await mealsResponse.json();
      setMeals(baseMeals);
      const drinksResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const baseDrinks = await drinksResponse.json();
      setDrinks(baseDrinks);
      setLoading(false);
    }
    fetchData();
  }, []);

  const context = {
    meals,
    setMeals,
    drinks,
    setDrinks,
    loading,
    setLoading,
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
