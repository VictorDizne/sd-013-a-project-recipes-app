import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const emailID = 'email-input';
const inputID = 'password-input';
const buttonID = 'login-submit-btn';

describe('Testando pagina de "Login"', () => {
  test('verificar se o input "Email" existe', () => {
    renderWithRouter(<App />);
    const inputValueEmail = screen.getByTestId(emailID);

    expect(inputValueEmail).toBeInTheDocument();
  });

  test('verificar se o input "Password" existe', () => {
    renderWithRouter(<App />);
    const inputValuPassWord = screen.getByTestId(inputID);

    expect(inputValuPassWord).toBeInTheDocument();
  });

  describe('Testando o "Botão"', () => {
    test('verificar se o botão existe', () => {
      renderWithRouter(<App />);
      const ButtonClick = screen.getByTestId('login-submit-btn');

      expect(ButtonClick).toBeInTheDocument();
    });

    test('verificar se o botão está desabilitado, corretamente', () => {
      renderWithRouter(<App />);
      const inputValueEmail = screen.getByTestId(emailID);
      const inputValuPassWord = screen.getByTestId(inputID);
      const ButtonClick = screen.getByTestId(buttonID);

      userEvent.type(inputValueEmail, 'Trybe012testegmail.com');
      userEvent.type(inputValuPassWord, '1234567');

      expect(ButtonClick.closest('button')).toBeDisabled();
    });

    test('verificar se o botão está habilitado, corretamente', () => {
      renderWithRouter(<App />);
      const inputValueEmail = screen.getByTestId(emailID);
      const inputValuPassWord = screen.getByTestId(inputID);
      const ButtonClick = screen.getByTestId(buttonID);

      userEvent.type(inputValueEmail, 'Trybe012teste@gmail.com');
      userEvent.type(inputValuPassWord, '1234567');

      expect(ButtonClick.closest('button')).not.toBeDisabled();
    });

    test('verificar se é redirecionado para a página de "Comidas"', () => {
      renderWithRouter(<App />);

      const inputValueEmail = screen.getByTestId(emailID);
      const inputValuPassWord = screen.getByTestId(inputID);
      const ButtonClick = screen.getByTestId(buttonID);

      userEvent.type(inputValueEmail, 'Trybe012teste@gmail.com');
      userEvent.type(inputValuPassWord, '1234567');
      userEvent.click(ButtonClick);

      const textFood = screen.getByRole('heading', {
        name: /comidas/i,
        level: 1,
      });

      expect(textFood).toBeInTheDocument();
    });
  });
});
