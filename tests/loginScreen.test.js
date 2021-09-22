import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import renderWithRouter from './renderWithRouter';

const btnTestId = 'login-submit-btn';
const correctEmail = 'alguem@alguem.com';
describe(`2 - Crie todos os elementos que devem respeitar
  os atributos descritos no protótipo para a tela de login`, () => {
  it('Crie um input para email', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
  });
  it('Crie um input para senha', () => {
    renderWithRouter(<App />);
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
  });
  it('Crie um botão "Entrar"', () => {
    renderWithRouter(<App />);
    const enterBtt = screen.getByTestId(btnTestId);
    expect(enterBtt).toBeInTheDocument();
  });
});

describe(`3 - Desenvolva a tela de maneira que a pessoa
  deve conseguir escrever seu email no input de email`, () => {
  it('É possível escrever o email', () => {
    renderWithRouter(<App />);
    const emailLabel = screen.getByLabelText(/Email:/i);
    userEvent.type(emailLabel, correctEmail);
    expect(emailLabel.value).toBe(correctEmail);
  });
});

describe(`4 - Desenvolva a tela de maneira que a pessoa
  deve conseguir escrever sua senha no input de senha`, () => {
  it('É possível escrever o email', () => {
    renderWithRouter(<App />);
    const passwordLabel = screen.getByLabelText(/Email:/i);
    userEvent.type(passwordLabel, 'senha123456');
    expect(passwordLabel.value).toBe('senha123456');
  });
});

describe(`5 - Desenvolva a tela de maneira que o formulário só seja válido após
um email válido e uma senha de mais de 6 caracteres serem preenchidos`, () => {
  it('O botão deve estar desativado se o email for inválido', () => {
    renderWithRouter(<App />);
    const emailLabel = screen.getByLabelText(/Email:/i);
    userEvent.type(emailLabel, 'alguemalguem.com');
    const enterBtt = screen.getByTestId(btnTestId);
    expect(enterBtt).toBeDisabled();
  });
  it('O botão deve estar desativado se a senha deve tiver 6 caracteres ou menos', () => {
    renderWithRouter(<App />);
    const passwordLabel = screen.getByLabelText(/Email:/i);
    userEvent.type(passwordLabel, '12345');
    const enterBtt = screen.getByTestId(btnTestId);
    expect(enterBtt).toBeDisabled();
  });
  it('O botão deve estar ativado se o email e a senha forem válidos', () => {
    renderWithRouter(<App />);
    const emailLabel = screen.getByLabelText(/Email:/i);
    userEvent.type(emailLabel, correctEmail);
    const passwordLabel = screen.getByLabelText(/Email:/i);
    userEvent.type(passwordLabel, 'senha123456');
    const enterBtt = screen.getByTestId(btnTestId);
    expect(enterBtt).not.toBeDisabled();
  });
});

describe(`6 - Salve 2 tokens no localStorage após a submissão,
identificados pelas chaves mealsToken e cocktailsToken`, () => {
  it(`- Após a submissão mealsToken
  e cocktailsToken devem estar salvos em localStorage`, () => {
    renderWithRouter(<App />);
    const emailLabel = screen.getByLabelText(/Email:/i);
    userEvent.type(emailLabel, correctEmail);
    const passwordLabel = screen.getByLabelText(/Email:/i);
    userEvent.type(passwordLabel, 'senha123456');
    const enterBtt = screen.getByTestId(btnTestId);
    userEvent.click(enterBtt);
    const { mealsToken } = localStorage;
    const { cocktailsToken } = localStorage;
    expect(mealsToken).toBe(1);
    expect(cocktailsToken).toBe(1);
  });
});
