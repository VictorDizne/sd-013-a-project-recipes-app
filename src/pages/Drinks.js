import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks() {
  const secondButton = true;
  return (
    <section>
      <Header text="Bebidas" secondButton={ secondButton } />
      <h1>Drinks</h1>
      <Footer />
    </section>
  );
}

export default Drinks;
