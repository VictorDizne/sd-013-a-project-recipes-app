import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import fetchAPI from '../../services/fetchAPI';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import recipesContext from '../../context';
import DrinkIngredients from '../../components/DrinkIngredients';
import RecommendPageDrinks from '../../components/recommendPageDrinks';
import saveRecipeonLS from '../../services/saveRecipeonLS';

const copy = require('clipboard-copy');

function DrinkDetails({ match: { params: { id } } }) {
  const { details,
    loading,
    setLoading,
    setDetails,
    setIngredientes,
    setMedida,
    setFavRecipes,
    favRecipes } = useContext(recipesContext);
  const history = useHistory();

  const ingredientsList = (drinkInfo) => {
    const arr = Object.keys(drinkInfo);
    const ingredients = arr
      .filter((k) => (k.includes('strIngredient') ? k : null))
      .map((values) => drinkInfo[values])
      .filter((ingredient) => (ingredient))
      .filter((measure) => measure.length > 1);
    setIngredientes(ingredients);
  };

  const checkFavorite = () => {
    if (localStorage.favoriteRecipes) {
      const receitas = JSON.parse(localStorage.favoriteRecipes);
      return receitas.some((recipe) => ((recipe).id) === id);
    }
    return false;
  };

  const favoritar = () => {
    const obj = {
      id: details.idDrink,
      type: 'Drink',
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic,
      name: details.strDrink,
      image: details.strDrinkThumb,
    };
    if (localStorage.favoriteRecipes) {
      const parseVersion = JSON.parse(localStorage.favoriteRecipes);
      localStorage.favoriteRecipes = JSON.stringify([...parseVersion, (obj)]);
      return setFavRecipes(true);
    }
    localStorage.favoriteRecipes = JSON.stringify([obj]);
  };

  const desfavoritar = () => {
    const localTest = JSON.parse(localStorage.favoriteRecipes);
    const desfa = localTest.filter((recipe) => ((recipe).id) !== id);
    localStorage.favoriteRecipes = JSON.stringify(desfa);
    return setFavRecipes(false);
  };

  function handleFavButton() {
    return checkFavorite() ? desfavoritar() : favoritar();
  }

  const compartilhar = () => {
    copy(window.location);
  };

  const measureList = (drinksInfo) => {
    const arr = Object.keys(drinksInfo);
    const measures = arr
      .filter((k) => (k.includes('strMeasure') ? k : null))
      .map((values) => drinksInfo[values])
      .filter((measure) => (measure))
      .filter((measure) => measure.length > 1);
    setMedida(measures);
  };

  function startRecipe(recipe) {
    const idDaReceita = recipe.idDrink;
    saveRecipeonLS('Drink', recipe);
    history.push(`/bebidas/${idDaReceita}/in-progress`);
  }

  useEffect(() => {
    const fetchByID = async () => {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { drinks } = await fetchAPI(URL);
      setDetails(drinks[0]);
      ingredientsList(drinks[0]);
      measureList(drinks[0]);
      setLoading(false);
    };
    checkFavorite();
    fetchByID();
  }, [favRecipes]);

  if (loading) return 'loading';

  return (
    <>
      <img
        className="meal-img"
        data-testid="recipe-photo"
        src={ details.strDrinkThumb }
        alt="Meal"
      />
      <div className="detail-header">
        <h2 data-testid="recipe-title">{details.strDrink}</h2>
        <h4 data-testid="recipe-category">{details.strCategory}</h4>
        <button
          className="detail-button"
          type="button"
          data-testid="share-btn"
          onClick={ compartilhar }
        >
          <img
            src={ shareIcon }
            alt="share button"
          />
        </button>
        <button
          // implementar src=""
          className="detail-button"
          type="button"
          data-testid="favorite-btn"
          onClick={ handleFavButton }
        >
          <img
            src={ checkFavorite() ? blackHeartIcon : whiteHeartIcon }
            alt="Favoritar"
          />
        </button>
      </div>
      <DrinkIngredients props={ id } />
      <p className="paragraph" data-testid="instructions">{ details.strInstructions }</p>
      <RecommendPageDrinks />
      <button
        className="start-recipe"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => startRecipe(details) }
      >
        Iniciar Receita
      </button>
    </>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinkDetails;
