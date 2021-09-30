import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Drinks from '../pages/Drinks';

describe('1 - Verifica o funcionamento da tela de bebidas', () => {
  test('Verifica se o título está presente e contém o texto "Bebidas"', () => {
    const { getByTestId } = renderWithRouter(<Drinks title="Bebidas" />);
    const pageTitle = getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Bebidas');
  });

  test('Verifica de exite o botão perfil e se funciona corretamente', () => {
    const { getByTestId, history } = renderWithRouter(<Drinks title="Bebidas" />);
    const btnProfile = getByTestId('profile-top-btn');
    userEvent.click(btnProfile);
    const { pathname } = history.location;
    expect(btnProfile).toBeInTheDocument();
    expect(pathname).toBe('/perfil');
  });
});

describe('2 - Verifica as funcionalidades da tela de receitas de bebidas', () => {
  test('Caso uma bebida seja encontrada, deve-se ir para rota de detalhes', async () => {
    const { history } = renderWithRouter(<Drinks title="Bebidas" />);
    const searchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId('search-input');
    const nameRadio = screen.getByTestId('name-search-radio');
    const btnExecSearch = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'A1');
    userEvent.click(nameRadio);
    userEvent.click(btnExecSearch);

    await screen.findByText('A1');

    expect(history.location.pathname).toBe('/bebidas/17222');
  });
});

describe('3 - Elementos na Página Drinks', () => {
  it('Verifica se Footer é renderizado', () => {
    renderWithRouter(<Drinks title="Bebidas" />);
    const footerField = screen.getByTestId('footer');
    expect(footerField).toBeInTheDocument();
  });

  it('Verifica se drinkIcon é renderizado', () => {
    renderWithRouter(<Drinks title="Bebidas" />);
    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinkButton).toBeInTheDocument();
  });

  it('Verifica se searchIcon é renderizado', () => {
    renderWithRouter(<Drinks title="Bebidas" />);
    const searchButton = screen.getByTestId('explore-bottom-btn');
    expect(searchButton).toBeInTheDocument();
  });

  it('Verifica se foodIcon é renderizado', () => {
    renderWithRouter(<Drinks title="Bebidas" />);
    const foodButton = screen.getByTestId('food-bottom-btn');
    expect(foodButton).toBeInTheDocument();
  });
});

const drinksAmount = 12;
const btnDrinkId = 'Ordinary Drink-category-filter';
const btnAll = 'All-category-filter';

describe('testa a página de bebidas ', () => {
  test('testa a rota', async () => {
    const { history, getByTestId } = renderWithRouter(<Drinks title="Bebidas" />);
    history.push('/bebidas');
    const allButton = await getByTestId(btnAll);
    userEvent.click(allButton);
    const path = history.location.pathname;

    expect(path).toBe('/bebidas');
  });

  test('testa a quantidade de cards de bebidas', async () => {
    const { history, findByText, findAllByTestId } = renderWithRouter(
      <Drinks
        title="Bebidas"
      />,
    );
    history.push('/bebidas');

    const drink = await findByText(/B-53/i);
    expect(drink).toBeInTheDocument();

    const cardDrinks = await findAllByTestId(/recipe-card/i);
    expect(cardDrinks.length).toBe(drinksAmount);

    cardDrinks.forEach((drinkCard) => {
      expect(drinkCard).toBeInTheDocument();
    });
  });

  test('testa se os filtros de categorias de bebidas são renderizados', async () => {
    const { history, findByTestId } = renderWithRouter(<Drinks title="Bebidas" />);
    history.push('/bebidas');

    const buttonAll = await findByTestId(btnAll);
    expect(buttonAll).toBeInTheDocument(btnAll);

    const btnOrdinary = await findByTestId(btnDrinkId);
    expect(btnOrdinary).toBeInTheDocument(btnDrinkId);

    const btnCocktail = await findByTestId('Cocktail-category-filter');
    expect(btnCocktail).toBeInTheDocument('Cocktail-category-filter');

    const btnMilk = await findByTestId('Milk / Float / Shake-category-filter');
    expect(btnMilk).toBeInTheDocument('Milk / Float / Shake-category-filter');

    const btnOther = await findByTestId('Other/Unknown-category-filter');
    expect(btnOther).toBeInTheDocument('Other/Unknown-category-filter');

    const btnCocoa = await findByTestId('Cocoa-category-filter');
    expect(btnCocoa).toBeInTheDocument('Cocoa-category-filter');
  });

  test('testa o click em um botão da categoria', async () => {
    const { history, findByTestId, findByText } = renderWithRouter(
      <Drinks title="Bebidas" />,
    );
    history.push('/bebidas');

    const btnOrdinary = await findByTestId(btnDrinkId);
    userEvent.click(btnOrdinary);
    const text = await findByText('A Day at the Beach');
    expect(text).toBeInTheDocument();
  });
});
