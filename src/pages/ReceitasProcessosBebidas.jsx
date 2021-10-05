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

const ReceitasProcessosBebidas = ({ match: { params: { id } }, history }) => {
  const [drinkDetail, setDrinkDetail] = useState([]);
  const [btnFavorite, setBtnFavorite] = useState('isNotFavorite');
  const [isHidden, setIsHidden] = useState(true);
  const [checkedState, setCheckedState] = useState([]);

  useEffect(() => {
    getAPIdataID(id, setDrinkDetail, 'drink');
    btnFavoritar(id, setBtnFavorite);
  }, []);

  useEffect(() => {
    const localGet = JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[id];
    if (localGet.length > 0) {
      setCheckedState(localGet);
    }
    localStorage.setItem('checkedState', JSON.stringify({}));
  }, []);

  const {
    strDrink,
    strCategory,
    strInstructions,
    strAlcoholic,
    strDrinkThumb,
  } = drinkDetail;

  const handleRecipe = () => {
    changeLocalRecipe(id, 'cocktails', 'meals');
    history.push('/receitas-feitas');
  };

  const favInfo = {
    id,
    type: 'bebida',
    area: '',
    image: strDrinkThumb,
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
  };
  const handleFavorite = () => {
    changeLocalFavorite(favInfo, btnFavorite, setBtnFavorite, id);
  };

  const handleShare = () => {
    const url = `/bebidas/${id}`;
    copy(`http://localhost:3000${url}`);
    setIsHidden(false);
  };

  const receitasIngMeas = () => {
    const ingredients = ingredientMeasures(drinkDetail, 'ingredientes');
    const measures = ingredientMeasures(drinkDetail, 'medida');

    const receitas = ingredients.map((ingredient, i) => `${ingredient} - ${measures[i]}`);
    return receitas;
  };

  const changeCheckBox = ({ target: { name, checked } }) => {
    const localGet = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // const localCheckedState = JSON.parse(localStorage.getItem('checkedState'));
    if (checked) {
      localGet.cocktails[id] = [{ ...localGet.cocktails[id], [name]: true }];
      setCheckedState({ ...checkedState, [name]: true });
    } else {
      const nIndex = localGet.cocktails[id].indexOf(name);
      localGet.cocktails[id].splice(nIndex, 1);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(localGet));
    // localStorage
    //   .setItem('checkedState', JSON.stringify({ ...localCheckedState, [name]: checked }));
  };

  return (drinkDetail.length === 0) ? <Loading /> : (
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
      <p data-testid="recipe-title">{strDrink}</p>
      <p data-testid="recipe-category">{strCategory}</p>
      <p data-testid="recipe-category">{strAlcoholic}</p>
      <div className="ingredients-measure">
        {receitasIngMeas()
          .map((ingredient, i) => (
            <label
              htmlFor={ ingredient }
              key={ i }
              data-testid={ `${i}-ingredient-step` }
            >
              <input
                // id={ id }
                name={ ingredient }
                onChange={ changeCheckBox }
                type="checkbox"
                checked={ checkedState[ingredient] }
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

ReceitasProcessosBebidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default ReceitasProcessosBebidas;
