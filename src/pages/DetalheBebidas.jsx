import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { foodAPIRequest, cocktailsAPIRequest } from '../services/APIrequest';
import Loading from '../components/Loading';
import Share from '../images/shareIcon.svg';
import Heart from '../images/whiteHeartIcon.svg';

const DetalheBebidas = ({ match: { params: { id } } }) => {
  const [drinkDetail, setDrinkDetail] = useState([]);
  const [foodsDetails, setFoodsDetails] = useState([]);

  useEffect(() => {
    const getAPIdata = async () => {
      const APIRequest = await cocktailsAPIRequest('lookup', `i=${id}`);
      setDrinkDetail(...APIRequest);
    };
    getAPIdata();
  }, []);

  useEffect(() => {
    const SIX = 6;
    const cocktailsRequest = async () => {
      const food = await foodAPIRequest();
      const foodSix = food.slice(0, SIX);
      setFoodsDetails(foodSix);
    };
    cocktailsRequest();
  }, []);

  const keysOfApi = Object.keys(drinkDetail);
  const ingredientsKeys = keysOfApi.filter((chave) => chave.includes('strIngredient'));
  const ingredientsValues = ingredientsKeys
    .map((ingredient) => drinkDetail[ingredient])
    .filter((ingredient) => ingredient !== null);

  const {
    strDrink,
    strCategory,
    strInstructions,
    strDrinkThumb } = drinkDetail;

  return (drinkDetail.length === 0 && foodsDetails.length === 0) ? <Loading /> : (
    <div>
      { console.log(ingredientsValues) }
      <img
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        alt={ strDrink }
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
      <p data-testid="recipe-title">{strDrink}</p>
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

      {foodsDetails
        .map(({ strMealThumb, strMeal, strCategory: strMealCategory }, i) => (
          <section key={ i } data-testid={ `${i}-recomendation-card` }>
            <img
              width="100"
              height="100"
              src={ strMealThumb }
              alt={ strMeal }
            />
            <p>{strMealCategory}</p>
            <p>{strMeal}</p>
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

DetalheBebidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default DetalheBebidas;
