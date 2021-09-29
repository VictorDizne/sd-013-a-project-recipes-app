import React, { useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import recipeContext from '../context';
import ComponentDetailsContent from './ComponentDetailsContent';
import ComponentSugestions from './ComponentSugestions';

function ComponentDetails() {
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
    history.push(`${id}/in-progress`);
  };

  const keysMeal = {
    title: 'strMeal',
    category: 'strCategory',
    typeK: 'comida',
    id: 'idMeal',
    alcoholicOrNot: '',
    thumb: 'strMealThumb',
    area: 'strArea',
    instructions: 'strInstructions',
    video: 'strYoutube',
    iframe: true,
  };

  const keysDrink = {
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
  };
  return (
    <div>
      { currentPage
        ? <ComponentDetailsContent keys={ keysMeal } />
        : <ComponentDetailsContent keys={ keysDrink } /> }
      <ComponentSugestions />
      <div className="btn-container">
        <button
          className="btn-start"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ handleClick }
        >
          Iniciar receita
        </button>
      </div>
    </div>
  );
}

export default ComponentDetails;
