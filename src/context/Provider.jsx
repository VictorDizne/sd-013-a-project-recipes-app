import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import Context from './Context';
import { saveLocalStorage } from '../services/localStorage';
import fetchAPI from '../services/fetchAPI';

const Provider = ({ children }) => {
  const initialState = {
    mealsToken: '',
    cocktailsToken: '',
    user: {
      email: '',
    },
    recipes: [],
    doneRecipes: [],
    favoriteRecipes: [],
    inProgressRecipes: [],
  };

  const reducerRecipes = (state, { type, payload }) => {
    switch (type) {
    case 'set-meals-token':
      return {
        ...state,
        mealsToken: payload,
      };
    case 'set-cocktails-token':
      return {
        ...state,
        cocktailsToken: payload,
      };
    case 'set-user-email':
      return {
        ...state,
        user: {
          email: payload,
        },
      };

    case 'add-recipes':
      return {
        ...state,
        recipes: payload,
      };
    case 'add-done-recipe':
      return {
        ...state,
        // doneRecipes: ,
      };
    // adicionar outros cases
    default:
      return state;
    }
  };

  const [updatedState, dispatch] = useReducer(reducerRecipes, initialState);

  const handleSubmitLogin = (email) => {
    saveLocalStorage('mealsToken', 1);
    saveLocalStorage('cocktailsToken', 1);
    saveLocalStorage('user', { email });
    dispatch({ type: 'set-user-email', payload: email });
  };

  const handleSearch = ({ search, searchQuery, location }) => {
    if (location.pathname.includes('comidas')) {
      if (searchQuery === 'byIngredient') {
        const data = fetchAPI('fetchMealByIngredient', search);
        dispatch({ type: 'add-recipes', payload: data });
      }

      if (searchQuery === 'byName') {
        const data = fetchAPI('fetchMealByName', search);
        dispatch({ type: 'add-recipes', payload: data });
      }

      if (searchQuery === 'byFirstLetter') {
        const data = fetchAPI('fetchMealByFirstLetter', search);
        dispatch({ type: 'add-recipes', payload: data });
      }
    } else {
      if (searchQuery === 'byIngredient') {
        const data = fetchAPI('fetchCocktailByIngredient', search);
        dispatch({ type: 'add-recipes', payload: data });
      }
      if (searchQuery === 'byName') {
        const data = fetchAPI('fetchCocktailByName', search);
        dispatch({ type: 'add-recipes', payload: data });
      }
      if (searchQuery === 'byFirstLetter') {
        const data = fetchAPI('fetchCocktailByFirstLetter', search);
        dispatch({ type: 'add-recipes', payload: data });
      }
    }
  };

  const value = {
    updatedState,
    handleSubmitLogin,
    handleSearch,
  };

  return (
    <Context.Provider value={ value }>{children}</Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
