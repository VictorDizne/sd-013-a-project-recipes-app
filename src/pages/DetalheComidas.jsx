import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { foodAPIRequest, cocktailsAPIRequest } from '../services/APIrequest';
import Loading from '../components/Loading';
import Share from '../images/shareIcon.svg';
import Heart from '../images/whiteHeartIcon.svg';

const DetalheComidas = ({ match: { params: { id } } }) => {
  const [foodDetail, setfoodDetail] = useState([]);
  const [drinksDetails, setDrinkDetails] = useState([]);

  useEffect(() => {
    const getAPIdata = async () => {
      const APIRequest = await foodAPIRequest('lookup', `i=${id}`);
      setfoodDetail(...APIRequest);
    };
    getAPIdata();
  }, []);

  useEffect(() => {
    const SIX = 6;
    const cocktailsRequest = async () => {
      const drink = await cocktailsAPIRequest();
      const drinkSix = drink.slice(0, SIX);
      setDrinkDetails(drinkSix);
    };
    cocktailsRequest();
  }, []);

  const keysOfApi = Object.keys(foodDetail);
  const ingredientsKeys = keysOfApi.filter((chave) => chave.includes('strIngredient'));
  const ingredientsValues = ingredientsKeys
    .map((ingredient) => foodDetail[ingredient])
    .filter((ingredient) => ingredient !== '');

  const { strMeal, strCategory, strInstructions, strMealThumb, strYoutube } = foodDetail;

  return (foodDetail.length === 0 && drinksDetails.length === 0) ? <Loading /> : (
    <div>
      { console.log(ingredientsValues) }
      <img
        data-testid="recipe-photo"
        src={ strMealThumb }
        alt={ strMeal }
        width="320"
        height="240"
      />
      <button
        data-testid="share-btn"
        type="button"
      >
        <img src={ Share } alt="btn share" />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
      >
        <img src={ Heart } alt="btn Fav" />
      </button>
      <p data-testid="recipe-title">{strMeal}</p>
      <p data-testid="recipe-category">{strCategory}</p>
      <section>
        <p>Ingredients</p>
        <ul>
          {ingredientsValues
            .map((ingredient, i) => (
              <li
                data-testid={ `${i}-ingredient-name-and-measure` }
                key={ i }
              >
                { ingredient }
              </li>))}
        </ul>
      </section>
      <p data-testid="instructions">{strInstructions}</p>
      <iframe
        data-testid="video"
        title="YouTube video player"
        width="320"
        height="240"
        src={ `${strYoutube
          .split('watch?v=')[0]}embed/${strYoutube
          .split('watch?v=')[1]}` }
        frameBorder="0"
        allow="accelerometer; gyroscope; picture-in-picture"
        allowFullScreen
      />

      {drinksDetails
        .map(({ strDrinkThumb, strDrink, strCategory: strDrikCategory }, i) => (
          <section key={ i } data-testid={ `${i}-recomendation-card` }>
            <img
              width="100"
              height="100"
              src={ strDrinkThumb }
              alt={ strDrink }
            />
            <p>{strDrikCategory}</p>
            <p>{strDrink}</p>
          </section>
        ))}
      <button
        className="iniciar"
        data-testid="start-recipe-btn"
        type="button"
      >
        Iniciar Receita
      </button>
    </div>
  );
};

DetalheComidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default DetalheComidas;
