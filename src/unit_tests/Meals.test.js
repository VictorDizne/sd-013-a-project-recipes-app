import React from 'react';
import { screen } from '@testing-library/react';
import Meals from '../pages/Meals';
import renderWithRouterAndContext from './renderWithRouterAndContext';

const mealsMock = require('../../cypress/mocks/meals');

const context = {
  recipes: mealsMock.meals,
  byIngredients: { bool: false, ingredient: '' },
  setRecipes: () => {},
};

describe('Test on Meals screen, ', () => {
  it('that there is "Comidas" on Title', () => {
    renderWithRouterAndContext(
      <Meals />,
      context,
    );
    const title = screen.getByRole('heading', { level: '1' });
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe('Comidas');
  });

  it('that there is a profile icon', () => {
    renderWithRouterAndContext(
      <Meals />,
      context,
    );
    const profileIcon = screen.getByAltText('profile');
    expect(profileIcon).toBeInTheDocument();
  });

  it('that there are 12 recipe cards', async () => {
    renderWithRouterAndContext(
      <Meals />,
      context,
    );
    const maxElements = 12;
    const recipeCards = screen.getAllByTestId(/recipe-card/i);
    recipeCards.forEach((card, index) => {
      expect(card).toBeInTheDocument();
      expect(index < maxElements).toBeTruthy();
    });
  });
  // it('that there are 6 category buttons', () => {
  //   renderWithRouterAndContext(
  //     <Meals />,
  //     context,
  //   );

  //   const categoryButtons = screen.getAllByTestId(/category-filter/i);
  //   expect(categoryButtons).toBeInTheDocument();
  //   expect(categoryButtons).toBe(6);
  // });
});
