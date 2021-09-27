import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import appContext from '../contexts/appContext';
import FavoriteButton from '../components/favoriteButton';
import ShareButton from '../components/shareButton';

function ProcessDrink({ props }) {
  const [drink, setDrink] = useState({});
  const { getIngredients } = useContext(appContext);
  const { id } = useParams();

  useEffect(() => {
    const getDrink = async () => {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(URL);
      const { drinks } = await response.json();
      setDrink(drinks[0]);
      console.log(drinks);
    };
    getDrink();
  }, [id]);

  const finishRecipe = () => {
    props.history.push('/receitas-feitas');
  };

  const checkDisable = () => {
    const allCheckBox = document.querySelectorAll('.checkbox');
    console.log(allCheckBox);
  };

  const onChangeIngredient = (ingredientName) => {
    console.log(ingredientName);
  };

  const { ingredients } = getIngredients(drink);
  return (
    <div>
      <h1>bebida em processo</h1>
      <img
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
        alt=""
      />
      <h2 data-testid="recipe-title">{ drink.strDrink }</h2>
      <h3 data-testid="recipe-category">{ drink.strCategory }</h3>
      {ingredients.map((ingredient, index) => (
        <label
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ ingredient }
        >
          { ingredient }
          <input
            className="checkbox"
            type="checkbox"
            id={ ingredient }
            value={ ingredient }
            name="ingredients"
            onChange={ (e) => onChangeIngredient(e.target.value) }
          />
        </label>
      ))}
      <p data-testid="instructions">{ drink.strInstructions }</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ checkDisable }
        onClick={ finishRecipe }
      >
        Finalizar Receita
      </button>
      <ShareButton data-testid="share-btn" />
      <FavoriteButton data-testid="favorite-btn" drink={ drink } />
    </div>
  );
}

ProcessDrink.propTypes = {
  props: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  }).isRequired,
};

export default ProcessDrink;
