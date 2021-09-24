import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDebugState } from 'use-named-state';
import { useHistory } from 'react-router-dom';
import recipeContext from './index';
import FetchAPI from '../services';

function Provider({ children }) {
  const history = useHistory();
  const fetchData = {
    currentPage: '',
    redirectState: false,
    dataComponent: {},
  };

  const [showInput, setShowInput] = useDebugState('ShowInput', false);
  const [dataForFetch, setDataForFetch] = useDebugState('DataForFetch', fetchData);
  const [recipeList, setRecipeList] = useDebugState('RecipeList', []);
  const [currentID, setCurrentID] = useDebugState('CurentID', 0);

  const handleCurrentPage = () => {
    const { location: { pathname } } = history;
    if (pathname === '/comidas') {
      setDataForFetch({ ...dataForFetch, currentPage: 'themealdb' });
    }
    if (pathname === '/bebidas') {
      setDataForFetch({ ...dataForFetch, currentPage: 'thecocktaildb' });
    }
  };

  const handleShowInput = () => {
    setShowInput(!showInput);
  };

  const handleDataForFetch = (componentState) => {
    setDataForFetch({ ...dataForFetch, dataComponent: componentState });
  };

  const finallyFetch = () => {
    const { currentPage, dataComponent } = dataForFetch;
    const { buttonState, letter, searchState } = dataComponent;
    const alert = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
    FetchAPI(currentPage, buttonState, letter, searchState)
      .then((response) => {
        if (response !== null) {
          setRecipeList(response);
          if (currentPage === 'themealdb') setCurrentID(response[0].idMeal);
          if (currentPage === 'thecocktaildb') setCurrentID(response[0].idDrink);
        }
        if (response === null) global.alert(alert);
      });
  };

  useEffect(() => {
    if (recipeList.length === 1) {
      setDataForFetch({ ...dataForFetch, redirectState: true });
    }
  }, [recipeList]);

  const ContextCard = { recipeList, dataForFetch };
  const ContextHeader = { handleShowInput, handleDataForFetch, finallyFetch };
  const ContextComidas = { showInput, handleCurrentPage, dataForFetch, currentID };
  const ContextBebidas = { showInput, handleCurrentPage, dataForFetch, currentID };
  const ContextFooter = {};

  const context = {
    ContextCard,
    ContextComidas,
    ContextBebidas,
    ContextHeader,
    ContextFooter,
  };

  return (
    <recipeContext.Provider value={ context }>
      { children }
    </recipeContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
}.isRequired;

export default Provider;
