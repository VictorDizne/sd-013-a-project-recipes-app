import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FoodExploreLocal from '../pages/FoodExploreLocal';

describe('1 - Verifica os testes da página de Explorar origem', () => {
  const options = [
    { strArea: 'American' },
    { strArea: 'British' },
    { strArea: 'Canadian' },
    { strArea: 'Chinese' },
    { strArea: 'Croatian' },
    { strArea: 'Dutch' },
    { strArea: 'Egyptian' },
    { strArea: 'French' },
    { strArea: 'Greek' },
    { strArea: 'Indian' },
    { strArea: 'Irish' },
    { strArea: 'Italian' },
    { strArea: 'Jamaican' },
    { strArea: 'Japanese' },
    { strArea: 'Kenyan' },
    { strArea: 'Malaysian' },
    { strArea: 'Mexican' },
    { strArea: 'Moroccan' },
    { strArea: 'Polish' },
    { strArea: 'Portuguese' },
    { strArea: 'Russian' },
    { strArea: 'Spanish' },
    { strArea: 'Thai' },
    { strArea: 'Tunisian' },
    { strArea: 'Turkish' },
    { strArea: 'Unknown' },
    { strArea: 'Vietnamese' },
  ];

  test('Verifica se está com o header com os componentes corretos', () => {
    renderWithRouter(<FoodExploreLocal />);

    const title = screen.getByText(/explorar origem/i);
    expect(title).toBeInTheDocument();

    const img = screen.getByTestId(/profile-top-btn/i);
    expect(img).toBeInTheDocument();

    const input = screen.getByTestId(/search-top-btn/i);
    expect(input).toBeInTheDocument();
  });

  test('Verifica se está com o footer com os componentes corretos', () => {
    renderWithRouter(<FoodExploreLocal />);

    const link1 = screen.getByTestId(/drinks-bottom-btn/i);
    expect(link1).toBeInTheDocument();

    const link2 = screen.getByTestId(/explore-bottom-btn/i);
    expect(link2).toBeInTheDocument();

    const link3 = screen.getByTestId(/food-bottom-btn/i);
    expect(link3).toBeInTheDocument();

    const footerField = screen.getByTestId('footer');
    expect(footerField).toBeInTheDocument();
  });

  test('Verifica se existe uma label para o elemento select', async () => {
    renderWithRouter(<FoodExploreLocal />);

    const label = await screen.findByLabelText(/selecione a origem/i);
    expect(label).toBeInTheDocument();
  });

  test('Verifica se possui o elemento select correto ', async () => {
    renderWithRouter(<FoodExploreLocal />);
    const select = await screen.findByTestId(/explore-by-area-dropdown/i);
    expect(select).toBeInTheDocument();
  });

  test('Verifica se possui os dropdowns corretos ', async () => {
    renderWithRouter(<FoodExploreLocal />);
    options.forEach(async ({ strArea }) => {
      const option = await screen.findByTestId(`${strArea}-option`);
      expect(option.value).toBe(strArea);
    });
  });

  test('Verifica se possui treze  elementos h1 ao iniciar a tela ', () => {
    const { getAllByRole } = renderWithRouter(<FoodExploreLocal />);
    const h1Number = 13;
    const h1 = getAllByRole('heading', { level: 1 });
    expect(h1.length).toBe(h1Number);
  });

  test('Verifica se possui treze  imagens ao iniciar a tela ', async () => {
    renderWithRouter(<FoodExploreLocal />);
    const imgNumber = 13;
    const img = await screen.findAllByRole('img');
    expect(img.length).toBe(imgNumber);
  });
});
