import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import SearchButton from '../components/searchButton';

const mainPage = '/comidas';
// const drinksPage = '/bebidas';
const startToSearchBtt = 'search-top-btn';
const radioIngredient = 'ingredient-search-radio';
const searchButton = 'exec-search-btn';

describe(`13 - Implemente os elementos da barra de busca
  respeitando os atributos descritos no protótipo`, () => {
  it(`Deve existir os data-testids tanto da barra
    de busca quanto de todos os radio-buttons.`, () => {
    renderWithRouter(<SearchButton />);
    const operSearchBar = screen.getByTestId(startToSearchBtt);
    userEvent.click(operSearchBar);
    const ingredientRadio = screen.getByTestId(radioIngredient);
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchBtt = screen.getByTestId(searchButton);

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchBtt).toBeInTheDocument();
  });
});

describe(`14 - Posicione a barra logo abaixo do
  header e implemente 3 radio buttons: Ingrediente, Nome e Primeira letra`, () => {
  it(`Se o radio selecionado for Ingrediente, a
    busca na API é feita corretamente pelo ingrediente`, async () => {
    const resultByIngredient = {
      meals: [
        {
          strMeal: 'Chick-Fil-A Sandwich',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/sbx7n71587673021.jpg',
          idMeal: '53016',
        },
      ],
    };

    const { history } = renderWithRouter(<App />);
    history.push(mainPage);
    const operSearchBar = screen.getByTestId(startToSearchBtt);
    userEvent.click(operSearchBar);
    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId(radioIngredient);
    const searchBtt = screen.getByTestId(searchButton);
    userEvent.type(searchInput, 'chicken_breast');
    userEvent.click(ingredientRadio);
    userEvent.click(searchBtt);

    const response = { json: jest.fn().mockResolvedValue(resultByIngredient) };
    global.fetch = jest.fn().mockResolvedValue(response);

    await waitForElement(() => screen.findByText('Chick-Fil-A Sandwich'));
  });
});
