// import React from 'react';
// import { screen, fireEvent } from '@testing-library/react';
// import renderWithRouter from './renderWithRouter';
// import { FavoriteRecipes } from '../pages';

// describe('61', () => {
//   it('Testa se todos os atributos da comida estao corretos', () => {
//     const { history } = renderWithRouter(<FavoriteRecipes />);
//     const categoria = 'Croatian - Side';
//     const food = 'Burek';
//     history.push('/comidas/53060');
//     const favoritaUmaComida = screen.getByTestId('favorite-btn');
//     fireEvent.click(favoritaUmaComida);
//     history.push('/receitas-favoritas');
//     expect(categoria && food && favoritaUmaComida).toBeInTheDocument();
//   });
// });

// describe('62 ', () => {
//   it('Testa se todos os atributos da bebida estao corretos', () => {
//     const { history } = renderWithRouter(<FavoriteRecipes />);
//     const categoria = 'Optional Alcohol';
//     const drink = 'GG';
//     const btnUnfavorite = screen.getByTestId('favorite-btn');
//     history.push('bebidas/15997');
//     const favoritaUmaComida = screen.getByTestId('favorite-btn');
//     fireEvent.click(favoritaUmaComida);
//     history.push('/receitas-favoritas');
//     expect(categoria && drink && btnfavorite).toBeInTheDocument();
//   });
// });

// describe('63 ', () => {
//   it('Testa link copiado', () => {
//     const { history } = renderWithRouter(<FavoriteRecipes />);
//     history.push('receitas-favoritas');
//     const shareBtn = screen.getByTestId('share-btn');
//     fireEvent.click(shareBtn);
//     expect('Link copiado!').toBeInTheDocument();
//   });
// });

// describe('64 ', () => {
//   it('Testa botao desfavoritar', () => {
//     const { history } = renderWithRouter(<FavoriteRecipes />);
//     history.push('/comidas/53060');
//     const favoritaUmaComida = screen.getByTestId('favorite-btn');
//     fireEvent.click(favoritaUmaComida);
//     history.push('/receitas-favoritas');
//     expect('Burek').toBeInTheDocument();
//     fireEvent.click(favoritaUmaComida);
//     expect('Burek').not.toBeInTheDocument();
//   });
// });

// describe('65 ', () => {
//   it('Verifica os botoes existentes', () => {
//     const { history } = renderWithRouter(<FavoriteRecipes />);
//     history.push('/receitas-favoritas');
//     const allBtn = screen.getByTestId('filter-by-all-btn');
//     const foodBtn = screen.getByTestId('filter-by-food-btn');
//     const drinkBtn = screen.getByTestId('filter-by-drink-btn');
//     expect(allBtn).toBeInTheDocument();
//     expect(foodBtn).toBeInTheDocument();
//     expect(drinkBtn).toBeInTheDocument();
//   });
// });

// describe('66 ', () => {
//   it('Verifica se ao clicar na imagem redireciona para url details', () => {
//     const { history } = renderWithRouter(<FavoriteRecipes />);
//     history.push('/comidas/53060');
//     const favoritaUmaComida = screen.getByTestId('favorite-btn');
//     fireEvent.click(favoritaUmaComida);
//     history.push('/receitas-favoritas');
//     const imgBurek = screen.getAllByRole('img');
//     fireEvent.click(imgBurek);
//     expect(history.location.pathname).toEqual('/comidas/53060');
//   });
// });
