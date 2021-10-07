import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import recipeContext from '../context';
import ComponentDetailsContent from './ComponentDetailsContent';
import ComponentSugestions from './ComponentSugestions';

function ComponentDetails() {
  const { fetchDetails, recipeProgress } = useContext(recipeContext).ContextDetails;
  const { id } = useParams();
  const currentPage = useHistory().location.pathname.includes('/comidas');
  const history = useHistory();
  const textButton = useRef('Continuar Receita');

  const [button, setButton] = useState(true);

  useEffect(() => {
    if (currentPage) {
      fetchDetails('themealdb', 'lookup', 'i', id);
    } else {
      fetchDetails('thecocktaildb', 'lookup', 'i', id);
    }
  }, [currentPage, id]);

  useEffect(() => {
    if (recipeProgress) {
      setButton(false);
      if (Object.values(recipeProgress).every((item) => item === true)) {
        setButton(false);
      } else if (Object.values(recipeProgress).some((item) => item === true)) {
        setButton(true);
        textButton.current = 'Continuar Receita';
      } else {
        setButton(true);
        textButton.current = 'Iniciar Receita';
      }
    }
  }, [recipeProgress]);

  const handleClick = () => {
    history.push(`${id}/in-progress`);
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
    iframe: true,
    click: false,
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
    click: false,
  };

  return (
    <div>
      <div>
        {
          currentPage
            ? <ComponentDetailsContent keys={ keysM } />
            : <ComponentDetailsContent keys={ keysD } />
        }
      </div>
      <div>
        <ComponentSugestions />
      </div>
      <div className="btn-container">
        {
          button && (
            <button
              id="btn-start"
              className="btn-start"
              data-testid="start-recipe-btn"
              type="button"
              onClick={ handleClick }
            >
              {textButton.current}
            </button>)
        }
      </div>
    </div>
  );
}

export default ComponentDetails;
