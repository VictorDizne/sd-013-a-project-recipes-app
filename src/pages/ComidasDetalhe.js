import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import fetchMealById from '../services/fetchMealById';

function ComidasDetalhes({ match }) {
  const { recipeId } = match.params;

  const [meal, setMeal] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMeal = async (id) => {
      const result = await fetchMealById(id);
      setMeal(result);
    };
    getMeal(recipeId);
    setIsLoading(false);
  }, [recipeId]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>
        Detalhes da Receita de Comida
        {recipeId}
      </h1>
      <h2 data-testid="recipe-title">{meal.strMeal}</h2>
      <h3 data-testid="recipe-category">{meal.strCategory}</h3>
      <img
        src={ meal.strMealThumb }
        alt={ meal.strMeal }
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
      <p data-testid="instructions">{meal.strInstructions}</p>

      <h4>Recomendações</h4>
      <p data-testid="0-recomendation-card">Ver o que é isso.</p>

      <Link to={ `/comidas/${recipeId}/in-progress` }>

        <button type="button" data-testid="start-recipe-btn">
          Iniciar Receita
        </button>
      </Link>
    </div>
  );
}

ComidasDetalhes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ComidasDetalhes;
