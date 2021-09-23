import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState, useRef } from 'react';
import { fetchRecipes, fetchRecipersAll } from '../services';

export const MainContext = createContext();

export function Provider({ children }) {
  const [searchSettings, setSearchSettings] = useState({
    query: '',
    type: '',
    path: '',
  });
  const [recipes, setRecipes] = useState(['teste']);
  const [recipesAll, setRecipesAll] = useState([]);
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

  const contextValue = {
    setSearchSettings,
    searchSettings,
    setRecipes,
    recipes,
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRecipersAll();
      console.log(data);
      setRecipesAll(data);
    };
    fetchData();
  }, []);
  return (
    <MainContext.Provider value={ contextValue }>
      {children}
    </MainContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
