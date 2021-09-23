import React from 'react';
import CardDrink from '../components/cardDrink';
import Header from '../components/Header';
import FilterDrinksCategory from '../components/filterDrinksCategory';

const Bebidas = () => (
  <div>
    <Header page="Bebidas" />
    <FilterDrinksCategory />
    <CardDrink />
  </div>
);

export default Bebidas;
