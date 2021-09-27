import React, { useState, useContext, useParams } from 'react';
import appContext from '../contexts/appContext';

function ProcessDrink({ props }) {
  const [drink, setDrink] = useState({});
  const { getIngredients } = useContext(appContext);
  const { id } = useParams();

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
        src={ drink.strD }
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
      <button
        type="button"
        data-testid="share-btn"
        disabled=""
        onClick=""
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        disabled=""
        onClick=""
      >
        Favoritar
      </button>
    </div>
  );
}

export default ProcessDrink;
