import React from 'react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
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

describe('1 - Verifica os testes do componente CardFavorite', () => {
  test('testa se quando o card é clicado ', () => {
    const { getByTestId } = renderWithRouter(
      <CardFavorite
        objDetail={ exemploObjDetail }
        index="0"
      />,
    );

    const buttonClick = getByTestId(`${index}-horizontal-favorite-btn`);
    userEvent.click(buttonClick);

    expect(pathname).toBe('/comidas/52771');
  });
});
