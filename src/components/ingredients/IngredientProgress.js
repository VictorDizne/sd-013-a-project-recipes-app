import React, { useContext, useEffect } from 'react';
import recipeContext from '../../context';
import usePersistedState from '../../utils/usePersistedState';
import { filterIngredientsAndMeasures } from '../../functions';

function IngredientProgress() {
  const { details, setRecipeProgress } = useContext(recipeContext).ContextDetails;
  const inputs = document.getElementsByTagName('input');

  const [progress, setProgress] = usePersistedState('inProgressRecipes', '');

  const array = filterIngredientsAndMeasures(details);
  const shortArrays = [];
  while (array.length > 0) {
    shortArrays.push(array.splice(0, 2));
  }

  useEffect(() => {
    setRecipeProgress(progress);
  }, [progress]);

  useEffect(() => {
    if (inputs.length > 0) {
      let obj;
      for (let i = 0; i < inputs.length; i += 1) {
        obj = { ...obj,
          [`ingredient${i}`]: progress[`ingredient${i}`] || false,
        };
      }
      setProgress(obj);
    }
  }, [inputs.length]);

  const handleClick = ({ target }) => {
    target.parentNode.classList.toggle('risk');
    setProgress({ ...progress, [target.id]: !progress[target.id] });
  };

  return (
    <div>
      <h2>Ingredients</h2>
      {shortArrays.map((item, index) => (
        <li key={ index }>
          <label
            id="label"
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ [`ingredient${index}`] }
          >
            <input
              onChange={ handleClick }
              type="checkbox"
              id={ [`ingredient${index}`] }
              className="ingredient-step"
              checked={ progress[`ingredient${index}`] || false }
            />
            {item.toString().replace(',', ' - ')}
          </label>
        </li>
      ))}
    </div>
  );
}

export default IngredientProgress;
