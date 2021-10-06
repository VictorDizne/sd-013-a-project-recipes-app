import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { MainContext } from '../context/Provider';

const renderWithRouterAndContext = (component, value) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <MainContext.Provider value={ value }>
        <Router history={ history }>
          {component}
        </Router>
      </MainContext.Provider>,
    ),
    history,
  });
};
export default renderWithRouterAndContext;
