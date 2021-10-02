import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import LikeButton from '../components/LikeButton';
import ShareButton from '../components/ShareButton';
import {
  addIngredientInProgressRecipe,
  removeIngredientInProgressRecipe,
  getIngredientsList,
  setDoneRecipe } from '../services/localStorageFunctions';
import { fetchDrinkDetails } from '../services/fetchRecipes';

function DrinkProgress() {
  const [drinkRecipeDetails, setDrinkRecipeDetails] = useState({});
  const [ingredientsChecked, setIngredientsChecked] = useState(0);
  const [ingredientsList, setIngredientsList] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchDrinkDetails(id, setDrinkRecipeDetails);
    getIngredientsList(id, 'bebida', setIngredientsList);
  }, [id, ingredientsChecked]);

  useEffect(() => {
    if (ingredientsList) {
      setIngredientsChecked(ingredientsList.length);
    }
  }, [ingredientsList]);

  function ingredients() {
    // pega as chaves strIngredientXX
    const keys = Object.keys(drinkRecipeDetails)
      .filter((key) => key.includes('strIngredient'));
    // pega os valores das chaves (que são os ingredientes), e reotrna um array só com os ingredientes
    const inProgressIngredients = keys.map((key) => drinkRecipeDetails[key]);
    // retorna só os valores que não são nulos
    return (inProgressIngredients.filter((ingredient) => ingredient !== null));
  }

  // faz a mesma coisa da função de cima, porém pegando as medidas agora
  const measures = () => {
    const measuresKeys = Object.keys(drinkRecipeDetails)
      .filter((key) => key.includes('strMeasure'));
    const measuresList = measuresKeys.map((measure) => drinkRecipeDetails[measure]);

    return measuresList.filter((measure) => measure !== '');
  };

  function allChecked() {
    return ingredientsChecked < ingredients().length;
  }

  const handleClickToFinish = () => {
    setDoneRecipe(drinkRecipeDetails, 'bebida');
    removeIngredientInProgressRecipe(id, 0, 'cocktails', true);
    history.push('/receitas-feitas');
  };

  const mainButton = () => (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      onClick={ handleClickToFinish }
      disabled={ allChecked() }
    >
      Finalizar Receita
    </button>
  );

  const handleChange = (target, index) => {
    const { checked } = target;
    console.log(index);
    if (checked) {
      // adiciona ingrediente ao localStorage
      target.style.textDecoration = 'line-through';
      addIngredientInProgressRecipe(id, index, 'cocktails');
      setIngredientsChecked((prevState) => prevState + 1);
    }
    if (!checked) {
      // remove ingrediente do localstorage
      target.style.textDecoration = 'none';
      removeIngredientInProgressRecipe(id, index, 'cocktails');
      setIngredientsChecked((prevState) => prevState - 1);
    }
  };

  const ingredientMeasures = measures();

  return (
    <div>
      <section>
        <img
          className="recipeImage"
          src={ drinkRecipeDetails.strDrinkThumb }
          alt="Imagem da bebida"
          data-testid="recipe-photo"
        />
        <div>
          <h2 data-testid="recipe-title">{ drinkRecipeDetails.strDrink }</h2>
          <h3 data-testid="recipe-category">{ drinkRecipeDetails.strAlcoholic }</h3>
        </div>
        <div>
          <ShareButton id={ id } type="bebida" />
          <LikeButton id={ id } recipe={ drinkRecipeDetails } />
        </div>
      </section>

      <section>
        <h3>Ingredientes</h3>
        <ul>
          {
            ingredients().map((ingredient, idx) => (
              <label
                htmlFor={ `ingredientCheck-${idx}` }
                key={ `${ingredient}-${idx}` }
                data-testid={ `${idx}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  id={ `ingredientCheck-${idx}` }
                  checked={ ingredientsList
                    && ingredientsList.some((el) => el === idx) }
                  onChange={ ((e) => handleChange(e.target, idx)) }
                />
                { ingredient }
                -
                { ingredientMeasures[idx] }
              </label>
            ))
          }
        </ul>
      </section>
      { mainButton() }
    </div>
  );
}

export default DrinkProgress;
