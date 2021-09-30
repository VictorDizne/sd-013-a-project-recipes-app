import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import App from '../App';

describe('Verifica o funcionamento de tela de detalhes', () => {
  const path = '/comidas/52977';
  it('Verifica se é renderizado o card de comida', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(path);

    const loading = screen.getByText(/carregando/i);
    expect(loading).toBeInTheDocument();

    const title = await screen.findByTestId('recipe-category');
    expect(title).toBeInTheDocument();
  });

  it('Verifica se é renderizado o card de bebida', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas/15997');

    const title = await screen.findByText('Ordinary Drink (Optional alcohol)');
    expect(title).toBeInTheDocument();
  });

  it('Verifica o botão de iniciar receita', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas/15997');

    const btnIniciar = await screen.findByTestId('start-recipe-btn');
    expect(btnIniciar).toBeInTheDocument();

    userEvent.click(btnIniciar);
    expect(history.location.pathname).toBe('/bebidas/15997/in-progress');
  });

  it('Verifica o botão de iniciar receita', async () => {
    const url = path;
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const btnIniciar = await screen.findByTestId('start-recipe-btn');
    expect(btnIniciar).toBeInTheDocument();

    userEvent.click(btnIniciar);
    history.push(url);

    expect(btnIniciar.innerText).toBe(/continuar receita/i);
  });
  it('Verifica o funcionamento do botão favoritos', async () => {
    const url = path;
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const btnFavoriteRecipe = await screen.findByTestId('favorite-btn');

    fireEvent.click(btnFavoriteRecipe);
    expect(btnFavoriteRecipe).toHaveAttribute('src', blackHeartIcon);
  });
});
