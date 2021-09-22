import React from 'react';
import Header from '../components/Header';

function Drinks() {
  const secondButton = true;
  return (
    <section>
      <Header text="Bebidas" secondButton={ secondButton } />
      <h1>Drinks</h1>
    </section>
  );
}

export default Drinks;
