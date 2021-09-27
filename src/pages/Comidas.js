import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealsList from '../components/MealsList';
import MealsCategories from '../components/MealsCategories';
import Context from '../context';

function Comidas() {
  const { filteredMeals } = useContext(Context);

  if (filteredMeals.length === 0) return <h1>Loading...</h1>;

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
