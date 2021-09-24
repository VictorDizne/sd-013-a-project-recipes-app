import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import fetchAPI from '../../services/fetchAPI';
import recipesContext from '../../context';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function MealDetails() {
  const {
    details,
    setDetails,
    setLoading,
    medida,
    setMedida,
    loading,
    ingredientes,
    setIngredientes,
  } = useContext(recipesContext);
  const { id } = useParams();

  const ingredientsList = (mealInfo) => {
    const arr = Object.keys(mealInfo);
    const ingredients = arr
      .filter((k) => (k.includes('strIngredient') ? k : null))
      .map((values) => mealInfo[values])
      .filter((ingredient) => ingredient.length > 1);
    setIngredientes(ingredients);
  };

  const measureList = (mealInfo) => {
    const arr = Object.keys(mealInfo);
    const measures = arr
      .filter((k) => (k.includes('strMeasure') ? k : null))
      .map((values) => mealInfo[values])
      .filter((measure) => measure.length > 1);
    setMedida(measures);
  };

  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const fetchByID = async () => {
    setLoading(true);
    const { meals } = await fetchAPI(URL);
    setDetails(meals[0]);
    setLoading(false);
    ingredientsList(meals[0]);
    measureList(meals[0]);
  };

  useEffect(() => {
    fetchByID();
  }, []);

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
      >
        <img
          src={ shareIcon }
          alt="share button"
        />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        <img
          src={ whiteHeartIcon }
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
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
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
