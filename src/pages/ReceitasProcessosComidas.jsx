import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import Loading from '../components/Loading';
import Share from '../images/shareIcon.svg';
import Heart from '../images/whiteHeartIcon.svg';
import BlackHeart from '../images/blackHeartIcon.svg';
import {
  btnFavoritar,
  ingredientMeasures,
  changeLocalRecipe,
  changeLocalFavorite,
  getAPIdataID,
} from '../services/funcAuxDetails';

const ReceitasProcessosComidas = ({ match: { params: { id } }, history }) => {
  const [foodDetail, setfoodDetail] = useState([]);
  const [btnFavorite, setBtnFavorite] = useState('isNotFavorite');
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    getAPIdataID(id, setfoodDetail, 'food');
    btnFavoritar(id, setBtnFavorite);
  }, []);

  const {
    strMeal,
    strCategory,
    strInstructions,
    strMealThumb,
    strArea,
  } = foodDetail;

  const handleRecipe = () => {
    changeLocalRecipe(id, 'meals', 'cocktails');
    history.push('/receitas-feitas');
  };

  const favInfo = {
    id,
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };
  const handleFavorite = () => {
    changeLocalFavorite(favInfo, btnFavorite, setBtnFavorite, id);
  };

  const handleShare = () => {
    const url = `/comidas/${id}`;
    copy(`http://localhost:3000${url}`);
    setIsHidden(false);
  };

  const receitasIngMeas = () => {
    const ingredients = ingredientMeasures(foodDetail, 'ingredientes');
    const measures = ingredientMeasures(foodDetail, 'medida');

    const receitas = ingredients.map((ingredient, i) => `${ingredient} - ${measures[i]}`);
    return receitas;
  };

  // const changeCheckBox = ({ target: { name, checked } }) => {
  // const localGet = JSON.parse(localStorage.getItem('inProgressRecipes'));
  // if (localGet.length > 0) {
  // localGet.map((ingredient) => setInputs(ingredient));
  // }
  // const get = localGet.meal.[id].checked = checked
  // if (checked) {
  // localGet.meals[id] = [...localGet.meals[id], name];
  // } else {
  // const nIndex = localGet.meals[id].indexOf(name);
  // localGet.meals[id].splice(nIndex, 1);
  // }

  // localStorage.setItem('inProgressRecipes', JSON.stringify(localGet));

  return (foodDetail.length === 0) ? <Loading /> : (
    <div>
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
        className="fav"
        onClick={ handleFavorite }
        type="button"
      >
        <img
          data-testid="favorite-btn"
          src={ btnFavorite === 'isFavorite' ? BlackHeart : Heart }
          alt="btn Fav"
        />
      </button>
      <p data-testid="recipe-title">{strMeal}</p>
      <p data-testid="recipe-category">{strCategory}</p>
      <p>Ingredients</p>
      <div className="ingredients-measure">
        {receitasIngMeas()
          .map((ingredient, i) => (
            <label
              htmlFor={ ingredient }
              key={ i }
              data-testid={ `${i}-ingredient-step` }
            >
              <input
                name={ ingredient }
                className="inProcess"
                type="checkbox"
                /* onChange={ /* changeCheckBox */
              />
              { ingredient }
            </label>
          ))}
      </div>
      <p data-testid="instructions">{strInstructions}</p>
      <button
        // id={ id }
        onClick={ handleRecipe }
        className="iniciar"
        data-testid="finish-recipe-btn"
        type="button"
      >
        Finalizar Receita
      </button>
    </div>
  );
};

ReceitasProcessosComidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default ReceitasProcessosComidas;
