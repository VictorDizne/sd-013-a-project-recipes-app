import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState, useRef } from 'react';
import { fetchRecipes, fetchRecipersMeals, fetchRecipersDrinks } from '../services';

export const MainContext = createContext();

export function Provider({ children }) {
  const [searchSettings, setSearchSettings] = useState({
    query: '',
    type: '',
    path: '',
  });

  const [recipes, setRecipes] = useState(['teste']);
  const [recipesMeals, setRecipesMeals] = useState([]);
  const [recipesDrinks, setRecipesDrinks] = useState([]);

  const initialRender = useRef(false);

  useEffect(() => {
    if (initialRender.current) {
      const fetchData = async () => {
        const data = await fetchRecipes(
          searchSettings.query,
          searchSettings.type,
          searchSettings.path,
        );
        setRecipes(data);
      };
      fetchData();
    } else {
      initialRender.current = true;
    }
  }, [searchSettings]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRecipersMeals();
      setRecipesMeals(data.meals);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRecipersDrinks();
      setRecipesDrinks(data.drinks);
    };
    fetchData();
  }, []);

  const contextValue = {
    setSearchSettings,
    searchSettings,
    setRecipes,
    recipes,
    setRecipesMeals,
    recipesMeals,
    setRecipesDrinks,
    recipesDrinks,
  };

  return (
    <MainContext.Provider value={ contextValue }>
      {children}
    </MainContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
