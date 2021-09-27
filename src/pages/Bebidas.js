import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinksList from '../components/DrinksList';
import DrinksCategories from '../components/DrinksCategories';
import Context from '../context';

function Bebidas() {
  const { filteredDrinks } = useContext(Context);

  if (filteredDrinks.length === 0) return <h1>Loading...</h1>;

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
