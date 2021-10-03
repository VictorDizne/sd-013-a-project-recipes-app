import React, { useEffect, useContext, useState } from 'react';
import appContext from '../contexts/appContext';
import Header from '../components/header';
import BttAllDrinksFood from '../components/BttAllDrinksFood';
import ReadyRecipesCards from '../components/ReadyRecipesCards';

function ReadyRecipes() {
  const [localDoneRecipes, setLocalDoneRecipes] = useState([{ tags: [] }]);
  const { state: { filterDoneFood } } = useContext(appContext);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('doneRecipes')) === null) {
      localStorage.setItem('user', JSON.stringify([{ tags: [] }]));
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      setLocalDoneRecipes(doneRecipes);
    }
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setLocalDoneRecipes(doneRecipes);
  }, []);

  useEffect(() => {
    console.log(filterDoneFood);
    const allDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (filterDoneFood === 'all') {
      setLocalDoneRecipes(allDoneRecipes);
    }
    if (filterDoneFood === 'comida') {
      setLocalDoneRecipes(allDoneRecipes
        .filter((doneRecipe) => doneRecipe.type === 'comida'));
    }
    if (filterDoneFood === 'bebida') {
      setLocalDoneRecipes(allDoneRecipes
        .filter((doneRecipe) => doneRecipe.type === 'bebida'));
    }
  }, [filterDoneFood]);

  return (
    <section>
      <Header name="Receitas Feitas" search={ false } />
      <BttAllDrinksFood />
      <ReadyRecipesCards doneRecipes={ localDoneRecipes } />
    </section>
  );
}

export default ReadyRecipes;
