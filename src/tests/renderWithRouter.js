import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import AppProvider from '../contexts/appProvider';

function renderWithRouter(component) {
  const historyMock = createMemoryHistory();

  const objRender = render(
    <AppProvider>
      <Router history={ historyMock }>
        { component }
      </Router>
    </AppProvider>,
  );
  return {
    ...objRender,
    history: historyMock,
  };
}

export default renderWithRouter;
