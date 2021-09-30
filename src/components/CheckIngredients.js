import React from 'react';
import PropTypes from 'prop-types';

function CheckIngredients({ recipe, inProgressRecipes, id, handleCheckBox }) {
  return (
    <div>
      {
        Object.entries(recipe).map(([key, value]) => {
          if (key.includes('strIngredient') && value) {
            const index = Number(key.split('strIngredient')[1]) - 1;
            return (
              <label
                htmlFor="ingredient"
                data-testid={ `${index}-ingredient-step` }
                style={ { textDecoration: inProgressRecipes[id]
                  .includes(`${index + 1}`) ? 'line-through' : '' } }
              >
                <input
                  name={ index + 1 }
                  type="checkbox"
                  id="ingredient"
                  onChange={ handleCheckBox }
                  checked={ inProgressRecipes[id].includes(`${index + 1}`) }
                />
                {`${value} - ${recipe[`strMeasure${index + 1}`]}`}
              </label>);
          }
          return null;
        })
      }
    </div>
  );
}

CheckIngredients.propTypes = {
  recipe: PropTypes.shape(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  inProgressRecipes: PropTypes.shape(PropTypes.object).isRequired,
  handleCheckBox: PropTypes.func.isRequired,
};

export default CheckIngredients;
