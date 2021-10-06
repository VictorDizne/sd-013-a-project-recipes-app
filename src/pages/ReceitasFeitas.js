import React from 'react';
import Header from '../components/ComponentHeader';
import ComponentDoneRecipes from '../components/ComponentDoneRecipes';
import './Styles/DoneRecipes.css';

function ReceitasFeitas() {
  return (
    <div className="doneRecipes-main">
      <Header title="Receitas Feitas" hideSearch hideProfile={ false } />
      <ComponentDoneRecipes />
    </div>
  );
}

export default ReceitasFeitas;
