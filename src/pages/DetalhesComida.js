import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';
import RecipesContext from '../context/RecipesContext';

function DetalhesComida({ match: { params: { recipeId } }, history }) {
  const [meal, setMeal] = useState({});
  const [startRecipeBtn, setStartRecipeBtn] = useState(true);
  const { setBtnText, setIsFavorite } = useContext(RecipesContext);

  useEffect(() => {
    const fetching = async () => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const json = await res.json();
      // console.log(json.meals[0]);
      setMeal(json.meals[0]);
    };

    fetching();
  }, [recipeId]);

  useEffect(() => {
    const getRecipeStorage = localStorage.getItem('doneRecipes');
    if (getRecipeStorage) {
      const recipeExists = JSON.parse(getRecipeStorage).some((r) => (
        r.idMeal === meal.idMeal));
      if (recipeExists) {
        setStartRecipeBtn(true);
      } else {
        setStartRecipeBtn(false);
      }
    }
  }, [meal.idMeal]);

  useEffect(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');

    if (favoriteRecipes) {
      const favoriteRecipesExists = JSON.parse(favoriteRecipes).some((r) => (
        r.id === meal.idMeal
      ));

      if (favoriteRecipesExists) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [meal.idMeal, setIsFavorite]);

  useEffect(() => {
    const inProgressRecipe = localStorage.getItem('inProgressRecipes');

    if (inProgressRecipe) {
      const recipeExists = JSON.parse(inProgressRecipe);

      if (recipeExists.meals[meal.idMeal]) setBtnText('Continuar Receita');
    }
  }, [meal.idMeal, setBtnText]);

  return (
    <RecipeDetails
      history={ history }
      showBtn={ startRecipeBtn }
      recipe={ meal }
      isMeal={ isTrue }
    />
  );
}

DetalhesComida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default DetalhesComida;
