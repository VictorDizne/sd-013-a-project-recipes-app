import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Verifica funcionamento da tela de receitas em progresso', () => {
  it('Verifica se aparece o título na tela para comida', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas/52977/in-progress');

    const title = await screen.findByTestId('recipe-category');
    expect(title).toBeInTheDocument();
  });

  it('Verifica se aparece o título na tela para bebida', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas/17222/in-progress');

    const title = await screen.findByTestId('recipe-category');
    expect(title).toBeInTheDocument();
  });

  it('Verifica botão finalizar', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas/52977/in-progress');

    const btnFinish = await screen.findByTestId('finish-recipe-btn');
    expect(btnFinish).toBeInTheDocument();
    expect(btnFinish).toBeDisabled();
  });
});
