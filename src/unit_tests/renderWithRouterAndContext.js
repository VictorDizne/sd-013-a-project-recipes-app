import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { LocalStorageMock } from '@react-mock/localstorage';
import { MainContext } from '../context/Provider';

const renderWithRouterAndContext = (
  component, value, initialEntries = ['/'], items = {},
) => {
  const history = createMemoryHistory({ initialEntries });
  return ({
    ...render(
      <Router history={ history }>
        <MainContext.Provider value={ value }>
          <LocalStorageMock items={ items }>
            {component}
          </LocalStorageMock>
        </MainContext.Provider>
      </Router>,
    ),
    history,
  });
};
export default renderWithRouterAndContext;
