import React from 'react';
import ComponentRecipeInProgress from '../components/ComponentRecipeInProgress';

function ReceitaProcessoBebida() {
  const keysDrink = {
    title: 'strDrink',
    category: 'strCategory',
    typeK: 'bebida',
    idK: 'idDrink',
    alcoholicOrNot: 'strAlcoholic',
    thumb: 'strDrinkThumb',
    areaK: '',
    instructions: 'strInstructions',
    video: '',
    iframe: false,
  };
  return (
    <div>
      <h1>Bebidas</h1>
      <ComponentRecipeInProgress keys={ keysDrink } />
    </div>
  );
}

export default ReceitaProcessoBebida;
