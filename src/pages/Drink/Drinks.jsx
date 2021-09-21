import React from 'react';
import { Header } from '../../components';
import Footer from '../../components/General/Footer';
import RecipesList from '../../components/RecipesList';

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
