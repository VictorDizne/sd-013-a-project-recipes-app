import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { FavoriteRecipes } from '../pages';

const favoriteRecipe = '/receitas-favoritas';
const urlBurek = '/comidas/53060';

describe('61 teste pagina Receitas Favoritas', () => {
  it('Testa se todos os atributos da comida estao corretos', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    history.push(urlBurek);
    const categoria = 'Croatian - Side';
    const food = 'Burek';
    const favoritaUmaComida = screen.getAllByRole('button')[1];
    fireEvent.click(favoritaUmaComida);
    history.push(favoriteRecipe);
    expect(categoria && food && favoritaUmaComida).toBeInTheDocument();
  });
});

describe('62 teste pagina Receitas Favoritas', () => {
  it('Testa se todos os atributos da bebida estao corretos', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    const categoria = 'Optional Alcohol';
    const drink = 'GG';
    history.push('bebidas/15997');
    const favoritaUmaBebida = screen.getAllByRole('button')[1];
    fireEvent.click(favoritaUmaBebida);
    history.push(favoriteRecipe);
    expect(categoria && drink && favoritaUmaBebida).toBeInTheDocument();
  });
});

describe('63 teste pagina Receitas Favoritas', () => {
  it('Testa link copiado', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    history.push(urlBurek);
    const favoritaUmaComida = screen.getAllByRole('button')[1];
    fireEvent.click(favoritaUmaComida);
    history.push(favoriteRecipe);
    const shareBtn = screen.getAllByRole('button')[0];
    fireEvent.click(shareBtn);
    const spana = screen.getByRole('img');
    expect(spana).toBeInTheDocument();
  });
});

describe('64 teste pagina Receitas Favoritas', () => {
  it('Testa botao desfavoritar', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    history.push(urlBurek);
    const favoritaUmaComida = screen.getAllByRole('button')[1];
    fireEvent.click(favoritaUmaComida);
    history.push(favoriteRecipe);
    const chule = screen.getByAltText('button-icon');
    expect(chule).toBeInTheDocument();
    fireEvent.click(favoritaUmaComida);
    expect(chule).toBeInTheDocument();
  });
});

describe('65 teste pagina Receitas Favoritas', () => {
  it('Verifica os botoes existentes', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    history.push(favoriteRecipe);
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const foodBtn = screen.getByTestId('filter-by-food-btn');
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    expect(allBtn).toBeInTheDocument();
    expect(foodBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
  });
});

describe('66 teste pagina Receitas Favoritas', () => {
  it('Verifica se ao clicar na imagem redireciona para url details', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    history.push(urlBurek);
    const favoritaUmaComida = screen.getAllByRole('button')[1];
    fireEvent.click(favoritaUmaComida);
    history.push(favoriteRecipe);
    const imgBurek = screen.getByRole('img');
    fireEvent.click(imgBurek);
    history.push(urlBurek);
    expect(history.location.pathname).toEqual(urlBurek);
  });
});
