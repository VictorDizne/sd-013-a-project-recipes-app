import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';

// ==============================================================
// import DoneRecipes from '../pages/DoneRecipes';

describe('Botões de favoritar e compartilhar', () => {
  const favBtnTestId = 'favorite-btn';
  const shareBtnTestId = 'share-btn';
  const comidaURL = '/comidas/52771';

  it('Deve ter os botões  na página', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(comidaURL);
    const favBtn = await screen.findByTestId(favBtnTestId);
    const shareBtn = await screen.findByTestId(shareBtnTestId);
    expect(favBtn).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
  });

  describe('Botão de favoritar', () => {
    it('Deve mudar a imagem do botão quando a receita é favoritada', async () => {
      const { history } = renderWithRouter(<App />);
      history.push(comidaURL);
      const favBtn = await screen.findByTestId(favBtnTestId);
      expect(favBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
      userEvent.click(favBtn);
      expect(favBtn).toHaveAttribute('src', 'blackHeartIcon.svg');
      userEvent.click(favBtn);
      expect(favBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
    });
  });

  describe('Botão de compartilhar', () => {
    it('deve copiar o link da url quando clicado', async () => {
      const { history } = renderWithRouter(<App />);
      history.push(comidaURL);
    });
  });
});

describe('Página de detalhes das receitas', () => {
  const recipePhotoTestId = 'recipe-photo';
  const recipeTitleTestId = 'recipe-title';
  const shareBtnTestId = 'share-btn';
  const favoriteBtnTestId = 'favorite-btn';
  const recipeCategoryTestId = 'recipe-category';
  const ingredientNameMeasureTestId = '0-ingredient-name-and-measure';
  const instructionsTestId = 'instructions';
  const videoTestId = 'video';
  const recomendationCardTestId = '0-recomendation-card';
  const startRecipeBtnTestId = 'start-recipe-btn';
  const comidasURL = '/comidas/52771';
  const bebidasURL = '/bebidas/178319';

  describe('Tela de comidas ', () => {
    it('Deve possuir todos os atributos data-testid', async () => {
      const { history } = renderWithRouter(<App />);
      history.push(comidasURL);
      const recipePhoto = await screen.findByTestId(recipePhotoTestId);
      const title = await screen.findByTestId(recipeTitleTestId);
      const shareBtn = await screen.findByTestId(shareBtnTestId);
      const favoritesBtn = await screen.findByTestId(favoriteBtnTestId);
      const recipesCategory = await screen.findByTestId(recipeCategoryTestId);
      const ingredients = await screen.findByTestId(ingredientNameMeasureTestId);
      const video = await screen.findByTestId(videoTestId);
      const instructions = await screen.findByTestId(instructionsTestId);
      const recomendations = await screen.findByTestId(recomendationCardTestId);
      const startRecipeBtn = await screen.findByTestId(startRecipeBtnTestId);
      expect(recipePhoto).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(shareBtn).toBeInTheDocument();
      expect(favoritesBtn).toBeInTheDocument();
      expect(recipesCategory).toBeInTheDocument();
      expect(ingredients).toBeInTheDocument();
      expect(instructions).toBeInTheDocument();
      expect(recomendations).toBeInTheDocument();
      expect(startRecipeBtn).toBeInTheDocument();
      expect(video).toBeInTheDocument();
    });

    it('Deve ir para In Progress quando clicar em Iniciar Receita', async () => {
      const { history } = renderWithRouter(<App />);
      history.push(comidasURL);
      const startRecipeBtn = await screen.findByTestId(startRecipeBtnTestId);
      expect(startRecipeBtn).toBeInTheDocument();
      expect(startRecipeBtn).toHaveTextContent('Iniciar Receita');
      userEvent.click(startRecipeBtn);
      const { pathname } = history.location;
      expect(pathname).toBe('/comidas/52771/in-progress');
      history.push(comidasURL);
      const continueBtn = await screen.findByRole('button',
        { name: 'Continuar Receita' });
      expect(continueBtn).toBeInTheDocument();
    });
  });

  describe('Tela de bebidas ', () => {
    it('Deve possuir todos os atributos data-testid', async () => {
      const { history } = renderWithRouter(<App />);
      history.push(bebidasURL);
      const recipePhoto = await screen.findByTestId(recipePhotoTestId);
      const title = await screen.findByTestId(recipeTitleTestId);
      const shareBtn = await screen.findByTestId(shareBtnTestId);
      const favoritesBtn = await screen.findByTestId(favoriteBtnTestId);
      const recipesCategory = await screen.findByTestId(recipeCategoryTestId);
      const ingredients = await screen.findByTestId(ingredientNameMeasureTestId);
      const instructions = await screen.findByTestId(instructionsTestId);
      const recomendations = await screen.findByTestId(recomendationCardTestId);
      const startRecipeBtn = await screen.findByTestId(startRecipeBtnTestId);
      expect(recipePhoto).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(shareBtn).toBeInTheDocument();
      expect(favoritesBtn).toBeInTheDocument();
      expect(recipesCategory).toBeInTheDocument();
      expect(ingredients).toBeInTheDocument();
      expect(instructions).toBeInTheDocument();
      expect(recomendations).toBeInTheDocument();
      expect(startRecipeBtn).toBeInTheDocument();
    });

    it('Deve ir para In Progress quando clicar em Iniciar Receita', async () => {
      const { history } = renderWithRouter(<App />);
      history.push(bebidasURL);
      const startRecipeBtn = await screen.findByTestId(startRecipeBtnTestId);
      expect(startRecipeBtn).toBeInTheDocument();
      expect(startRecipeBtn).toHaveTextContent('Iniciar Receita');
      userEvent.click(startRecipeBtn);
      const { pathname } = history.location;
      expect(pathname).toBe('/bebidas/178319/in-progress');
      history.push(bebidasURL);
      const continueBtn = await screen.findByRole('button',
        { name: 'Continuar Receita' });
      expect(continueBtn).toBeInTheDocument();
    });
  });
});

// ================================================
