import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Comidas from '../pages/Comidas';

describe('Testa o Footer', () => {
  it('Teste se existe um icone de Bebidas', () => {
    renderWithRouter(<Comidas />);

    const button = screen.getByTestId('drinks-bottom-btn');
    expect(button).toBeInTheDocument();
  });

  it('Teste se existe um icone de Explorar', () => {
    renderWithRouter(<Comidas />);

    const button = screen.getByTestId('explore-bottom-btn');
    expect(button).toBeInTheDocument();
  });

  it('Teste se existe um icone de Comidas', () => {
    renderWithRouter(<Comidas />);

    const button = screen.getByTestId('food-bottom-btn');
    expect(button).toBeInTheDocument();
  });
});
