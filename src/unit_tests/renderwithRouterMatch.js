import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { MainContext } from '../context/Provider';

const renderWithRouterMatch = (component, value, {
  path = '/',
  route = '/',
}) => {
  const history = createMemoryHistory({ initialEntries: [route] });
  return ({
    ...render(
      <Router history={ history }>
        <MainContext.Provider value={ value }>
          <Route path={ path } component={ component } />
        </MainContext.Provider>
      </Router>,
    ),
    history,
  });
};
export default renderWithRouterMatch;
