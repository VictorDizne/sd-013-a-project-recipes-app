import React from 'react';

function Ingredients({ recipe }) {
  const ingredients = () => {
    let i = 1;
    const ingList = [];
    while (recipe[`strIngredient${i}`]) {
      ingList.push(`${recipe[`strIngredient${i}`]} ${recipe[`strMeasure${i}`]}`);
      i += 1;
    }
    return ingList;
  };

  return (
    <>
      <h4>Ingredientes</h4>
      <ul>
        {ingredients().map((ing, idx) => (
          <li key={ ing } data-testid={ `${idx}-ingredient-name-and-measure` }>
            {ing}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Ingredients;
