import React, {useEffect} from 'react';
import Header from '../components/header';
import BttAllDrinksFood from '../components/BttAllDrinksFood';
import ReadyReceipesCards from '../components/ReadyReceipesCards';

function ReadyRecipes() {
  const ingredientesDone = JSON.parse(localStorage.favoriteRecipes);
  /* localStorage.doneRecipes =  */
  /* useEffect(() => {}, []); */

  return (
    <section>
      <Header name="Receitas Feitas" search={ false } />
      <BttAllDrinksFood />
      <ReadyReceipesCards />
    </section>
  );
}

export default ReadyRecipes;
