import PropTypes from 'prop-types';
import React, { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router';
import Context from './Context';
import { getLocalStorage, saveLocalStorage } from '../services/localStorage';
import fetchAPI from '../services/fetchAPI';
import { favoriteDrink,
  favoriteMeal, verifySearchCocktail, verifySearchMeal,
} from './helpers';

const IN_PROGRESS_RECIPES = 'in-progress-recipes';
const ADD_FAVORITE_RECIPES = 'add-favorite-recipes';
const REMOVE_FAVORITE_RECIPES = 'remove-favorite-recipes';
const FAVORITE_RECIPES_LOCAL_STORAGE = 'local-storage-recipes';
const Provider = ({ children }) => {
  const history = useHistory();
  const initialState = {
    mealsToken: '',
    cocktailsToken: '',
    user: {
      email: '',
    },
    recipe: {},
    recipes: [],
    doneRecipes: [],
    favoriteRecipes: [],
    inProgressRecipes: {
      meals: {},
      cocktails: {},
    },
    recommendations: [],
    isLoading: true,
  };

  const reducerRecipes = (state, { type, payload }) => {
    switch (type) {
    case 'set-user-email':
      return {
        ...state, user: { email: payload } };
    case 'recommendations':
      return { ...state, recommendations: payload, isLoading: false };
    case 'add-recipes':
      return { ...state, recipes: payload };
    case 'recipe-detail':
      return { ...state, recipe: payload };
    case IN_PROGRESS_RECIPES:
      return { ...state, inProgressRecipes: payload };
    case FAVORITE_RECIPES_LOCAL_STORAGE:
      return { ...state, favoriteRecipes: payload };
    case ADD_FAVORITE_RECIPES:
      return { ...state, favoriteRecipes: [...state.favoriteRecipes, payload] };
    case REMOVE_FAVORITE_RECIPES:
      return { ...state,
        favoriteRecipes: [...state.favoriteRecipes].filter((f) => f.id !== payload),
      };
    default:
      return state;
    }
  };

  const [appState, dispatch] = useReducer(reducerRecipes, initialState);

  useEffect(() => {
    const InProgressRecipes = getLocalStorage('inProgressRecipes') || {
      meals: {},
      cocktails: {},
    };
    const getFavorites = getLocalStorage('favoriteRecipes') || [];
    console.log(getFavorites);
    dispatch({ type: IN_PROGRESS_RECIPES, payload: InProgressRecipes });
    dispatch({ type: FAVORITE_RECIPES_LOCAL_STORAGE, payload: getFavorites });
  }, []);

  const handleSubmitLogin = (e, email) => {
    e.preventDefault();
    saveLocalStorage('mealsToken', 1);
    saveLocalStorage('cocktailsToken', 1);
    saveLocalStorage('user', { email });
    dispatch({ type: 'set-user-email', payload: email });
    history.push('/comidas');
  };

  const handleSearch = async ({ query, typeSearch, location }) => {
    const data = await fetchAPI(
      location.pathname.includes('comidas')
        ? verifySearchMeal[typeSearch]
        : verifySearchCocktail[typeSearch],
      query,
    );

    dispatch({ type: 'add-recipes', payload: data });

    if (data.length === 0) {
      global
        .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }

    if (location.pathname.includes('comidas') && data.length === 1) {
      history.push(`/comidas/${data[0].idMeal}`);
    }
    if (location.pathname.includes('bebidas') && data.length === 1) {
      history.push(`/bebidas/${data[0].idDrink}`);
    }
  };

  const handleSearchById = async ({ location, id }) => {
    const data = await fetchAPI(
      location.pathname.includes('comidas')
        ? 'fetchMealById'
        : 'fetchCocktailById',
      id,
    );
    dispatch({ type: 'recipe-detail', payload: data[0] });
  };

  const handleRecommendations = async ({ location }) => {
    const data = await fetchAPI(
      location.pathname.includes('bebidas')
        ? 'fetchMealByName'
        : 'fetchCocktailByName',
      '',
    );
    dispatch({ type: 'recommendations', payload: data });
  };

  const handleRecipeStarted = ({ recipe, path }) => {
    const getRecipes = getLocalStorage('inProgressRecipes') || {
      meals: {},
      cocktails: {},
    };
    const verifyPath = path.includes('comidas');

    const mealToSave = {
      ...getRecipes,
      meals: {
        ...getRecipes.meals,
        [recipe.idMeal]: [],
      },
    };

    const drinkToSave = {
      ...getRecipes,
      cocktails: {
        ...getRecipes.cocktails,
        [recipe.idDrink]: [],
      },
    };

    const payload = verifyPath ? mealToSave : drinkToSave;
    dispatch({ type: IN_PROGRESS_RECIPES, payload });
    saveLocalStorage('inProgressRecipes', payload);
  };

  const handleFavorites = ({ recipe, path }) => {
    const verifyPath = path.includes('comidas');
    const verifyId = verifyPath ? recipe.idMeal : recipe.idDrink;
    const getFavorites = getLocalStorage('favoriteRecipes') || [];
    const isInFavorites = getFavorites.some((favorite) => favorite.id === verifyId);

    if (isInFavorites) {
      dispatch({ type: REMOVE_FAVORITE_RECIPES, payload: verifyId });
      saveLocalStorage('favoriteRecipes',
        [...getFavorites].filter((f) => f.id !== verifyId));
    } else {
      const payload = verifyPath ? favoriteMeal(recipe) : favoriteDrink(recipe);
      dispatch({ type: ADD_FAVORITE_RECIPES, payload });
      saveLocalStorage('favoriteRecipes', [...getFavorites, payload]);
    }
  };

  const value = {
    appState,
    handleFavorites,
    handleRecipeStarted,
    handleRecommendations,
    handleSearch,
    handleSearchById,
    handleSubmitLogin,
  };

  return (
    <Context.Provider value={ value }>{children}</Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
