import React, { useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import recipeContext from '../context';
import ComponentDetailsContent from './ComponentDetailsContent';

function ComponentRecipeInProgress() {
  const {
    fetchDetails } = useContext(recipeContext).ContextDetails;
  const { id } = useParams();
  const currentPage = useHistory().location.pathname.includes('/comidas');

  useEffect(() => {
    if (currentPage) {
      fetchDetails('themealdb', 'lookup', 'i', id);
    } else {
      fetchDetails('thecocktaildb', 'lookup', 'i', id);
    }
  }, [currentPage, id]);

  const keysM = {
    title: 'strMeal',
    category: 'strCategory',
    typeK: 'comida',
    id: 'idMeal',
    alcoholicOrNot: '',
    thumb: 'strMealThumb',
    area: 'strArea',
    instructions: 'strInstructions',
    video: 'strYoutube',
    iframe: false,
    click: true,
  };

  const keysD = {
    title: 'strDrink',
    category: 'strCategory',
    typeK: 'bebida',
    id: 'idDrink',
    alcoholicOrNot: 'strAlcoholic',
    thumb: 'strDrinkThumb',
    area: '',
    instructions: 'strInstructions',
    video: '',
    iframe: false,
    click: true,
  };

  return (
    <div>
      <h1>In Progress</h1>
      {
        currentPage
          ? <ComponentDetailsContent keys={ keysM } />
          : <ComponentDetailsContent keys={ keysD } />
      }
    </div>
  );
}

export default ComponentRecipeInProgress;
