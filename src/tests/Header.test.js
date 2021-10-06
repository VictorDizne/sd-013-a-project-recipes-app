import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const PROFILE_ID = 'profile-top-btn';
const PAGE_TITLE_ID = 'page-title';
const SEARCH_TOP_BTN_ID = 'search-top-btn';
const EXEC_SEARCH_BTN_ID = 'exec-search-btn';
const INGREDIENTE_SEARCH_RADIO_ID = 'ingredient-search-radio';
/* const SEARCH_INPUT_ID = 'search-input';
const NAME_SEARCH_RADIO_ID = 'name-search-radio';
const FIRST_LETTER_SEARCH_RADIO_ID = 'first-letter-search-radio'; */

describe('Testando a página "Header"', () => {
  let history = {};

  beforeEach(() => {
    history = renderWithRouter(<App />).history;
    history.push('/comidas');
  });

  test('Testando se a rota está correta', () => {
    const { location: { pathname } } = history;
    expect(pathname).toBe('/comidas');
  });

  test('Verifica se o Header está sendo renderizado', () => {
    const iconeProfile = screen.getByTestId(PROFILE_ID);
    const titulo = screen.getByTestId(PAGE_TITLE_ID);
    const iconeSearch = screen.getByTestId(SEARCH_TOP_BTN_ID);

    expect(iconeProfile).toBeInTheDocument();
    expect(titulo).toBeInTheDocument();
    expect(iconeSearch).toBeInTheDocument();
  });

  test('Verifica se ao clicar no icone de "search" aparece um "form"', () => {
    const iconeSearch = screen.getByTestId(SEARCH_TOP_BTN_ID);
    userEvent.click(iconeSearch);
    const inputText = screen.getByTestId('search-input');
    const radioIgredient = screen.getByTestId('ingredient-search-radio');
    const radioName = screen.getByTestId('name-search-radio');
    const radioFirst = screen.getByTestId('first-letter-search-radio');
    const buttonPesquisar = screen.getByTestId('exec-search-btn');
    expect(inputText).toBeInTheDocument();
    expect(radioIgredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioFirst).toBeInTheDocument();
    expect(buttonPesquisar).toBeInTheDocument();
  });

  test(`Verifica se ao clicar no icone de perfil em Comidas, 
      é redirecionado para página de perfil`, () => {
    const iconeProfile = screen.getByTestId(PROFILE_ID);
    userEvent.click(iconeProfile);

    const path = history.location.pathname;
    expect(path).toBe('/perfil');
  });

  describe('Testando formulário de pesquisa', () => {
    test('Verifica se esta pesquisando por "Ingrediente"', () => {
      const iconeSearch = screen.getByTestId(SEARCH_TOP_BTN_ID);
      userEvent.click(iconeSearch);
      const radioIgredient = screen.getByTestId(INGREDIENTE_SEARCH_RADIO_ID);
      userEvent.click(radioIgredient);
      const execButton = screen.getByTestId(EXEC_SEARCH_BTN_ID);
      userEvent.click(execButton);
    });
  });
});
