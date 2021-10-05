import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardMeal from '../components/cardMeal';
import FilterCategory from '../components/filterCategory';

const Comidas = () => (
  <div className="containerComidas">
    <Header page="Comidas" />
    <br />
    <FilterCategory />
    <CardMeal />
    <Footer />
  </div>
);

export default Comidas;
