import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchRecipeById from '../services/fetchRecipeById';
import Img from '../components/Img';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import IngredientsList from '../components/IngredientsList';
import Context from '../context';
import FinishButton from '../components/FinishButton';

// ARRUMAR BUG NO LOCALSTORAGE E NO CHECKBOX
function ReceitasProgresso({ match }) {
  const [recipe, setRecipe] = useState({});
  const [disabledButton, setDisabledButton] = useState(true);
  const { compareCheckBox, ingredientsLength } = useContext(Context);
  const url = match.url.split('/in')[0];
  console.log(match.url);

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

  // funcao para habilitar ou desabilitar o botao Finalizar Receita
  const disableButton = () => {
    if (compareCheckBox !== ingredientsLength - 1) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  };

  const renderContent = () => (
    <>
      <Img meal={ isMeal } recipe={ recipe } />
      <h1 data-testid="recipe-title">{isMeal ? recipe.strMeal : recipe.strDrink}</h1>
      <h2 data-testid="recipe-category">
        {isMeal ? recipe.strCategory : recipe.strAlcoholic}
      </h2>
      <ShareButton
        url={ url }
      />
      <FavoriteButton
        recipe={ recipe }
        isMeal={ isMeal }
      />

      <IngredientsList
        recipe={ recipe }
        isMeal={ isMeal }
        disableButton={ disableButton }
        recipeId={ recipeId }
      />

      <h4>Instruções</h4>
      <p data-testid="instructions">{recipe.strInstructions}</p>

      <h4>Recomendações</h4>
      <p data-testid="0-recomendation-card">Ver o que é isso.</p>

      <FinishButton
        disabledButton={ disabledButton }
        recipeId={ recipeId }
        isMeal={ isMeal }
        recipe={ recipe }
      />

    </>
  );

  return recipe ? renderContent() : <h1>Loading...</h1>;
}

ReceitasProgresso.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      recipeId: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReceitasProgresso;
