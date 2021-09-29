import React from "react";
import renderWithRouter from './renderWithRouter';
import RecommendedList from "../components/RecommendedList";

describe('1 - Verifica os testes da página Recommended List', () => {
    <RecommendedList />
})

it('Verifica se existe 6 cards de comidas/bebidas recomendadas', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const card1 = await screen.findByTestId('0-recomendation-card');
    const card2 = await screen.findByTestId('1-recomendation-card');
    const card3 = await screen.findByTestId('2-recomendation-card');
    const card4 = await screen.findByTestId('3-recomendation-card');
    const card5 = await screen.findByTestId('4-recomendation-card');
    const card6 = await screen.findByTestId('5-recomendation-card');

    expect(card1).toBeDefined();
    expect(card2).toBeDefined();
    expect(card3).toBeDefined();
    expect(card4).toBeDefined();
    expect(card5).toBeDefined();
    expect(card6).toBeDefined();
  });