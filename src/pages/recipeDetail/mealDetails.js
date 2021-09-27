import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchAPI from '../../services/fetchAPI';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function MealDetails({ match: { params: { id } } }) {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [ingredientes, setIngredientes] = useState([]);
  const [medida, setMedida] = useState([]);

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
  }, [id]);

  if (loading) return 'loading';

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ details.strMealThumb }
        className="meal-pic"
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
          meal-pic
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
