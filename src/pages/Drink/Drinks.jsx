import React from 'react';
import { Header, Footer } from '../../components/General';
import RecipesList from '../../components/Home/RecipesList';

function Drinks() {
  return (
    <>
      <Header title="Bebidas" search />
      <RecipesList type="Drink" />
      <Footer />
    </>
  );
}

export default Drinks;
