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

const ReceitasProcessosBebidas = ({ match: { params: { id }, url }, history }) => {
  const [drinkDetail, setDrinkDetail] = useState([]);
  const [btnFavorite, setBtnFavorite] = useState('isNotFavorite');
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    getAPIdataID(id, setDrinkDetail, 'drink');
    btnFavoritar(id, setBtnFavorite);
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
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
  };
  const handleFavorite = () => {
    changeLocalFavorite(favInfo, btnFavorite, setBtnFavorite, id);
  };

  const handleShare = () => {
    copy(`http://localhost:3000${url}`);
    setIsHidden(false);
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
        {ingredientMeasures(drinkDetail, 'ingredientes')
          .map((ingredient, i) => (
            <label
              htmlFor={ ingredient }
              key={ i }
              data-testid={ `${i}-ingredient-step` }
            >
              <input
                type="checkbox"
              />
              { ingredient }
            </label>
          ))}
      </div>
      {ingredientMeasures(drinkDetail, 'medida')
        .map((measure, i) => (
          <label
            htmlFor={ measure }
            key={ i }
            data-testid={ `${i}-ingredient-step` }
          >
            <input
              type="checkbox"
            />
            { measure }
          </label>
        ))}
      <p data-testid="instructions">{strInstructions}</p>
      <button
        id={ id }
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
