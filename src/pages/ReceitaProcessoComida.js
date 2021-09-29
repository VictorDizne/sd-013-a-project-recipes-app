import React from 'react';
import ComponentRecipeInProgress from '../components/ComponentRecipeInProgress';

function ReceitaProcessoComida() {
  const keysMeal = {
    title: 'strMeal',
    category: 'strCategory',
    typeK: 'comida',
    idK: 'idMeal',
    alcoholicOrNot: '',
    thumb: 'strMealThumb',
    areaK: 'strArea',
    instructions: 'strInstructions',
    video: 'strYoutube',
    iframe: true,
  };
  return (
    <div>
      <h1>Comidas</h1>
      <ComponentRecipeInProgress keys={ keysMeal } />
    </div>
  );
}

export default ReceitaProcessoComida;
