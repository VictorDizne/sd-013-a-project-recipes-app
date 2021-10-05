import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { Profile } from '../pages';

describe('82 a 84 Implemente os elementos da a tela de perfil ', () => {
  it('Todos o data-testid do email e de todos os botões', () => {
    renderWithRouter(<Profile />);
    const emailElement = screen.getByTestId('profile-email');
    const doneRecipes = screen.getByTestId('profile-done-btn');
    const favoriteRecipes = screen.getByTestId('profile-favorite-btn');
    const btnExit = screen.getByTestId('profile-logout-btn');

    expect(emailElement).toBeInTheDocument();
    expect(doneRecipes).toBeInTheDocument();
    expect(favoriteRecipes).toBeInTheDocument();
    expect(btnExit).toBeInTheDocument();
  });
});

describe('85 a 87 verifica se os botoes redirecionam para rota correta', () => {
  it('verifica se os botoes redirecionam para rota correta', () => {
    const { history } = renderWithRouter(<Profile />);
    history.push('/perfil');
    const doneRecipes = screen.getByTestId('profile-done-btn');
    const favoriteRecipes = screen.getByTestId('profile-favorite-btn');
    const btnExit = screen.getByTestId('profile-logout-btn');

    fireEvent.click(doneRecipes);
    expect(history.location.pathname).toEqual('/receitas-feitas');
    history.push('/perfil');
    fireEvent.click(favoriteRecipes);
    expect(history.location.pathname).toEqual('/receitas-favoritas');
    history.push('/perfil');
    fireEvent.click(btnExit);
    expect(history.location.pathname).toEqual('/');
  });
});
