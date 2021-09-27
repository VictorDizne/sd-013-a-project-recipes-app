import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { foodAPIRequest, cocktailsAPIRequest } from '../services/APIrequest';
import Loading from '../components/Loading';
import Share from '../images/shareIcon.svg';
import Heart from '../images/whiteHeartIcon.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BlackHeart from './..images/blackHeartIcon.svg';

const DetalheComidas = ({ match: { params: { id } }, history }) => {
  const [foodDetail, setfoodDetail] = useState([]);
  const [drinksDetails, setDrinkDetails] = useState([]);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
  };

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

  const measurementKeys = keysOfApi.filter((chave) => chave.includes('strMeasure'))
    .map((measure) => foodDetail[measure])
    .filter((measure) => measure !== null || measure !== '');

  const ingredientsKeys = keysOfApi.filter((chave) => chave.includes('strIngredient'));
  const ingredientsValues = ingredientsKeys
    .map((ingredient) => foodDetail[ingredient])
    .filter((ingredient) => ingredient !== '');

  const { strMeal, strCategory, strInstructions, strMealThumb, strYoutube } = foodDetail;

  const handleClick = () => {
    const btn = document.getElementById(`${id}`);
    btn.innerHTML = 'Continuar Receita';
    console.log(btn);
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ meals: { [id]: [] } }));
    }
    const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorage.setItem('inProgressRecipes', JSON
      .stringify({ ...recipes, meals: { ...recipes.meals, [id]: [] } }));

    history.push(`/comidas/${id}/in-progress`);
  };

/*   const handleFavorite = () => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify({
          id,
          type: 'comida',
          area: strArea,
          category: strCategory,
          name: strMeal,
          image: strMeakThumb,
          doneDate: 'quando - a - receita - foi - concluida',
          tags: 'array - de - tags - da - receita - ou - array - vazio',
        }));
    }
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    localStorage.setItem('favoriteRecipes', JSON
      .stringify({ ...recipes, cocktails: { ...recipes.cocktails, [id]: [] } }));
  };
 */
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
        /* onClick={ handleFavorite } */
        data-testid="favorite-btn"
        type="button"
      >
        <img src={ Heart } alt="btn Fav" />
      </button>
      <p data-testid="recipe-title">{strMeal}</p>
      <p data-testid="recipe-category">{strCategory}</p>
      <section>
        <p>Ingredients</p>
        <div className="ingredients-measure">
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
          <ul>
            {measurementKeys
              .map((measure, i) => (
                <li
                  data-testid={ `${i}-ingredient-name-and-measure` }
                  key={ i }
                >
                  { measure }
                </li>))}
          </ul>
        </div>
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
      <Slider { ...settings }>
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
              <p data-testid={ `${i}-recomendation-title` }>{strDrink}</p>
            </section>
          ))}
      </Slider>
      <button
        id={ id }
        onClick={ handleClick }
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
