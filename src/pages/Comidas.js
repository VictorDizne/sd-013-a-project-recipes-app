import React from 'react';
import Header from '../components/Header';
// import CardReceitas from '../components/cardReceitas';

import CardMeal from '../components/cardMeal';
import FilterCategory from '../components/filterCategory';

const Comidas = () => (
  <div>
    <Header page="Comidas" />
    <FilterCategory />
    <CardMeal />
  </div>
);

export default Comidas;
