import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import LikeButton from '../components/LikeButton';
import ShareButton from '../components/ShareButton';
import {
  addIngredientInProgressRecipe,
  removeIngredientInProgressRecipe,
  getIngredientsList,
  setDoneRecipe } from '../services/localStorageFunctions';
import { fetchFoodDetails } from '../services/fetchRecipes';

function FoodProgress() {
  const [foodRecipeDetails, setFoodRecipeDetails] = useState({});
  const [ingredientsChecked, setIngredientsChecked] = useState(0);
  const [ingredientsList, setIngredientsList] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchFoodDetails(id, setFoodRecipeDetails);
    getIngredientsList(id, 'comida', setIngredientsList);
  }, [id, ingredientsChecked]);

  useEffect(() => {
    if (ingredientsList) {
      setIngredientsChecked(ingredientsList.length);
    }
  }, [ingredientsList]);

  // useEffect(() => {
  //   if (ingredientsList.lengh === ingredientsChecked) {
  //     setDisabled(false);
  //   }
  // }, [ingredientsList]);

  function ingredients() {
    // pega as chaves strIngredientXX
    const keys = Object.keys(foodRecipeDetails)
      .filter((key) => key.includes('strIngredient'));
    // pega os valores das chaves (que são os ingredientes), e reotrna um array só com os ingredientes
    const inProgressIngredients = keys.map((key) => foodRecipeDetails[key]);
    // retorna só os valores que não são nulos
    return (inProgressIngredients.filter((ingredient) => ingredient !== ''));
  }

  // faz a mesma coisa da função de cima, porém pegando as medidas agora
  const measures = () => {
    const measuresKeys = Object.keys(foodRecipeDetails)
      .filter((key) => key.includes('strMeasure'));
    const measuresList = measuresKeys.map((measure) => foodRecipeDetails[measure]);

    return measuresList.filter((measure) => measure !== '');
  };

  function allChecked() {
    return ingredientsChecked < ingredients().length;
  }

  const handleClickToFinish = () => {
    setDoneRecipe(foodRecipeDetails, 'comida');
    removeIngredientInProgressRecipe(id, 0, 'meals', true);
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
      addIngredientInProgressRecipe(id, index, 'meals');
      setIngredientsChecked((prevState) => prevState + 1);
    }
    if (!checked) {
      // remove ingrediente do localstorage
      target.style.textDecoration = 'none';
      removeIngredientInProgressRecipe(id, index, 'meals');
      setIngredientsChecked((prevState) => prevState - 1);
    }
  };

  const ingredientMeasures = measures();

  return (
    <div>
      <section>
        <img
          className="recipeImage"
          src={ foodRecipeDetails.strMealThumb }
          alt="Imagem da comida"
          data-testid="recipe-photo"
        />
        <div>
          <h2 data-testid="recipe-title">{ foodRecipeDetails.strMeal }</h2>
          <h3 data-testid="recipe-category">{ foodRecipeDetails.strCategory }</h3>
        </div>
        <div>
          <ShareButton id={ id } type="comida" />
          <LikeButton id={ id } recipe={ foodRecipeDetails } />
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

export default FoodProgress;
