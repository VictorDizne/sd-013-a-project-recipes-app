import React from 'react';
import Header from '../components/header';
import LowerMenu from '../components/LowerMenu';

function DrinkIngredientsExp() {
  return (
    <section>
      <Header name="Explorar Ingredientes de bebidas" search={ false } />
      <LowerMenu />
    </section>
  );
}

export default DrinkIngredientsExp;
