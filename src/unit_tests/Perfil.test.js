import React from 'react';
import { screen } from '@testing-library/react';
import Perfil from '../pages/Perfil';
import renderWithRouterAndContext from './renderWithRouterAndContext';

// const context = {
//   recipes: mealsMock.meals,
//   byIngredients: { bool: false, ingredient: '' },
//   setRecipes: () => {},
// };

describe('Test on Perfil screen, ', () => {
  it('that there is "Perfil" on Title', () => {
    renderWithRouterAndContext(
      <Perfil />,
      // context,
    );
    const title = screen.getByRole('heading', { level: '1' });
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe('Perfil');
  });

  it('that there is a profile icon', () => {
    renderWithRouterAndContext(
      <Perfil />,
      // context,
    );
    const profileIcon = screen.getByAltText('profile');
    expect(profileIcon).toBeInTheDocument();
  });

  it('that there is a span tag with email ', () => {
    renderWithRouterAndContext(
      <Perfil />,
      // context,
    );
    const spanEmail = screen.getAllByTestId(/profile-email/i);
    expect(spanEmail).toBeInTheDocument();
  });

  it('that there is the made recipes button ', () => {
    renderWithRouterAndContext(
      <Perfil />,
      // context,
    );
    const btnMadeRecipes = screen.getByRole('button', { name: /receitas feitas/i });
    expect(btnMadeRecipes).toBeInTheDocument();
  });

  it('that there is the favorite recipes button ', () => {
    renderWithRouterAndContext(
      <Perfil />,
      // context,
    );
    const btnFavoriteRecipes = screen.getByRole(
      'button', { name: /receitas favoritas/i },
    );
    expect(btnFavoriteRecipes).toBeInTheDocument();
  });

  it('that there is the logout button ', () => {
    renderWithRouterAndContext(
      <Perfil />,
      // context,
    );
    const btnLogout = screen.getByRole('button', { name: /sair/i });
    expect(btnLogout).toBeInTheDocument();
  });
});
