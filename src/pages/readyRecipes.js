import React, { useEffect, useContext, useState } from 'react';
import appContext from '../contexts/appContext';
import Header from '../components/header';
import BttAllDrinksFood from '../components/BttAllDrinksFood';
import ReadyRecipesCards from '../components/ReadyRecipesCards';

function ReadyRecipes() {
  const [doneRecipes, setDoneRecipes] = useState(
    JSON.parse(localStorage.getItem('doneRecipes')),
  );
  const { state: { filterDoneFood } } = useContext(appContext);
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('doneRecipes'))) {
      localStorage.setItem('doneRecipes', JSON.stringify([{}]));
    }
  }, []);

  useEffect(() => {
    console.log(filterDoneFood);
    const allDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (filterDoneFood === 'all') {
      setDoneRecipes(allDoneRecipes);
    }
    if (filterDoneFood === 'comida') {
      setDoneRecipes(allDoneRecipes.filter((doneRecipe) => doneRecipe.type === 'comida'));
    }
    if (filterDoneFood === 'bebida') {
      setDoneRecipes(allDoneRecipes.filter((doneRecipe) => doneRecipe.type === 'bebida'));
    }
  }, [filterDoneFood]);

  return (
    <section>
      <Header name="Receitas Feitas" search={ false } />
      <BttAllDrinksFood />
      <ReadyRecipesCards doneRecipes={ doneRecipes } />
    </section>
  );
}

export default ReadyRecipes;
