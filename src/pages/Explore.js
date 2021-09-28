import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  return (
    <>
      <Header />
      <button type="button" data-testid="explore-food">Explorar Comidas</button>
      <button type="button" data-testid="explore-drinks">Explorar Bebidas</button>
      <Footer />
    </>
  );
}

export default Explore;
