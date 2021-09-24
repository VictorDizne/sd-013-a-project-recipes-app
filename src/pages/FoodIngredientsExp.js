import React from 'react';
import Header from '../components/header';
import LowerMenu from '../components/LowerMenu';

function FoodIngredientsExp() {
  return (
    <section>
      <Header name="Explorar Ingredientes de comidas" search={ false } />
      <LowerMenu />
    </section>
  );
}

export default FoodIngredientsExp;
