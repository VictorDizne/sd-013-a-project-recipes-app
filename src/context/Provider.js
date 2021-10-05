import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDebugState } from 'use-named-state';
import { useHistory } from 'react-router-dom';
import recipeContext from './index';
import usePersistedState from '../utils/usePersistedState';
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
  const [recipeList, setRecipeList] = useDebugState('RecipeList', '');
  const [categoryList, setCategoryList] = useDebugState('CategoryList', '');
  const [currentID, setCurrentID] = useDebugState('CurentID', 0);
  const [loading, setLoading] = useDebugState('Loading', true);
  const [details, setDetails] = useDebugState('Details', '');
  const [recipeProgress, setRecipeProgress] = usePersistedState('inProgressRecipes', '');

  const handleCurrentPage = () => {
    const { location: { pathname } } = history;
    if (pathname.includes('/comidas')) {
      setDataForFetch({ ...dataForFetch, currentPage: 'themealdb' });
    }
    if (pathname.includes('/bebidas')) {
      setDataForFetch({ ...dataForFetch, currentPage: 'thecocktaildb' });
    }
  };

  const handleFetch = (currentPage) => {
    FetchAPI(currentPage, 'search', 's', '')
      .then((response) => setRecipeList(response));
    FetchAPI(currentPage, 'list', 'c', 'list')
      .then((response) => setCategoryList(response));
  };

  const fetchFoodsOfCategory = (currentPage, buttonState, letter, foodsCategory) => {
    FetchAPI(currentPage, buttonState, letter, foodsCategory)
      .then((response) => setRecipeList(response));
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
          if (response.length === 1) {
            if (currentPage === 'themealdb') setCurrentID(response[0].idMeal);
            if (currentPage === 'thecocktaildb') setCurrentID(response[0].idDrink);
          }
        }
        if (response === null) global.alert(alert);
      });
  };

  const fetchDetails = (currentPage, lookup, letter, id) => {
    FetchAPI(currentPage, lookup, letter, id)
      .then((response) => setDetails(response[0]));
  };

  useEffect(() => {
    if (currentID !== 0) {
      setDataForFetch({ ...dataForFetch, redirectState: true });
    }
  }, [currentID]);

  useEffect(() => {
    if ((recipeList !== '') && (recipeList !== null)) {
      if (categoryList !== '') {
        setLoading(false);
      } else {
        setLoading(true);
      }
    }
  }, [recipeList, categoryList]);

  const ContextCard = {
    recipeList,
    dataForFetch,
    loading,
    categoryList,
    fetchFoodsOfCategory,
    setCurrentID,
  };
  const ContextFoods = {
    showInput,
    handleCurrentPage,
    dataForFetch,
    currentID,
    loading,
    handleFetch,
  };
  const ContextHeader = { handleShowInput, handleDataForFetch, finallyFetch, loading };
  const ContextDetails = { details, fetchDetails, recipeProgress, setRecipeProgress };

  const context = {
    ContextCard,
    ContextFoods,
    ContextHeader,
    ContextDetails,
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
