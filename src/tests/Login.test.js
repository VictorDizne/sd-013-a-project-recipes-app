import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando pagina de "Login"', () => {
  test('verificar se o input "Email" esta renderizando', () => {
    renderWithRouter(<App />);
    const inputValueEmail = screen.getByTestId('email-input');

    expect(inputValueEmail).toBeInTheDocument();
  });
});
