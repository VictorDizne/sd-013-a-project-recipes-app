import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Login } from '../pages';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa a pagina Login', () => {
  it('Testa se tem um input de email', () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
  });

  it('Testa se tem um input de senha', () => {
    renderWithRouter(<Login />);
    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
  });

  it('Testa se tem um botão de login', () => {
    renderWithRouter(<Login />);
    const button = screen.getByTestId('login-submit-btn');
    expect(button).toBeInTheDocument();
  });

  it('Testa se ao efetuar o login é redirecionado para pagina "Comidas"', () => {
    const { history } = renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'teste@test.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
