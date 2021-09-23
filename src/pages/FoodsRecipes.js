import React from 'react';
import { Button } from '../components';

function FoodsRecipies() {
  return (
    <main>
      <h2 data-testid="recipe-title">FoodsRecipies</h2>
      <img data-testid="recipe-photo" alt="imagem da receita" />
      <Button testID="share-btn">Compartilhar</Button>
      <Button testID="favorite-btn">Favorito</Button>
      <p data-testid="recipe-category">sdsd</p>
    </main>
  );
}

// A foto deve possuir o atributo data-testid="recipe-photo";
// O título deve possuir o atributo data-testid="recipe-title";
// O botão de compartilhar deve possuir o atributo data-testid="share-btn";
// O botão de favoritar deve possuir o atributo data-testid="favorite-btn";
// O texto da categoria deve possuir o atributo data-testid="recipe-category";
// Os ingredientes devem possuir o atributo data-testid="${index}-ingredient-name-and-measure";
// O texto de instruções deve possuir o atributo data-testid="instructions";
// O vídeo, presente somente na tela de comidas, deve possuir o atributo data-testid="video";
// O card de receitas recomendadas deve possuir o atributo data-testid="${index}-recomendation-card";
// O botão de iniciar receita deve possuir o atributo data-testid="start-recipe-btn";

export default FoodsRecipies;
