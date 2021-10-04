import React from 'react';
import CardDrink from '../components/cardDrink';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FilterDrinksCategory from '../components/filterDrinksCategory';

const Bebidas = () => (
  <div>
    <Header page="Bebidas" bebidas />
    <br />
    <FilterDrinksCategory />
    <CardDrink />
    <Footer />
  </div>
);

export default Bebidas;
