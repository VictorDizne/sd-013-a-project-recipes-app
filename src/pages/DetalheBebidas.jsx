import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import copy from 'clipboard-copy';
import Loading from '../components/Loading';
import Share from '../images/shareIcon.svg';
import Heart from '../images/whiteHeartIcon.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BlackHeart from '../images/blackHeartIcon.svg';
/* import Details from '../components/Details'; */
import {
  btnContinuar,
  btnFavoritar,
  ingredientMeasures,
  changeLocalRecipe,
  changeLocalFavorite,
  getAPIdataID,
  alimentosSugestions } from '../services/funcAuxDetails';

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
    alimentosSugestions(setFoodsDetails, 'meals');
    getAPIdataID(id, setDrinkDetail, 'drink');

    btnContinuar(id, setBtnState);
    btnFavoritar(id, setBtnFavorite);
  }, []);

  const {
    strDrink,
    strCategory,
    strInstructions,
    strDrinkThumb,
    strAlcoholic } = drinkDetail;

  const handleRecipe = () => {
    changeLocalRecipe(id, 'cocktails', 'meals');
    history.push(`/comidas/${id}/in-progress`);
  };

  const favInfo = {
    id,
    type: 'bebida',
    area: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };
  const handleFavorite = () => {
    changeLocalFavorite(favInfo, btnFavorite, setBtnFavorite, id);
  };

  const handleShare = () => {
    copy(`http://localhost:3000${url}`);
    setIsHidden(false);
  };

  return (drinkDetail.length === 0 && foodsDetails.length === 0) ? <Loading /> : (
  /*  <Details
      alimentoDetail={ drinkDetail }
      opostoDetails={ foodsDetails }
      tipo="cocktails"
      id={ id }
      btnState={ btnState }
      setBtnState={ setBtnState }
      btnFavorite={ btnFavorite }
      setBtnFavorite={ setBtnFavorite }
      isHidden={ isHidden }
      handleRecipe={ handleRecipe }
      handleFavorite={ handleFavorite }
      handleShare={ handleShare }
    /> */
    <div>
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
            {ingredientMeasures(drinkDetail, 'ingredientes')
              .map((ingredient, i) => (
                <li
                  data-testid={ `${i}-ingredient-name-and-measure` }
                  key={ i }
                >
                  { ingredient }
                </li>))}
          </ul>
          <ul>
            {ingredientMeasures(drinkDetail, 'medida')
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
        onClick={ handleRecipe }
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
