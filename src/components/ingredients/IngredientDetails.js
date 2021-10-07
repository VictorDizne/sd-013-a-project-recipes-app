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
      <h3 className="details-ingredient-title">Ingredients:</h3>
      {
        shortArrays.map((item, index) => (
          <h5
            className="ingredient-step"
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {item.toString().replace(',', ' - ')}
          </h5>
        ))
      }
    </div>
  );
}

export default IngredientDetails;
