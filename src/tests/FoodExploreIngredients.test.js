import React from 'react';
import { wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FoodExploreIngredients from '../pages/FoodExploreIngredients';

const QTD = 12;
describe(`1 - Verifica elementos da tela de explorar ingredientes respeitando
  os atributos descritos no protótipo`, () => {
  test(`Verifica se tem os data-testids corretos para a tela de explorar
    comidas por ingredientes`, async () => {
    const { queryByTestId, findByTestId } = renderWithRouter(
      <FoodExploreIngredients
        title="Explorar Ingredientes de Comidas"
        visible={ false }
      />,
    );
    for (let index = 0; index < QTD; index += 1) {
      expect(findByTestId(`${index}-ingredient-card`)).toBeInTheDocument();
      expect(findByTestId(`${index}-card-img`)).toBeInTheDocument();
      expect(findByTestId(`${index}-card-name`)).toBeInTheDocument();
    }
    await wait(() => expect(queryByTestId('12-ingredient-card')).toBeNull());
    await wait(() => expect(queryByTestId('12-card-img')).toBeNull());
    await wait(() => expect(queryByTestId('12-card-name')).toBeNull());
  });
});
const mealsAmount = 12;
const pathIngredient = '/explorar/comidas/ingredientes';
describe('testa a pagina Ingrediente Comida ', () => {
  test('testa se a rota está correta', async () => {
    const { history } = renderWithRouter(
      <FoodExploreIngredients
        title="Explorar Ingredientes de Comidas"
        visible={ false }
      />,
    );
    expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');
  });
  test('testa se a página contém o título "Explorar Ingredientes"', async () => {
    const { findByTestId } = renderWithRouter(
      <FoodExploreIngredients
        title="Explorar Ingredientes de Comidas"
        visible={ false }
      />,
    );
    const title = await findByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
  test('testa se a página renderiza todos os cards', async () => {
    const {
      findByText, findAllByTestId,
    } = renderWithRouter(<FoodExploreIngredients
      title="Explorar Ingredientes de Comidas"
      visible={ false }
    />);
    const meal = await findByText(/Chicken/i);
    expect(meal).toBeInTheDocument();
    const cardMeals = await findAllByTestId(/ingredient-card/i);
    expect(cardMeals.length).toBe(mealsAmount);
    cardMeals.forEach((mealsCard) => {
      expect(mealsCard).toBeInTheDocument();
    });
  });
  test('testa se clicando no nome da comida, é redirecionado para'
    + ' página de comidas', async () => {
    const { history, findByTestId } = renderWithRouter(
      <FoodExploreIngredients
        title="Explorar Ingredientes de Comidas"
        visible={ false }
      />,
    );
    history.push(pathIngredient);
    const chickenCard = await findByTestId('0-ingredient-card');
    userEvent.click(chickenCard);
    const path = history.location.pathname;
    expect(path).toBe('/comidas');
  });
});
