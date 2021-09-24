import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import fetchAPI from '../../services/fetchAPI';
import recipesContext from '../../context';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function DrinkDetails() {
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

  const ingredientsList = (drinkInfo) => {
    const arr = Object.keys(drinkInfo);
    const ingredients = arr
      .filter((k) => (k.includes('strIngredient') ? k : null))
      .map((values) => drinkInfo[values])
      .filter((ingredient) => ingredient);
    setIngredientes(ingredients);
  };

  const measureList = (drinksInfo) => {
    const arr = Object.keys(drinksInfo);
    const measures = arr
      .filter((k) => (k.includes('strMeasure') ? k : null))
      .map((values) => drinksInfo[values])
      .filter((measure) => measure);
    setMedida(measures);
  };

  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const fetchByID = async () => {
    setLoading(true);
    const { drinks } = await fetchAPI(URL);
    setDetails(drinks[0]);
    setLoading(false);
    ingredientsList(drinks[0]);
    measureList(drinks[0]);
  };

  useEffect(() => {
    fetchByID();
  }, []);

  if (loading) return 'loading';

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ details.strDrinkThumb }
        alt="Meal"
      />
      <h2 data-testid="recipe-title">{details.strDrink}</h2>
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

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinkDetails;
