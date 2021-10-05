import React, { useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDebugState } from 'use-named-state';
import recipeContext from '../context';
import ComponentDetailsContent from './ComponentDetailsContent';

function ComponentRecipeInProgress() {
  const { fetchDetails, recipeProgress } = useContext(recipeContext).ContextDetails;
  const { id } = useParams();
  const currentPage = useHistory().location.pathname.includes('/comidas');
  const history = useHistory();

  const [button, setButton] = useDebugState('button', true);

  useEffect(() => {
    if (currentPage) {
      fetchDetails('themealdb', 'lookup', 'i', id);
    } else {
      fetchDetails('thecocktaildb', 'lookup', 'i', id);
    }
  }, [currentPage, id]);

  useEffect(() => {
    if (recipeProgress !== '') {
      setButton(Object.values(recipeProgress).every((item) => item === true));
    }
  }, [recipeProgress]);

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
          ? <ComponentDetailsContent keys={ keysM } />
          : <ComponentDetailsContent keys={ keysD } />
      }
      <button
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ handleClick }
        disabled={ !button }
      >
        FINALIZAR
      </button>
    </div>
  );
}

export default ComponentRecipeInProgress;
