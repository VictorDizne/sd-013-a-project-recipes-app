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
    if (JSON.parse(localStorage.getItem('inProgressRecipes')) && JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[id]) {
      setCheckedState(JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[id]);
    }
    getAPIdataID(id, setDrinkDetail, 'drink');
    btnFavoritar(id, setBtnFavorite);
  }, []);

  useEffect(() => {
    changeLocalRecipe(id, 'cocktails', 'meals');
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
    const favBtn = (btnFavorite === 'isFavorite')
      ? setBtnFavorite('isNotFavorite') : setBtnFavorite('isFavorite');
    return favBtn;
  };

  const handleShare = () => {
    const url = `/bebidas/${id}`;
    copy(`http://localhost:3000${url}`);
    setIsHidden(false);
  };

  const receitasIngMeas = () => {
    const ingredients = ingredientMeasures(drinkDetail, 'ingredientes');
    const measures = ingredientMeasures(drinkDetail, 'medida');

    const receitas = ingredients.map((ingredient, i) => `${ingredient} - 
      ${measures[i] === undefined ? '' : measures[i]}`);
    return receitas;
  };

  const changeCheckBox = ({ target: { name, checked } }) => {
    const localGet = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (localGet && localGet.cocktails[id]) {
      const ingredientsList = localGet.cocktails[id];
      if (checked) {
        setCheckedState([...checkedState, name]);
        localGet.cocktails[id] = [...ingredientsList, name];
      } else {
        const listFilter = ingredientsList.filter((ingredient) => ingredient !== name);
        localGet.cocktails[id] = listFilter;
        setCheckedState(listFilter);
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(localGet));
    }
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
              // onChange={ changeCheckBox }
            >
              <input
                onChange={ changeCheckBox }
                name={ ingredient }
                type="checkbox"
                checked={ checkedState.includes(ingredient) }
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
