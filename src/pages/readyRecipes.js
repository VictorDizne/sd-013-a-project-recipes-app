import React from 'react';
import Header from '../components/header';
import BttAllDrinksFood from '../components/BttAllDrinksFood';
import ReadyReceipesCards from '../components/ReadyReceipesCards';

function ReadyRecipes() {
  return (
    <section>
      <Header name="Receitas Feitas" search={ false } />
      <BttAllDrinksFood />
      <ReadyReceipesCards />
    </section>
  );
}

export default ReadyRecipes;
