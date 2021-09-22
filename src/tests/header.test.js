import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { HomeFood } from '../pages';
import App from '../App';

const profileId = 'profile-top-btn';
const titleId = 'page-title';
const searchButtonId = 'search-top-btn';
const searchBarId = 'search-input';
const noHeader = [
  '/bebidas/1', '/comidas/1', '/comidas/1/in-progress', '/bebidas/1/in-progress', '/',
];

const noSearch = [
  '/explorar',
  '/explorar/comidas',
  '/explorar/bebidas',
  '/explorar/comidas/ingredientes',
  '/explorar/bebidas/ingredientes',
  '/perfil',
  '/receitas-feitas',
  '/receitas-favoritas'];

const onHeader = ['/comidas', '/bebidas', '/explorar/comidas/area'];

describe('9 - Implemente os elementos do header na tela principal de receitas', () => {
  test('se existe os testids `profile-top-btn`, `page-title` e `search-top-btn`', () => {
    renderWithRouter(<HomeFood />);

    const profile = screen.getByTestId(profileId);
    const title = screen.getByTestId(titleId);
    const searchButton = screen.getByTestId(searchButtonId);

    expect(profile).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
});

describe('10 - header é mostrado da forma correta em suas devidas telas', () => {
  test('Não tem header na tela de login, detalhes e receita em processo', () => {
    const { history } = renderWithRouter(<App />);

    noHeader.forEach((item) => {
      history.push(item);
      const header = screen.queryByTestId('header-test');
      return expect(header).not.toBeInTheDocument();
    });
  });

  test(`Não tem searchButton nas telas de exploração, receitas feitas, 
  favoritas e perfil`, () => {
    const { history } = renderWithRouter(<App />);

    noSearch.forEach((item) => {
      history.push(item);
      const searchButton = screen.queryByRole('img', { name: /ícone de busca/i });
      return expect(searchButton).not.toBeInTheDocument();
    });
  });

  test(`header aparece inteiro nas telas principais bebida e comida,
   e exploração por origem`, () => {
    const { history } = renderWithRouter(<App />);

    onHeader.forEach((item) => {
      history.push(item);
      const searchButton = screen.queryByTestId('header-test');
      return expect(searchButton).toBeInTheDocument();
    });
  });
});

describe(`11 - Redirecione a pessoa usuária para a tela de perfil
 ao clicar no botão de perfil`, () => {
  test('A mudança de tela ocorre corretamente', () => {
    const { history } = renderWithRouter(<HomeFood />);

    const profile = screen.getByTestId(profileId);
    fireEvent.click(profile);

    expect(history.location.pathname).toEqual('/perfil');
  });
});

describe(`12 - Desenvolva o botão de busca que, ao ser clicado,
 a barra de busca deve aparecer. O mesmo serve para escondê-la`, () => {
  test('clicar no searchButton faz com que apareça a barra de pesquisa', () => {
    const { history } = renderWithRouter(<HomeFood />);

    const search = screen.getByTestId(searchButtonId);
    fireEvent.click(search);
    const searchBar = screen.getByTestId(searchBarId);
    expect(searchBar).toBeInTheDocument();

    fireEvent.click(search);
    expect(searchBar).not.toBeInTheDocument();

  });
});