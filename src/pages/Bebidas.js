import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context';
import DrinksList from '../components/DrinksList';
import DrinksCategories from '../components/DrinksCategories';

function Bebidas() {
  const { filteredDrinks } = useContext(Context);

  if (filteredDrinks.length === 0) return <h1>Loading...</h1>;

  return (
    <>
      <Header tela="Bebidas" />
      <h1>Bebidas</h1>
      <DrinksCategories />
      <DrinksList />
      <Footer />
    </>
  );
}

export default Bebidas;
