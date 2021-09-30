import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Foods from '../pages/Foods';

describe('1 - Verifica os elementos presentes no Header', () => {
  test('Verifica se o título está presente e contém o texto "Comidas"', () => {
    const { getByTestId } = renderWithRouter(<Foods title="Comidas" />);
    const pageTitle = getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Comidas');
  });

  test('Verifica de exite o botão perfil e se funciona corretamente', () => {
    const { getByTestId, history } = renderWithRouter(<Foods title="Comidas" />);
    const btnProfile = getByTestId('profile-top-btn');
    userEvent.click(btnProfile);
    const { pathname } = history.location;
    expect(btnProfile).toBeInTheDocument();
    expect(pathname).toBe('/perfil');
  });
});

describe('2 - Verifica as funcionalidades da tela de receitas de comidas', () => {
  test('Caso uma comida seja encontrada, deve-se ir para rota de detalhes', async () => {
    const { history } = renderWithRouter(<Foods title="Comidas" />);
    const searchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId('search-input');
    const nameRadio = screen.getByTestId('name-search-radio');
    const btnExecSearch = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'Corba');
    userEvent.click(nameRadio);
    userEvent.click(btnExecSearch);

    await screen.findByText('Corba');

    expect(history.location.pathname).toBe('/comidas/52977');
  });
});

describe('3 - Elementos na Página Drinks', () => {
  it('Verifica se Footer é renderizado', () => {
    renderWithRouter(<Foods title="Comidas" />);
    const footerField = screen.getByTestId('footer');
    expect(footerField).toBeInTheDocument();
  });

  it('Verifica se drinkIcon é renderizado', () => {
    renderWithRouter(<Foods title="Comidas" />);
    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinkButton).toBeInTheDocument();
  });

  it('Verifica se searchIcon é renderizado', () => {
    renderWithRouter(<Foods title="Comidas" />);
    const searchButton = screen.getByTestId('explore-bottom-btn');
    expect(searchButton).toBeInTheDocument();
  });

  it('Verifica se foodIcon é renderizado', () => {
    renderWithRouter(<Foods title="Comidas" />);
    const foodButton = screen.getByTestId('food-bottom-btn');
    expect(foodButton).toBeInTheDocument();
  });
});

const mealsAmount = 12; // no magic numbers
const breakfastIdTest = 'Breakfast-category-filter';
const buttonIdTest = 'All-category-filter';

describe('testa se a página de comidas é renderizada', () => {
  test('testa a rota da página de comidas', async () => {
    const { history, getByTestId } = renderWithRouter(<Foods title="Comidas" />);
    history.push('/comidas');

    const buttonAll = await getByTestId(buttonIdTest);
    userEvent.click(buttonAll);
    const path = history.location.pathname;

    expect(path).toBe('/comidas');
  });

  test('testa a quantidade dos cards de comida', async () => {
    const { history, findByText, findAllByTestId } = renderWithRouter(
      <Foods title="Comidas" />,
    );
    history.push('/comidas');

    const meal = await findByText(/lasagne/i);
    expect(meal).toBeInTheDocument();

    const cardsMeal = await findAllByTestId(/recipe-card/i);
    expect(cardsMeal.length).toBe(mealsAmount);

    cardsMeal.forEach((mealCard) => {
      expect(mealCard).toBeInTheDocument();
    });
  });

  test('testa se os filtros da página de comidas são renderizados', async () => {
    const { history, findByTestId } = renderWithRouter(<Foods title="Comidas" />);
    history.push('/comidas');

    const buttonAll = await findByTestId(buttonIdTest);
    expect(buttonAll).toBeInTheDocument(buttonIdTest);

    const btnBreakast = await findByTestId(breakfastIdTest);
    expect(btnBreakast).toBeInTheDocument(breakfastIdTest);

    const btnChicken = await findByTestId('Chicken-category-filter');
    expect(btnChicken).toBeInTheDocument('Chicken-category-filter');

    const btnDessert = await findByTestId('Dessert-category-filter');
    expect(btnDessert).toBeInTheDocument('Dessert-category-filter');

    const btnGoat = await findByTestId('Goat-category-filter');
    expect(btnGoat).toBeInTheDocument('Goat-category-filter');

    const btnBeef = await findByTestId('Beef-category-filter');
    expect(btnBeef).toBeInTheDocument('Beef-category-filter');
  });

  test('testa o click em um botão da categoria', async () => {
    const { history, findByTestId, findByText } = renderWithRouter(
      <Foods title="Comidas" />,
    );
    history.push('/comidas');

    const breakfastButton = await findByTestId(breakfastIdTest);
    userEvent.click(breakfastButton);
    const text = await findByText('English Breakfast');
    expect(text).toBeInTheDocument();
  });

  test('testa a quantidade dos cards de comida', async () => {
    const { history, findByText, findAllByTestId } = renderWithRouter(
      <Foods title="Comidas" />,
    );
    history.push('/comidas');

    const meal = await findByText(/lasagne/i);
    expect(meal).toBeInTheDocument();

    const cardsMeal = await findAllByTestId(/recipe-card/i);
    expect(cardsMeal.length).toBe(mealsAmount);

    cardsMeal.forEach((mealCard) => {
      expect(mealCard).toBeInTheDocument();
    });
  });
});
