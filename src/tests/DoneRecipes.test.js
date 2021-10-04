import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const FILTER_BY_ALL_BTN = 'filter-by-all-btn';
const FILTER_BY_FOOD_BTN = 'filter-by-food-btn';
const FILTER_BY_DRINK_BTN = 'filter-by-drink-btn';
const RECEITAS_FEITAS = 'Receitas Feitas';

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
    const title = getByText(RECEITAS_FEITAS);

    expect(title).toBeInTheDocument();
  });

  test('Verifica se o título está presente e contém o texto "Receitas Feitas"', () => {
    const { getByTestId } = renderWithRouter(
      <DoneRecipes title="Receitas Feitas" visible={ false } />,
    );

    const pageTitle = getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe(RECEITAS_FEITAS);
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

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const LOGIN_BTN_TEST_ID = 'login-submit-btn';
const MOCK_EMAIL = 'alguem@alguem.com';

const PAGE_MOCK = '/receitas-feitas';
const DONE_IMG_TESTID = '0-horizontal-image';

describe('Testando mais da página de receitas feitas', () => {
  test('O header é renderizado corretamente', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(PAGE_MOCK);

    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toHaveTextContent('Receitas Feitas');
  });

  test('Os botões de filtro são renderizados corretamente', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(PAGE_MOCK);

    expect(getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(getByTestId('filter-by-food-btn')).toBeInTheDocument();
    expect(getByTestId('filter-by-drink-btn')).toBeInTheDocument();
  });

  test('se há uma comida feita, ela deve aparecer', async () => {
    const { getByTestId, findAllByRole, history } = renderWithRouter(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push('/comidas/52977/in-progress');

    const ingredientCheckbox = await findAllByRole('checkbox');
    ingredientCheckbox.forEach((ing) => {
      userEvent.click(ing);
    });

    userEvent.click(getByTestId('finish-recipe-btn'));

    expect(history.location.pathname).toBe(PAGE_MOCK);

    expect(getByTestId(DONE_IMG_TESTID)).toBeInTheDocument();
  });

  test('filtro por all funciona', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(PAGE_MOCK);

    const filterByAllBtn = getByTestId(FILTER_BY_ALL_BTN);
    userEvent.click(filterByAllBtn);

    expect(getByTestId(DONE_IMG_TESTID)).toBeInTheDocument();
  });

  test('filtro por food funciona', () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(PAGE_MOCK);

    const filterByFoodBtn = getByTestId(FILTER_BY_FOOD_BTN);
    userEvent.click(filterByFoodBtn);

    expect(getByTestId(DONE_IMG_TESTID)).toBeInTheDocument();
  });

  test('filtro por drink funciona', () => {
    const { getByTestId, queryByTestId, history } = renderWithRouter(<App />);

    userEvent.type(getByTestId(EMAIL_TEST_ID), MOCK_EMAIL);
    userEvent.type(getByTestId(PASSWORD_TEST_ID), '1234567');
    userEvent.click(getByTestId(LOGIN_BTN_TEST_ID));

    history.push(PAGE_MOCK);

    const filterByDrinkBtn = getByTestId(FILTER_BY_DRINK_BTN);
    userEvent.click(filterByDrinkBtn);

    expect(queryByTestId(DONE_IMG_TESTID)).toBeInTheDocument();
  });
});
