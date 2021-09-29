import React from "react";
import { wait } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import RecommendedCard from "../components/RecommendedCard";

describe('1 - Verifica os testes da página Recommended Card', () => {
    it(`Verifica se tem os data-testids corretos para a tela de Cards Recomendados`, async () => {
    const {  findByTestId, queryByTestId } = renderWithRouter(
      <RecommendedCard/>,
    );

    for (let index = 0; index < QTD; index += 1) {
        expect(await findByTestId( `${index}-recomendation-card`)).toBeInTheDocument();
        expect(await findByTestId(`${index}-recomendation-title`)).toBeInTheDocument();
        expect(await findByTestId(`${index}-card-img`)).toBeInTheDocument();
      }
  
      await wait(() => expect(queryByTestId('6-recomendation-card')).toBeNull());
      await wait(() => expect(queryByTestId('6-recomendation-title')).toBeNull());
      await wait(() => expect(queryByTestId('6-card-img')).toBeNull());

    it('Verifica se existe o título "Recomendadas"', async () => {
        const { history } = renderWithRouter(<App />);
        history.push(url);
    
        const recomendedTitle = await screen.findByRole('heading', { name: 'Recomendadas' });
    
        expect(recomendedTitle).toBeDefined();
      });
  })
})