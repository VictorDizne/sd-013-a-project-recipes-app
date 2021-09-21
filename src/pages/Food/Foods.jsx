import React from 'react';
import { Header } from '../../components';
import Footer from '../../components/General/Footer';
import RecipesList from '../../components/RecipesList';

function Foods() {
  return (
    <>
      <Header title="Comidas" search />
      <RecipesList type="Meal" />
      <Footer />
    </>
  );
}

export default Foods;
