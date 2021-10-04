import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchRecipeById from '../services/fetchRecipeById';
import Video from '../components/Video';
import Img from '../components/Img';
import Ingredients from '../components/Ingredients';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import Recomendations from '../components/Recomendations';
import StartOrContinueBtn from '../components/StartOrContinueBtn';

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
      <h2 data-testid="recipe-category">
        {isMeal ? recipe.strCategory : recipe.strAlcoholic}
      </h2>
      <ShareButton url={ match.url } />
      <FavoriteButton recipe={ recipe } isMeal={ isMeal } />

      <Ingredients recipe={ recipe } />

      <h4>Instruções</h4>
      <p data-testid="instructions">{recipe.strInstructions}</p>

      <Video meal={ isMeal } recipe={ recipe } />

      <h4>Recomendações</h4>
      <Recomendations isMeal={ isMeal } />

      <StartOrContinueBtn isMeal={ isMeal } recipe={ recipe } />
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
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReceitaDetalhes;
