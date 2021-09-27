import React from 'react';
import './RecipeCard.css';

export default function DoneRecipeCard() {
  const forEachFunc = () => (
    <div
      className="recipeCard"
      data-testid="index-recipe-card"
    >
      <img
        data-testid="index-horizontal-image"
        alt="imagem"
      />
      <p
        data-testid="index-horizontal-top-text"
      >
        Texto
      </p>
      <h4
        data-testid="index-horizontal-name"
      >
        Title
      </h4>
      <p
        data-testid="index-horizontal-done-date"
      >
        feito
      </p>
      <button
        type="button"
        data-testid="index-horizontal-share-btn"
      >
        compartilhar
      </button>
      <button
        type="button"
        data-testid="index-tagName-horizontal-tag"
      >
        tagName
      </button>
    </div>
  );

  return (
    <div className="recipe-card-container">
      {forEachFunc()}
    </div>
  );
}
