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
  const [clickFavorite, setClickFavorite] = useState(true);

  const [recipes, setRecipes] = useState(['teste']);

  const [randomReciper, setRandomReciper] = useState([]);

  const [toggle, setToggle] = useState('');

  const [byIngredients, setByIngredients] = useState({ bool: false, ingrdient: '' });

  const [isStorageReady, setIsStorageReady] = useState(false);

  const initialRender = useRef(false);

  async function initStorage() {
    if (localStorage.getItem('favoriteRecipes') === null) {
      await localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    if (localStorage.getItem('inProgressRecipes') === null) {
      await localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {}, cocktails: {},
      }));
    }
    if (localStorage.getItem('doneRecipes') === null) {
      await localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    setIsStorageReady(true);
  }

  useEffect(() => {
    if (initialRender.current) {
      const fetchData = async () => {
        const data = await fetchRecipes(
          searchSettings.query,
          searchSettings.type,
          searchSettings.path,
        );
        if (data === null) {
          global.alert(erro);
        } else {
          setRecipes(data);
        }
      };
      fetchData();
    } else {
      initialRender.current = true;
      initStorage();
    }
  }, [searchSettings]);

  const contextValue = {
    setSearchSettings,
    searchSettings,
    setRecipes,
    recipes,
    setToggle,
    toggle,
    setRandomReciper,
    randomReciper,
    byIngredients,
    setByIngredients,
    clickFavorite,
    setClickFavorite,
    isStorageReady,
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
