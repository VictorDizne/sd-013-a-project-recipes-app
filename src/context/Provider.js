import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState, useRef } from 'react';
import { fetchRecipes } from '../services';

export const MainContext = createContext();
const erro = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

export function Provider({ children }) {
  const [searchSettings, setSearchSettings] = useState({
    query: '',
    type: '',
    path: '',
  });

  const [recipes, setRecipes] = useState(['teste']);

  const initialRender = useRef(false);

  useEffect(() => {
    if (initialRender.current) {
      const fetchData = async () => {
        const data = await fetchRecipes(
          searchSettings.query,
          searchSettings.type,
          searchSettings.path,
        );
        if (data === null) {
          alert(erro);
        } else {
          setRecipes(data);
        }
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

  return (
    <MainContext.Provider value={ contextValue }>
      {children}
    </MainContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
