import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context';
import MealsList from '../components/MealsList';
import MealsCategories from '../components/MealsCategories';

function Comidas() {
  const { filteredMeals } = useContext(Context);

  if (filteredMeals.length === 0) return <h1>Loading...</h1>;

  return (
    <>
      <Header tela="Comidas" />
      <h1>Comidas</h1>
      <MealsCategories />
      <MealsList />
      <Footer />
    </>
  );
}

export default Comidas;
