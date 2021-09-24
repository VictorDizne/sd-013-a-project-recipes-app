import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchAPI from '../../services/fetchAPI';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function DrinkDetails({ match: { params: { id } } }) {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [ingredientes, setIngredientes] = useState([]);
  const [medida, setMedida] = useState([]);

  const ingredientsList = (drinkInfo) => {
    const arr = Object.keys(drinkInfo);
    console.log(Object.keys(drinkInfo));
    const ingredients = arr
      .filter((k) => (k.includes('strIngredient') ? k : null))
      .map((values) => drinkInfo[values])
      .filter((ingredient) => (ingredient));
    setIngredientes(ingredients);
  };

  const measureList = (drinksInfo) => {
    const arr = Object.keys(drinksInfo);
    const measures = arr
      .filter((k) => (k.includes('strMeasure') ? k : null))
      .map((values) => drinksInfo[values])
      .filter((measure) => (measure));
    setMedida(measures);
  };

  useEffect(() => {
    const fetchByID = async () => {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { drinks } = await fetchAPI(URL);
      setDetails(drinks[0]);
      console.log(drinks[0]);
      ingredientsList(drinks[0]);
      measureList(drinks[0]);
      setLoading(false);
    };
    fetchByID();
  }, [id]);

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
