import React from 'react';
import Header from '../components/header';
import LowerMenu from '../components/LowerMenu';

function DrinkExplorer() {
  return (
    <section>
      <Header name="Explorar Bebidas" search={ false } />
      <LowerMenu />
    </section>
  );
}

export default DrinkExplorer;
