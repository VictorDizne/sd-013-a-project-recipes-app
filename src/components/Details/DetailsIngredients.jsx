import React from 'react';
import { useSelector } from 'react-redux';

function DetailsIngredients() {
  const recipe = useSelector((state) => state.api.recipe);
  const recKeys = Object.keys(recipe); // Gera um array com todas as chaves do objeto da receita;
  const ingredients = recKeys.filter((k) => k.startsWith('strIngredient') && recipe[k]); // Filtra o array das chaves para pegar apenas as chaves de ingredientes;

  return (
    <div className="details-ingredients-container">
      <h3>Ingredients</h3>
      <ul className="details-ingredient-list">
        {ingredients.map((ing, idx) => ( // Faz um map usando o array de chaves de ingredientes para acessar os ingredientes da receita;
          <li key={ recipe[ing] } data-testid={ `${idx}-ingredient-name-and-measure` }>
            {`${recipe[ing]} - ${recipe[`strMeasure${idx + 1}`]}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DetailsIngredients;
