import React, { useContext, useEffect } from 'react';
import { useDebugState } from 'use-named-state';
import recipeContext from '../../context';
import { filterIngredientsAndMeasures } from '../../functions';

function IngredientProgress() {
  const { details } = useContext(recipeContext).ContextDetails;
  const inputs = document.querySelectorAll('.ingredient-step');

  const [progress, setProgress] = useDebugState('progress', {});

  const array = filterIngredientsAndMeasures(details);
  const shortArrays = [];
  while (array.length > 0) {
    shortArrays.push(array.splice(0, 2));
  }

  useEffect(() => {
    if (inputs.length > 0) {
      let obj;
      for (let i = 0; i < inputs.length; i += 1) {
        obj = { ...obj, [`ingredient${i}`]: false };
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
      {shortArrays.map((item, index) => (
        <li key={ index }>
          <label
            id="label"
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ [`ingredient${index}`] }
          >
            <input
              onClick={ handleClick }
              type="checkbox"
              id={ [`ingredient${index}`] }
              className="ingredient-step"
            />
            {item.toString().replace(',', ' - ')}
          </label>
        </li>
      ))}
    </div>
  );
}

export default IngredientProgress;
