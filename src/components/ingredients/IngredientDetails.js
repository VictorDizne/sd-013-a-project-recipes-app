import React, { useContext } from 'react';
import recipeContext from '../../context';
import { filterIngredientsAndMeasures } from '../../functions';

function IngredientDetails() {
  const { details } = useContext(recipeContext).ContextDetails;

  const array = filterIngredientsAndMeasures(details);
  const shortArrays = [];

  while (array.length > 0) {
    shortArrays.push(array.splice(0, 2));
  }
  return (
    <div>
      {
        shortArrays.map((item, index) => (
          <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {item.toString().replace(',', ' - ')}
          </p>
        ))
      }
    </div>
  );
}

export default IngredientDetails;
