import React from 'react';
import Header from '../components/header';
import LowerMenu from '../components/LowerMenu';

function FoodExplorer() {
  return (
    <section>
      <Header name="Explorar Comidas" search={ false } />
      <button
        type="button"
        data-testid="explore-by-ingredient"
      >
        Explorar por ingrediente
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
      >
        Explorar por area
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
      >
        Explorar por area
      </button>
      <LowerMenu />
    </section>
  );
}

export default FoodExplorer;
