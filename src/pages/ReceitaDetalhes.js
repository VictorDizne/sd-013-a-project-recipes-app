import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import fetchRecipeById from '../services/fetchRecipeById';

function ReceitaDetalhes({ match }) {
  const [recipe, setRecipe] = useState({});
  const [fetching, setFetching] = useState(true);

  const { recipeId } = match.params;

  // `true` se for a página de comidas, `false` caso seja bebidas
  const meal = /comidas/.test(match.path);

  useEffect(() => {
    const getRecipe = async (id) => {
      const result = await fetchRecipeById(id, meal);
      setRecipe(result);
    };
    getRecipe(recipeId);
    setFetching(false);
  }, [setRecipe, recipeId, meal]);

  if (fetching) return <h1>Loading...</h1>;

  const renderYoutubeVideo = () => {
    if (!meal) return null;

    const youtubeURL = String(recipe.strYoutube).replace(/watch\?v=/, 'embed/');
    return <ReactPlayer url={ youtubeURL } data-testid="video" />;
  };

  console.log('recipe', recipe, 'fetching', fetching);
  if (recipe) {
    return (
      <>
        <img
          src={ meal ? recipe.strMealThumb : recipe.strDrinkThumb }
          alt={ meal ? recipe.strMeal : recipe.strDrink }
          className="img-fluid"
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{meal ? recipe.strMeal : recipe.strDrink}</h1>
        <h2 data-testid="recipe-category">{recipe.strCategory}</h2>
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
        <p data-testid="instructions">{recipe.strInstructions}</p>

        {renderYoutubeVideo()}

        <h4>Recomendações</h4>
        <p data-testid="0-recomendation-card">Ver o que é isso.</p>

        <Link to={ `/comidas/${recipeId}/in-progress` }>
          <button type="button" data-testid="start-recipe-btn">
            Iniciar Receita
          </button>
        </Link>
      </>
    );
  }
  return <h1>Loading...</h1>;
}

ReceitaDetalhes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ReceitaDetalhes;
