import React from 'react';
import { fireEvent } from '@testing-library/react';
import Explore from '../pages/Explore';
import renderWithRouter from './renderWithRouter';

describe('Página de Explorar', () => {
  test('Existe um botão para explorar comidas', () => {
    const { getByTestId } = renderWithRouter(<Explore />, '/explorar');

    const buttonExplorFood = getByTestId('explore-food');
    expect(buttonExplorFood).toBeInTheDocument();
  });

  test('Existe um botão para explorar Bebidas', () => {
    const { getByTestId } = renderWithRouter(<Explore />, '/explorar');
    const buttonExplorDrink = getByTestId('explore-drinks');
    expect(buttonExplorDrink).toBeInTheDocument();
  });

  test('Usuário é redirecionado para  \'/explorar/comidas\' ao clicar no botão', () => {
    const { history, getByTestId } = renderWithRouter(<Explore />, '/explorar');

    const explorFoodButton = getByTestId('explore-food');
    fireEvent.click(explorFoodButton);

    expect(history.location.pathname).toBe('/explorar/comidas');
  });

  test('Usuário é redirecionado para  \'/explorar/bebidas\' ao clicar no botão', () => {
    const { history, getByTestId } = renderWithRouter(<Explore />, '/explorar');

    const explorDrinksButton = getByTestId('explore-drinks');
    fireEvent.click(explorDrinksButton);

    expect(history.location.pathname).toBe('/explorar/bebidas');
  });
});
