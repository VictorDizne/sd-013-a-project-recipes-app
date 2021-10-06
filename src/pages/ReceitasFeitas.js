import React from 'react';
import Header from '../components/ComponentHeader';
import ComponentDoneRecipes from '../components/ComponentDoneRecipes';

function ReceitasFeitas() {
  return (
    <div>
      <Header title="Receitas Feitas" hideSearch hideProfile={ false } />
      <ComponentDoneRecipes />
    </div>
  );
}

export default ReceitasFeitas;
