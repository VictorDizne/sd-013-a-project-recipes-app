import React from 'react';

function ReadyReceipesCards() {
  return (
    <section>
      <img data-testid={`${index}-horizontal-image`} sr="" alt="" />
      <p data-testid={`${index}-horizontal-top-text`}>
        texto da categoria da receita
      </p>
      <p data-testid={`${index}-horizontal-name'}>
       texto do nome da receita
      </p>
      <p data-testid={`${index}-horizontal-done-date`}>
        texto da data que a receita foi feita
      </p>
      <button type="button" data-testid={`${index}-horizontal-share-btn`}>
        botão de compartilhar
      </button>
      <span data-testid={`${index}-${tagName}-horizonta-tag`}>
        TAGS
      </span>
    </
}

export default ReadyReceipesCards;
