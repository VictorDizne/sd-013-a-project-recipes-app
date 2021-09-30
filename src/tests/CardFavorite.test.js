import React from 'react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import CardFavorite from '../components/CardFavorite';

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

  it('testa se quando a imagem da receita é clicada, a pagina é redirecionada', () => {
    const { getByTestId, history } = renderWithRouter(
      <CardFavorite
        objDetail={ exemploObjDetail }
        index="0"
      />,
    );
    const foodImage = getByTestId('0-horizontal-image');
    userEvent.click(foodImage);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas/52771');
  });
});
