import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinksList from '../components/DrinksList';
import DrinksCategories from '../components/DrinksCategories';

function Bebidas() {
  return (
    <>
      <Header tela="Bebidas" />
      <DrinksCategories />
      <DrinksList />
      <Footer />
    </>
  );
}

export default Bebidas;
