import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouter from './renderWithRouter';

const FILTER_BY_ALL_BTN = 'filter-by-all-btn';
const FILTER_BY_FOOD_BTN = 'filter-by-food-btn';
const FILTER_BY_DRINK_BTN = 'filter-by-drink-btn';

const doneRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

describe('1 - Verifica os elementos presentes na tela Receitas Feitas', () => {
  test('Verifica se a pagina de Receitas Feitas é renderizada', () => {
    const { getByText } = renderWithRouter(
      <DoneRecipes
        title="Receitas Feitas"
        visible={ false }
      />,
    );
    const title = getByText('Receitas Feitas');

    expect(title).toBeInTheDocument();
  });

  test('Verifica se o título está presente e contém o texto "Receitas Feitas"', () => {
    const { getByTestId } = renderWithRouter(
      <DoneRecipes title="Receitas Feitas" visible={ false } />,
    );

    const pageTitle = getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Receitas Feitas');
  });

  test('Verifica se os botões de filtro estão presentes', () => {
    const { getByTestId } = renderWithRouter(
      <DoneRecipes title="Receitas Feitas" visible={ false } />,
    );
    const btnAll = getByTestId(FILTER_BY_ALL_BTN);
    const btnFood = getByTestId(FILTER_BY_FOOD_BTN);
    const btnDrink = getByTestId(FILTER_BY_DRINK_BTN);
    expect(btnAll).toBeInTheDocument();
    expect(btnFood).toBeInTheDocument();
    expect(btnDrink).toBeInTheDocument();
  });

  test('Verifica se a tela contem 3 botões', () => {
    renderWithRouter(<DoneRecipes title="Receitas Feitas" visible={ false } />);

    expect(screen.getByTestId(FILTER_BY_ALL_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(FILTER_BY_FOOD_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(FILTER_BY_DRINK_BTN)).toBeInTheDocument();
  });
});

describe('2 - Verifica se uma receita feita é carregada', () => {
  test('Mostra uma receita feita', async () => {
    const testDoneRecipe = [
      {
        alcoholicOrNot: '',
        doneDate: '29/03/2021',
        area: 'Canadian',
        category: 'Dessert',
        id: '52929',
        image:
            'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
        name: 'Timbits',
        type: 'comida',
        tags: ['Soup'],
      },
    ];

    localStorage.setItem('doneRecipes', JSON.stringify(testDoneRecipe));

    renderWithRouter(
      <DoneRecipes title="Receitas Feitas" visible={ false } />,
    );

    const recipeName = screen.getByTestId('0-horizontal-name');
    expect(recipeName.innerHTML).toBe('Timbits');
  });

  test('Verifica se renderiza duas receitas', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const { getAllByTestId } = renderWithRouter(<DoneRecipes />);

    const allCard = getAllByTestId(/-horizontal-name/i);

    expect(allCard.length).toBe(2);
  });

  test('Verifica se os filtros estão funcionando', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const { getAllByTestId, getByTestId } = renderWithRouter(
      <DoneRecipes
        title="Receitas Feitas"
        visible={ false }
      />,
    );

    const buttonAll = getByTestId(FILTER_BY_ALL_BTN);
    const buttonFood = getByTestId(FILTER_BY_FOOD_BTN);
    const buttonDrink = getByTestId(FILTER_BY_DRINK_BTN);

    const allCard = getAllByTestId(/-horizontal-name/i);

    fireEvent.click(buttonAll);
    expect(allCard.length).toBe(2);

    fireEvent.click(buttonFood);
    const CardFood = getAllByTestId(/-horizontal-name/i);
    expect(CardFood.length).toBe(1);

    fireEvent.click(buttonDrink);
    const CardDrink = getAllByTestId(/-horizontal-name/i);
    expect(CardDrink.length).toBe(1);
  });
});
