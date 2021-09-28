import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import copy from 'clipboard-copy';
import { foodAPIRequest, cocktailsAPIRequest } from '../services/APIrequest';
import Loading from '../components/Loading';
import Share from '../images/shareIcon.svg';
import Heart from '../images/whiteHeartIcon.svg';
import BlackHeart from '../images/blackHeartIcon.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DetalheBebidas = ({ match: { params: { id }, url }, history }) => {
  const [drinkDetail, setDrinkDetail] = useState([]);
  const [foodsDetails, setFoodsDetails] = useState([]);
  const [btnState, setBtnState] = useState('Iniciar Receita');
  const [btnFavorite, setBtnFavorite] = useState('isNotFavorite');
  const [isHidden, setIsHidden] = useState(true);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

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

  const measurementKeys = keysOfApi.filter((chave) => chave.includes('strMeasure'))
    .map((measure) => drinkDetail[measure])
    .filter((measure) => measure !== null && measure !== '');

  const ingredientsKeys = keysOfApi.filter((chave) => chave.includes('strIngredient'));
  const ingredientsValues = ingredientsKeys
    .map((ingredient) => drinkDetail[ingredient])
    .filter((ingredient) => ingredient !== null);

  const {
    strDrink,
    strCategory,
    strInstructions,
    strDrinkThumb,
    strAlcoholic } = drinkDetail;

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ cocktails: {}, meals: {} }));
    }
    const test = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const chaves = Object.keys(test.cocktails).some((chave) => chave === id);
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

  const handleClick = () => {
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ cocktails: { [id]: [] } }));
    }
    const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorage.setItem('inProgressRecipes', JSON
      .stringify({ ...recipes, cocktails: { ...recipes.cocktails, [id]: [] } }));
    history.push(`/bebidas/${id}/in-progress`);
  };

  const obj = {
    id,
    type: 'bebida',
    area: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
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
        <img
          data-testid="favorite-btn"
          src={ btnFavorite === 'isFavorite' ? BlackHeart : Heart }
          alt="btn Fav"
        />
      </button>
      <p data-testid="recipe-title">{strDrink}</p>
      <p data-testid="recipe-category">{strCategory}</p>
      <p data-testid="recipe-category">{strAlcoholic}</p>
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
              .map((measurement, i) => (
                <li
                  data-testid={ `${i}-ingredient-name-and-measure` }
                  key={ i }
                >
                  { measurement }
                </li>))}
          </ul>
        </div>
      </section>
      <p data-testid="instructions">{strInstructions}</p>
      <Slider { ...settings }>
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
              <p data-testid={ `${i}-recomendation-title` }>{strMeal}</p>
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

DetalheBebidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default DetalheBebidas;
