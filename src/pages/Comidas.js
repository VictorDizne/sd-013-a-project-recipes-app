import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealsList from '../components/MealsList';
import MealsCategories from '../components/MealsCategories';

function Comidas() {
  return (
    <>
      <Header tela="Comidas" />
      <MealsCategories />
      <MealsList />
      <Footer />
    </>
  );
}

export default Comidas;
