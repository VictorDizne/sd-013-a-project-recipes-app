import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function ExploreButtons() {
  const history = useHistory();
  const location = useLocation();
  console.log(location);
  const handleExploreIngredient = () => history.push(`${location.pathname}/ingredientes`);
  const handleExploreArea = () => history.push(`${location.pathname}/area`);
  const handleExploreSurprise = () => history.push(`${location.pathname}`);
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
