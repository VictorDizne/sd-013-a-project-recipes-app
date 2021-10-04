import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchSurprise } from '../services';

function ExploreButtons() {
  const history = useHistory();
  const location = useLocation();
  const handleExploreIngredient = () => history.push(`${location.pathname}/ingredientes`);
  const handleExploreArea = () => {
    history.push(`${location.pathname}/area`);
  };
  const handleExploreSurprise = async () => {
    const { pathname } = location;
    const id = await fetchSurprise(pathname);
    if (pathname.includes('comidas')) {
      history.push(`/comidas/${id}`);
    } else {
      history.push(`/bebidas/${id}`);
    }
  };
  const [buttonArea, setButtonArea] = useState();

  const conditionalButtonArea = () => {
    switch (location.pathname) {
    case '/explorar/bebidas':
      setButtonArea(false);
      break;
    case '/explorar/comidas':
      setButtonArea(true);
      break;
    default:
      break;
    }
  };

  useEffect(conditionalButtonArea, [location]);

  return (
    <>
      <button
        onClick={ handleExploreIngredient }
        type="button"
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </button>
      { buttonArea && (
        <button
          onClick={ handleExploreArea }
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>)}
      <button
        onClick={ handleExploreSurprise }
        type="button"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
    </>
  );
}

export default ExploreButtons;
