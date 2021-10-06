import React from 'react';
import { screen } from '@testing-library/react';
import Drinks from '../pages/Drinks';
import renderWithRouterAndContext from './renderWithRouterAndContext';

const drinksMock = require('../../cypress/mocks/drinks');

const context = {
  recipes: drinksMock.drinks,
  byIngredients: { bool: false, ingredient: '' },
  setRecipes: () => {},
};

describe('Test on Drinks screen, ', () => {
  it('that there is "Bebidas" on Title', () => {
    renderWithRouterAndContext(
      <Drinks />,
      context,
    );
    const title = screen.getByRole('heading', { level: '1' });
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe('Bebidas');
  });

  it('that there is a profile icon', () => {
    renderWithRouterAndContext(
      <Drinks />,
      context,
    );
    const profileIcon = screen.getByAltText('profile');
    expect(profileIcon).toBeInTheDocument();
  });

  it('that there are 12 recipe cards', async () => {
    renderWithRouterAndContext(
      <Drinks />,
      context,
    );
    const maxElements = 12;
    const recipeCards = screen.getAllByTestId(/recipe-card/i);
    recipeCards.forEach((card, index) => {
      expect(card).toBeInTheDocument();
      expect(index < maxElements).toBeTruthy();
    });
  });
});
