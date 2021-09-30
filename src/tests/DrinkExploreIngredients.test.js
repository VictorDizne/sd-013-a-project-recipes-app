import React from 'react';
import { wait } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import DrinkExploreIngredients from '../pages/DrinkExploreIngredients';

const QTD = 12;

describe(`1 - Verifica elementos da tela de explorar ingredientes respeitando
  os atributos descritos no protótipo`, () => {
  test(`Verifica se tem os data-testids corretos para a tela de explorar
    bebidas por ingredientes`, async () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <DrinkExploreIngredients
        title="Explorar Ingredientes de Bebidas"
        visible={ false }
      />,
    );

    for (let index = 0; index < QTD; index += 1) {
      expect(getByTestId(`${index}-ingredient-card`)).toBeInTheDocument();
      expect(getByTestId(`${index}-card-img`)).toBeInTheDocument();
      expect(getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }

    await wait(() => expect(queryByTestId('12-ingredient-card')).toBeNull());
    await wait(() => expect(queryByTestId('12-card-img')).toBeNull());
    await wait(() => expect(queryByTestId('12-card-name')).toBeNull());
  });
});

const drinkAmount = 12;
const pathIngredient = '/explorar/bebidas/ingredientes';

describe('testa a pagina Ingrediente Bebida ', () => {
  test('testa se a rota está correta', async () => {
    const { history } = renderWithRouter(
      <DrinkExploreIngredients
        title="Explorar Ingredientes de Bebidas"
        visible={ false }
      />,
    );

    history.push(pathIngredient);
  });

  test('testa se a página contém o título "Explorar Ingredientes"', async () => {
    const { findByTestId } = renderWithRouter(
      <DrinkExploreIngredients
        title="Explorar Ingredientes de Bebidas"
        visible={ false }
      />,
    );

    const title = await findByTestId('page-title');
    expect(title).toBeInTheDocument();
  });

  test('testa se a página renderiza todos os cards', async () => {
    const { findByText, findAllByTestId } = renderWithRouter(
      <DrinkExploreIngredients
        title="Explorar Ingredientes de Bebidas"
        visible={ false }
      />,
    );

    const drink = await findByText(/Light rum/i);
    expect(drink).toBeInTheDocument();

    const drinkMeals = await findAllByTestId(/ingredient-card/i);
    expect(drinkMeals.length).toBe(drinkAmount);

    drinkMeals.forEach((drinksCard) => {
      expect(drinksCard).toBeInTheDocument();
    });
  });
});
