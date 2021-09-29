import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';
import RecipesContext from '../context/RecipesContext';

function DetalhesBebida({ match: { params: { recipeId } }, history }) {
  const [drink, setDrink] = useState({});
  const [showDoneBtn, setShowDoneBtn] = useState(true);
  const { setBtnText, setIsFavorite } = useContext(RecipesContext);

  useEffect(() => {
    const fetching = async () => {
      const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const json = await res.json();
      // console.log(json);
      if (json.drinks) setDrink(json.drinks[0]);
    };

    fetching();
  }, [recipeId]);

  useEffect(() => {
    const getRecipeStorage = localStorage.getItem('doneRecipes');
    if (getRecipeStorage) {
      const recipeExists = JSON.parse(getRecipeStorage).some((r) => (
        r.idDrink === drink.idDrink));
      if (recipeExists) {
        setShowDoneBtn(true);
      } else {
        setShowDoneBtn(false);
      }
    }
  }, [drink.idDrink]);

  useEffect(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');

    if (favoriteRecipes) {
      const favoriteRecipesExists = JSON.parse(favoriteRecipes).some((r) => (
        r.id === drink.idDrink
      ));

      if (favoriteRecipesExists) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [drink.idDrink, setIsFavorite]);

  useEffect(() => {
    const inProgressRecipe = localStorage.getItem('inProgressRecipes');

    if (inProgressRecipe) {
      const recipeExists = JSON.parse(inProgressRecipe);

      if (recipeExists.cocktails[drink.idDrink]) setBtnText('Continuar Receita');
    }
  }, [drink.idDrink, setBtnText]);

  return (
    <div>
      <RecipeDetails
        history={ history }
        showBtn={ showDoneBtn }
        recipe={ drink }
        isMeal={ false }
      />
    </div>
  );
}

DetalhesBebida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default DetalhesBebida;
