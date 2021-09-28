import React, { useEffect, useContext } from 'react';
import appContext from '../contexts/appContext';
import Header from '../components/header';
import BttAllDrinksFood from '../components/BttAllDrinksFood';
// import ReadyReceipesCards from '../components/ReadyReceipesCards';
import ReadyMealsCards from '../components/ReadyMealsCards';
import ReadyDrinksCards from '../components/ReadyDrinksCards';

function ReadyRecipes() {
  const { filterDoneFood } = useContext(appContext);
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('doneRecipes'))) {
      localStorage.setItem('doneRecipes', JSON.stringify([{}]));
    }
  }, []);

  const renderByFilter = () => {
    switch (filterDoneFood) {
    case 'bebida':
      return (<ReadyDrinksCards />);
    case 'comida':
      return (<ReadyMealsCards />);
    default:
      return (
        <div>
          <ReadyMealsCards />
          <ReadyDrinksCards />
        </div>
      );
    }
  };
  return (
    <section>
      <Header name="Receitas Feitas" search={ false } />
      <BttAllDrinksFood />
      { renderByFilter() }
    </section>
  );
}

export default ReadyRecipes;
