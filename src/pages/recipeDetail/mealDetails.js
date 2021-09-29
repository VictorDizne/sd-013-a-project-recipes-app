import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import fetchAPI from '../../services/fetchAPI';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import Footer from '../../components/footer';
import recipesContext from '../../context';

const copy = require('clipboard-copy');

function MealDetails({ match: { params: { id } } }) {
  const { details,
    loading,
    setLoading,
    ingredientes,
    medida,
    setDetails,
    setIngredientes,
    setMedida,
    setFavRecipes,
    favRecipes } = useContext(recipesContext);
  const ingredientsList = (mealInfo) => {
    const arr = Object.keys(mealInfo);
    const ingredients = arr
      .filter((k) => (k.includes('strIngredient') ? k : null))
      .map((values) => mealInfo[values])
      .filter((ingredient) => ingredient.length > 1);
    setIngredientes(ingredients);
  };

  const compartilhar = () => {
    copy(window.location);
    global.alert('Link copiado!');
  };

  const measureList = (mealInfo) => {
    const arr = Object.keys(mealInfo);
    const measures = arr
      .filter((k) => (k.includes('strMeasure') ? k : null))
      .map((values) => mealInfo[values])
      .filter((measure) => measure.length > 1);
    setMedida(measures);
  };

  const checkFavorite = () => {
    const receitas = JSON.parse(localStorage.favoriteRecipes);
    return receitas.some((recipe) => ((recipe).id) === id);
  };

  const favoritar = () => {
    const obj = {
      id: details.idMeal,
      type: 'Meals',
      area: details.strArea,
      category: details.strCategory,
      name: details.strMeal,
      image: details.strMealThumb,
    };
    const parseVersion = JSON.parse(localStorage.favoriteRecipes);
    localStorage.favoriteRecipes = JSON.stringify([...parseVersion, (obj)]);
    setFavRecipes(true);
  };

  const desfavoritar = () => {
    const localTest = JSON.parse(localStorage.favoriteRecipes);
    const desfa = localTest.filter((recipe) => ((recipe).id) !== id);
    localStorage.favoriteRecipes = JSON.stringify((desfa));
    setFavRecipes(false);
  };

  function handleFavButton() {
    return checkFavorite() ? desfavoritar() : favoritar();
  }

  const initRecipe = (info) => {
    const idDaReceita = info.idMeal;
    const iniciar = {
      pathname: `/comidas/${idDaReceita}/in-progress`,
      info,
    };
    return iniciar;
  };

  useEffect(() => {
    const fetchByID = async () => {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { meals } = await fetchAPI(URL);
      setDetails(meals[0]);
      ingredientsList(meals[0]);
      measureList(meals[0]);
      setLoading(false);
    };
    fetchByID();
    checkFavorite();
  }, [favRecipes]);

  if (loading) return 'loading';

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ details.strMealThumb }
        alt="Meal"
      />
      <h2 data-testid="recipe-title">{details.strMeal}</h2>
      <button
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
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFavButton }
      >
        <img
          src={ checkFavorite() ? blackHeartIcon : whiteHeartIcon }
          alt="Favoritar"
        />
      </button>
      <ul data-testid={ `${id}-ingredient-name-and-measure` }>
        {ingredientes
          .map((ing, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {`${medida[index]} of ${ing}`}
            </li>
          ))}
      </ul>
      <p data-testid="instructions">{ details.strInstructions }</p>
      <Link to={ () => initRecipe(details) }>
        <button
          type="button"
          data-testid="start-recipe-btn"
        >
          Iniciar Receita
        </button>
      </Link>
      <Footer />
    </>
  );
}

MealDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MealDetails;
