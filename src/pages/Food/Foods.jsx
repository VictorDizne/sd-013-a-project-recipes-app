import React from 'react';
import { Header, Footer } from '../../components/General';
import RecipesList from '../../components/Home/RecipesList';

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
