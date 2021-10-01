import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import MasterCard from '../components/MasterCard';
import FilterRecipes from '../components/FilterRecipes';
import { getDoneRecipes } from '../services/localStorageFunctions';

const DoneRecipes = () => {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [disableFilters, setDisableFilters] = useState();
  const [doneFoodRecipes, setDoneFoodRecipes] = useState([]);
  const [doneDrinkRecipes, setDoneDrinkecipes] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    getDoneRecipes(
      setDoneRecipes, setDoneFoodRecipes, setDoneDrinkecipes, setDisableFilters,
    );
  }, []);

  const handleFilter = ({ target: { name } }) => {
    switch (name) {
    case 'All':
      setSelectedFilter('All');
      break;
    case 'Foods':
      setSelectedFilter('Foods');
      break;
    case 'Drinks':
      setSelectedFilter('Drinks');
      break;
    default:
      setSelectedFilter('All');
      break;
    }
  };
  function renderDoneRecipes() {
    if (selectedFilter === 'All') {
      return (
        doneRecipes.map((doneRecipe, idx) => (
          <MasterCard
            cardType="doneRecipe"
            index={ idx }
            src={ doneRecipe.image }
            id={ doneRecipe.id }
            type={ doneRecipe.type }
            doneDate={ doneRecipe.doneDate }
            area={ doneRecipe.area }
            key={ idx }
            category={ doneRecipe.category }
            title={ doneRecipe.name }
            favOrDone="true"
            tags={ doneRecipe.tags }
            alcoholicOrNot={ doneRecipe.alcoholicOrNot }
            recipe={ doneRecipe }
          />
        ))
      );
    }
    if (selectedFilter === 'Foods') {
      return (
        doneFoodRecipes.map((doneRecipe, idx) => (
          <MasterCard
            cardType="doneRecipe"
            index={ idx }
            src={ doneRecipe.image }
            id={ doneRecipe.id }
            type={ doneRecipe.type }
            key={ idx }
            doneDate={ doneRecipe.doneDate }
            area={ doneRecipe.area }
            category={ doneRecipe.category }
            title={ doneRecipe.name }
            favOrDone="true"
            tags={ doneRecipe.tags }
            alcoholicOrNot={ doneRecipe.alcoholicOrNot }
            recipe={ doneRecipe }
          />
        ))
      );
    }
    if (selectedFilter === 'Drinks') {
      return (
        doneDrinkRecipes.map((doneRecipe, idx) => (
          <MasterCard
            cardType="doneRecipe"
            index={ idx }
            src={ doneRecipe.image }
            id={ doneRecipe.id }
            key={ idx }
            type={ doneRecipe.type }
            doneDate={ doneRecipe.doneDate }
            area={ doneRecipe.area }
            category={ doneRecipe.category }
            title={ doneRecipe.name }
            favOrDone="true"
            tags={ doneRecipe.tags }
            alcoholicOrNot={ doneRecipe.alcoholicOrNot }
            recipe={ doneRecipe }
          />
        ))
      );
    }
  }
  return (
    <main>
      <Header title="Receitas Feitas" />
      {
        !disableFilters
          && <FilterRecipes pageTitle="both" handleFilter={ handleFilter } />
      }
      { disableFilters && <p>Parece que você não completou nenhuma receita</p> }
      { renderDoneRecipes }
    </main>
  );
};

export default DoneRecipes;
