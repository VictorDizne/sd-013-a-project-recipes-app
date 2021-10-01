import React from 'react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndProvider from './renderWithRouterAndProvider';
import CardFavorite from '../components/CardFavorite';

const exemploObjDetail = {
  id: '52771',
  type: 'comida',
  area: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  doneDate: '23/06/2020',
  tags: ['Pasta', 'Curry'],
};

const testFavoriteRecipe = [
  {
    alcoholicOrNot: '',
    area: 'Canadian',
    category: 'Dessert',
    id: '52929',
    image:
        'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
    name: 'Timbits',
    type: 'comida',
  },
];

describe('1 - Verifica os testes do componente CardFavorite', () => {
  afterEach(localStorage.clear);

  test('testa se quando o card é clicado ', () => {
    const obj = { receitasFav: testFavoriteRecipe };
    localStorage.setItem('favoriteRecipes', JSON.stringify(testFavoriteRecipe));

    const { getByTestId, queryByTestId } = renderWithRouterAndProvider(
      <CardFavorite
        objDetail={ exemploObjDetail }
        index="0"
      />, { context: obj },
    );

    const buttonClick = getByTestId('0-horizontal-favorite-btn');
    userEvent.click(buttonClick);

    const buttonNull = queryByTestId('0-horizontal-favorite-btn');
    expect(buttonNull).toBe(null);
  });
});
