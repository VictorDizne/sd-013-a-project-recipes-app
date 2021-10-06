import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Explorer } from '../pages';
import renderWithRouter from './renderWithRouter';

const EXPLORE_FOOD = 'explore-food';
const EXPLORE_DRIKS = 'explore-drinks';

describe(`67 - Implemente os elementos da tela de explorar
   respeitando os atributos descritos no protótipo`, () => {
  it('Tem os data-testids explore-food e explore-drinks', () => {
    renderWithRouter(<Explorer />);
    const exploreFoodBtt = screen.getByTestId(EXPLORE_FOOD);
    const exploreDrinkBtt = screen.getByTestId(EXPLORE_DRIKS);

    expect(exploreFoodBtt).toBeInTheDocument();
    expect(exploreDrinkBtt).toBeInTheDocument();
  });
});

describe(`68 - Desenvolva a tela de maneira que tenha
  2 botões: um para explorar comidas e o outro para explorar bebidas`, () => {
  it(`Verifica se o atributo data-testid="explore-food"
    possui o texto "Explorar Comidas"`, () => {
    renderWithRouter(<Explorer />);
    const exploreFoodBtt = screen.getByTestId(EXPLORE_FOOD);
    expect(exploreFoodBtt.innerHTML).toContain('Explorar Comidas');
  });
  it(`Verifica se o data-testid="explore-drinks"
    possui o texto "Explorar Bebidas"`, () => {
    renderWithRouter(<Explorer />);
    const exploreDrinkBtt = screen.getByTestId(EXPLORE_DRIKS);
    expect(exploreDrinkBtt.innerHTML).toContain('Explorar Bebidas');
  });
});

describe(`69 - Redirecione a pessoa usuária ao clicar em
  um dos botões, a rota deve mudar para a página de explorar
  comidas ou de explorar bebidas`, () => {
  it(`Ao clicar no botão "Explorar Comidas"
  a rota muda para a página de explorar comidas`, () => {
    const { history } = renderWithRouter(<Explorer />);
    const exploreFoodBtt = screen.getByTestId(EXPLORE_FOOD);
    userEvent.click(exploreFoodBtt);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explorar/comidas');
  });
  it(`Verifica se o data-testid="explore-drinks"
    possui o texto "Explorar Bebidas"`, () => {
    const { history } = renderWithRouter(<Explorer />);
    const exploreDrinksBtt = screen.getByTestId(EXPLORE_DRIKS);
    userEvent.click(exploreDrinksBtt);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explorar/bebidas');
  });
});
