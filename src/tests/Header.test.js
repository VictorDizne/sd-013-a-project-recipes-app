import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Header from '../components/Header';
import '@testing-library/jest-dom';
import FoodExploreIngredients from '../pages/FoodExploreIngredients';

describe('Componente Header', () => {
  test('Há um elemento botão de Perfil', () => {
    renderWithRouter(<Header title="Comidas" />);

    const profileTopBtn = screen.getByTestId('profile-top-btn');
    expect(profileTopBtn).toBeInTheDocument();
  });

  test('O título é renderizado', () => {
    renderWithRouter(<Header title="Comidas" />);

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
  });

  test('Há um botão de Search', () => {
    renderWithRouter(<Header title="Comidas" />);

    const searchTopBtn = screen.getByTestId('search-top-btn');
    expect(searchTopBtn).toBeInTheDocument();
  });

  test('Search Ingredients page has correct'
    + 'elements and title "Explorar Ingredientes', () => {
    const { getByText, queryByRole, history } = renderWithRouter(<FoodExploreIngredients />);

    const title = getByText(/Explorar Ingredientes/i);

    const searchBtn = queryByRole('img', { name: /search icon/i });
    const profileLink = queryByRole('img', { name: /profile icon/i });

    expect(title).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
    userEvent.click(profileLink);
    expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');
  });
});
