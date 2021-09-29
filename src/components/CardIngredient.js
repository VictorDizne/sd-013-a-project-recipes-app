import React from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';

function CardIngredient({ index, IngredientName, isMeal }) {
  // const history = useHistory();

  // const FilterByIngredient = () => {
  //   history.push(HOME COM COMIDAS/BEBIDAS FILTRADAS PELO INGREDIENTE SELECIONADO);
  // };

  return (

    <button
      type="button"
      // onClick={ FilterByIngredient }
      data-testid={ `${index}-ingredient-card` }
    >

      <div className="recipe-card">
        <img
          src={
            isMeal ? `https://www.themealdb.com/images/ingredients/${IngredientName}-Small.png`
              : `https://www.thecocktaildb.com/images/ingredients/${IngredientName}-Small.png`
          }
          alt={ IngredientName }
          data-testid={ `${index}-card-img` }
          style={ { width: '100vw', maxWidth: '500px' } }
        />

        <div data-testid={ `${index}-card-name` }>
          {IngredientName}
        </div>
      </div>

    </button>
  );
}

CardIngredient.propTypes = {
  index: PropTypes.number.isRequired,
  isMeal: PropTypes.bool.isRequired,
  IngredientName: PropTypes.string.isRequired,
};

export default CardIngredient;
