import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

// Children
import userEvent from '@testing-library/user-event';
import Done from '../pages/Done';

// Helpers
import renderWithReduxAndRouter from '../helpers/renderWithReduxAndRouter';

// Mocks
import { doneMock, drinksQuantity, foodQuantity } from '../mocks/DoneMock';

// History
// let mockHistory = {};
const PROFILE_ICON = 'profile-top-btn';
const PAGE_TITLE = 'page-title';
const ALL_BTN = 'filter-by-all-btn';
const FOOD_BTN = 'filter-by-food-btn';
const DRINK_BTN = 'filter-by-drink-btn';
const FOOD_NAME = 'comida';
const DRINK_NAME = 'bebida';
const DONE_RECIPES_LOCAL_STORAGE_MOCK = JSON.stringify(doneMock);
// const FOODS = JSON.stringify(doneMockFoodOnly);
// const DRINKS = JSON.stringify(doneMockDrinksOnly);
describe('Testa as funcionalidades da Done.jsx', () => {
  beforeEach(() => {
    renderWithReduxAndRouter(<Done />, {
      items: { doneRecipes: DONE_RECIPES_LOCAL_STORAGE_MOCK },
    });
    // mockHistory = history;
  });
  it('Testa se renderiza o componente Header sem o searchButton.', () => {
    const profileImage = screen.getByTestId(PROFILE_ICON);
    const pageTitle = screen.getByTestId(PAGE_TITLE);
    expect(profileImage).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toContainHTML('Receitas Feitas');
  });
  it('Testa se renderiza os três botões de filtragem.', () => {
    const allButton = screen.getByTestId(ALL_BTN);
    const foodButton = screen.getByTestId(FOOD_BTN);
    const drinkButton = screen.getByTestId(DRINK_BTN);

    expect(allButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
  });
  it('Testa se as receitas prontas são renderizadas à tela.', () => {
    // https://trybecourse.slack.com/archives/C0219LZPB9N/p1633048749043600
    const comidas = screen.getAllByTestId(FOOD_NAME);
    const bebidas = screen.getAllByTestId(DRINK_NAME);

    const totalItens = bebidas.length + comidas.length;

    expect(totalItens).toBe(foodQuantity + drinksQuantity);
  });
  it('Testa se, ao clicar em Food, filtra a lista por comidas', () => {
    const foodButton = screen.getByTestId(FOOD_BTN);

    userEvent.click(foodButton);

    const comidas = screen.queryAllByTestId(FOOD_NAME);
    const bebidas = screen.queryAllByTestId(DRINK_NAME);
    const totalBebidas = bebidas.length;
    const totalComidas = comidas.length;

    expect(totalBebidas).toBe(0);
    expect(totalComidas).toBe(foodQuantity);
  });
  it('Testa se, ao clicar em Drinks, filtra a lista por bebidas', () => {
    // Tem um bug nesse teste, ele aprova o oposto do que precisamos.
    const drinkButton = screen.getByTestId(DRINK_BTN);

    userEvent.click(drinkButton);

    const comidas = screen.queryAllByTestId(FOOD_NAME);
    const bebidas = screen.queryAllByTestId(DRINK_NAME);
    const totalBebidas = bebidas.length;
    const totalComidas = comidas.length;

    expect(totalBebidas).toBe(drinksQuantity);
    expect(totalComidas).toBe(0);
  });
});
