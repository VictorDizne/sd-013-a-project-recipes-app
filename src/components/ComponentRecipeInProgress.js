import React, { useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import recipeContext from '../context';
import ComponentDetailsContent from './ComponentDetailsContent';
import { ingredientsInProgressArray } from '../functions';

function ComponentRecipeInProgress() {
  const { fetchDetails } = useContext(recipeContext).ContextDetails;
  const { id } = useParams();
  const currentPage = useHistory().location.pathname.includes('/comidas');
  const history = useHistory();

  useEffect(() => {
    if (currentPage) {
      fetchDetails('themealdb', 'lookup', 'i', id);
    } else {
      fetchDetails('thecocktaildb', 'lookup', 'i', id);
    }
  }, [currentPage, id]);

  const handleClick = () => {
    history.push('/receitas-feitas');
  };

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
          ? <ComponentDetailsContent keys={ keysM } func={ ingredientsInProgressArray } />
          : <ComponentDetailsContent keys={ keysD } func={ ingredientsInProgressArray } />
      }
      <button
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ handleClick }
      >
        FINALIZAR
      </button>
    </div>
  );
}

export default ComponentRecipeInProgress;
