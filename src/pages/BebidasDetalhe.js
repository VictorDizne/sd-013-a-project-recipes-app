import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchDrinkById from '../services/fetchDrinkById';

function BebidasDetalhes({ match }) {
  const { recipeId } = match.params;

  const [drink, setDrink] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDrink = async (id) => {
      const result = await fetchDrinkById(id);
      setDrink(result);
    };
    getDrink(recipeId);
    setIsLoading(false);
  }, [setDrink, recipeId]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>
        Detalhes da Receita de Drink
        {recipeId}
      </h1>
      <h2 data-testid="recipe-title">{drink.strDrink}</h2>
      <h3 data-testid="recipe-category">{drink.strCategory}</h3>
      <img
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
        data-testid="recipe-photo"
      />
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">S2</button>

      <h4>Ingredientes</h4>
      <ul>
        <li data-testid="0-ingredient-name-and-measure">
          <p>Iterar sobre as chaves `strIngredient1` até `strIngredient20` aqui.</p>
          <p>Concatenar com `strMeasure1` ao `strMeasure20`</p>
        </li>
      </ul>

      <h4>Instruções</h4>
      <p data-testid="instructions">{drink.strInstructions}</p>

      <h4>Recomendações</h4>
      <p data-testid="0-recomendation-card">Ver o que é isso.</p>

      <button type="button" data-testid="start-recipe-btn">
        Iniciar
      </button>
    </div>
  );
}

BebidasDetalhes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BebidasDetalhes;
