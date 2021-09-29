import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { MainContext } from '../context/Provider';

export default function IngredientCard({ name, index }) {
  const history = useHistory();
  const { setByIngredients } = useContext(MainContext);
  const { pathname } = useLocation();

  const handleClick = async () => {
    setByIngredients({ bool: true, ingredient: name });
    if (pathname.includes('comidas')) history.push('/comidas');
    else history.push('/bebidas');
  };

  return (
    <button
      type="button"
      data-testid={ `${index}-ingredient-card` }
      className="card"
      onClick={ handleClick }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ pathname.includes('comidas')
          ? `https://www.themealdb.com/images/ingredients/${name}-Small.png`
          : `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png` }
        alt={ name }
        className="imgThumb"
      />
      <p data-testid={ `${index}-card-name` }>{ name }</p>
    </button>
  );
}

IngredientCard.propTypes = {
  img: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
  key: PropTypes.number,
}.isRequired;
