import React, { useContext } from 'react';
import Context from '../context';

const NUM_RECOMENDATIONS = 6;

function Recomendations({ isMeal }) {
  const { meals, drinks } = useContext(Context);

  const recomendations = (isMeal)
    ? drinks.slice(0, NUM_RECOMENDATIONS)
    : meals.slice(0, NUM_RECOMENDATIONS);

  return (
    (recomendations.length) && recomendations.map((recipe, idx) => (
      <div key={ idx } data-testid={ `${idx}-recomendation-card` }>
        <div data-testid={ `${idx}-recomendation-title` }>
          {isMeal ? recipe.strDrink : recipe.strMeal}
        </div>
      </div>
    ))
  );
}

export default Recomendations;
