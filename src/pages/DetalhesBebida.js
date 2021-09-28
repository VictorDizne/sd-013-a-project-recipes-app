import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';
import RecipesContext from '../context/RecipesContext';

function DetalhesBebida({ match: { params: { recipeId } } }) {
  const [drink, setDrink] = useState({});
  const [showDoneBtn, setShowDoneBtn] = useState(true);
  const { setBtnText } = useContext(RecipesContext);

  useEffect(() => {
    const fetching = async () => {
      const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const json = await res.json();
      console.log(json.drinks[0]);
      setDrink(json.drinks[0]);
    };

    fetching();
  }, [recipeId]);

  useEffect(() => {
    const getRecipeStorage = localStorage.getItem('doneRecipes');
    console.log(getRecipeStorage);
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
    const inProgressRecipe = localStorage.getItem('inProgressRecipes');

    if (inProgressRecipe) {
      const recipeExists = JSON.parse(inProgressRecipe);

      if (recipeExists.cocktails[drink.idDrink]) setBtnText('Continuar Receita');
    }
  }, [drink.idDrink, setBtnText]);

  return (
    <div>
      <RecipeDetails
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
};

export default DetalhesBebida;
