import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import Provider from '../context/Provider';
import RecipeContext from '../context/RecipeContext';

const renderWithRouterAndProvider = (component, { context = {} } = {}) => {
  const history = createMemoryHistory();
  return {
    ...render(
      <RecipeContext.Provider value={ context }>
        <Router history={ history }>{component}</Router>
      </RecipeContext.Provider>,
    ),
    history,
  };
};

export default renderWithRouterAndProvider;
