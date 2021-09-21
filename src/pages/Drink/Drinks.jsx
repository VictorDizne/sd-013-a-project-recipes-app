import React from 'react';
import { Header } from '../../components';
import RecipesList from '../../components/RecipesList';

function Drinks() {
  return (
    <div>
      <Header title="Bebidas" search />
      <RecipesList type="Drink" />
    </div>
  );
}

export default Drinks;
