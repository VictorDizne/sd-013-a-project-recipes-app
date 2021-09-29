import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import SearchBar from '../components/SearchBar';
import App from '../App';

describe('Testa as requisições para API na página de Comidas', () => {
  let history = {};
  beforeEach(async () => {
    history = renderWithRouter(<App />).history;
    const loading = screen.getByText('Loading...');
    await waitForElementToBeRemoved(() => loading);
  });

  it('Testa a busca de receitas de comidas por ingredientes', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(beefMeals),
    }));

    const searchIcon = screen.getByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click((searchIcon));

    const inputText = screen.getByTestId('search-input');
    expect(inputText).toBeInTheDocument();
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    expect(ingredientRadio).toBeInTheDocument();
    const nameRadio = screen.getByTestId('name-search-radio');
    expect(nameRadio).toBeInTheDocument();
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    expect(firstLetterRadio).toBeInTheDocument();
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.type(inputText, 'beef');
    expect(inputText).toHaveValue('beef');
    userEvent.click(ingredientRadio);
    userEvent.click(searchButton);

    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=beef');
  });
});