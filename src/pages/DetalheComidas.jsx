import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import copy from 'clipboard-copy';
import { foodAPIRequest, cocktailsAPIRequest } from '../services/APIrequest';
import Loading from '../components/Loading';
import Share from '../images/shareIcon.svg';
import Heart from '../images/whiteHeartIcon.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BlackHeart from '../images/blackHeartIcon.svg';

const DetalheComidas = ({ match: { params: { id }, url }, history }) => {
  const [foodDetail, setfoodDetail] = useState([]);
  const [drinksDetails, setDrinkDetails] = useState([]);
  const [btnState, setBtnState] = useState('Iniciar Receita');
  const [btnFavorite, setBtnFavorite] = useState('isNotFavorite');
  const [isHidden, setIsHidden] = useState(true);
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
    const SIX = 6;
    const cocktailsRequest = async () => {
      const drink = await cocktailsAPIRequest();
      const drinkSix = drink.slice(0, SIX);
      setDrinkDetails(drinkSix);
    };
    cocktailsRequest();
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ meals: {}, cocktails: {} }));
    }
    const test = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const chaves = Object.keys(test.meals).some((chave) => chave === id);
    if (chaves) {
      setBtnState('Continuar Receita');
    }
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([]));
    }
    const testFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const chavesFav = testFav.some((chave) => chave.id === id);
    if (chavesFav) {
      setBtnFavorite('isFavorite');
    }
  }, []);

  const keysOfApi = Object.keys(foodDetail);

  const measurementKeys = keysOfApi.filter((chave) => chave.includes('strMeasure'))
    .map((measure) => foodDetail[measure])
    .filter((measure) => measure !== null || measure !== '');

  const ingredientsKeys = keysOfApi.filter((chave) => chave.includes('strIngredient'));
  const ingredientsValues = ingredientsKeys
    .map((ingredient) => foodDetail[ingredient])
    .filter((ingredient) => ingredient !== '');

  const {
    strMeal,
    strCategory,
    strInstructions,
    strMealThumb,
    strYoutube,
    strArea,
  } = foodDetail;

  const handleClick = () => {
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ meals: { [id]: [] }, cocktails: {} }));
    }
    const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorage.setItem('inProgressRecipes', JSON
      .stringify({ ...recipes, meals: { ...recipes.meals, [id]: [] } }));

    history.push(`/comidas/${id}/in-progress`);
  };

  const obj = {
    id,
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };
  const handleFavorite = () => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
    }

    const favs = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const unFav = favs.filter((element) => element.id !== id);

    if (btnFavorite === 'isNotFavorite') {
      copy('isFavorite');
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([...favs, obj]));
    } else {
      copy('isNotFavorite');
      localStorage.setItem('favoriteRecipes', JSON.stringify(unFav));
    }
    navigator.clipboard.readText().then(
      (clipText) => setBtnFavorite(clipText),
    );
  };

  const handleShare = () => {
    copy(`http://localhost:3000${url}`);
    setIsHidden(false);
  };

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
        onClick={ handleShare }
        type="button"
      >
        <img data-testid="share-btn" src={ Share } alt="btn share" />
      </button>
      <p hidden={ isHidden }>Link copiado!</p>
      <button
        onClick={ handleFavorite }
        type="button"
      >
        <img data-testid="favorite-btn" src={ btnFavorite === 'isFavorite' ? BlackHeart : Heart } alt="btn Fav" />
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
        {btnState}
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
