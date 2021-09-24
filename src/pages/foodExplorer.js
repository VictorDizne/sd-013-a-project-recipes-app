import React from 'react';
import Header from '../components/header';
import LowerMenu from '../components/LowerMenu';

function FoodExplorer() {
  return (
    <section>
      <Header name="Explorar Comidas" search={ false } />
      <LowerMenu />
    </section>
  );
}

export default FoodExplorer;
