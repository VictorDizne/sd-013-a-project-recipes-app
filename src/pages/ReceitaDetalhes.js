import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import fetchRecipeById from '../services/fetchRecipeById';
import Video from '../components/Video';
import Img from '../components/Img';
import Ingredients from '../components/Ingredients';

function ReceitaDetalhes({ match }) {
  const [recipe, setRecipe] = useState({});

  const { recipeId } = match.params;

  // `true` se for a página de comidas, `false` caso seja bebidas
  const isMeal = /comidas/.test(match.path);

  useEffect(() => {
    const getRecipe = async (id) => {
      const result = await fetchRecipeById(id, isMeal);
      setRecipe(result);
    };
    getRecipe(recipeId);
  }, [setRecipe, recipeId, isMeal]);

  const renderContent = () => (
    <>
      <Img meal={ isMeal } recipe={ recipe } />
      <h1 data-testid="recipe-title">{isMeal ? recipe.strMeal : recipe.strDrink}</h1>
      <h2 data-testid="recipe-category">{isMeal ? recipe.strCategory : recipe.strAlcoholic}</h2>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">S2</button>

      <Ingredients recipe={ recipe } />

      <h4>Instruções</h4>
      <p data-testid="instructions">{recipe.strInstructions}</p>

      <Video meal={ isMeal } recipe={ recipe } />

      <h4>Recomendações</h4>
      <p data-testid="0-recomendation-card">Ver o que é isso.</p>

      <Link
        to={ `/comidas/${recipeId}/in-progress` }
        className="btn btn-primary"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </Link>
    </>
  );

  return recipe ? renderContent() : <h1>Loading...</h1>;
}

ReceitaDetalhes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ReceitaDetalhes;
