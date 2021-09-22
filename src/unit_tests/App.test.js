import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Teste o App', () => {
  it('Testa se Renderiza o App', () => {
    expect(renderWithRouter(<App />));
  });
});
