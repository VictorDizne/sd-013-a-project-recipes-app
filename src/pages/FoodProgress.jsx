import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import LikeButton from '../components/LikeButton';
import ShareButton from '../components/ShareButton';
import {
  addIngredientInProgressRecipe,
  removeIngredientInProgressRecipe,
  getIngredientsList } from '../services/localStorageFunctions';
import { fetchFoodDetails } from '../services/fetchRecipes';

function FoodProgress() {
  const [foodRecipeDetails, setFoodRecipeDetails] = useState({});
  const [ingredientsChecked, setIngredientsChecked] = useState(0);
  const [ingredientsList, setIngredientsList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchFoodDetails(id, setFoodRecipeDetails);
    getIngredientsList(id, 'comida', setIngredientsList);
  }, [id, ingredientsChecked]);

  useEffect(() => {
    setIngredientsChecked(ingredientsList.length);
  }, [ingredientsList]);

  function ingredients() {
    // pega as chaves strIngredientXX
    const keys = Object.keys(foodRecipeDetails)
      .filter((key) => key.includes('strIngredient'));
    // pega os valores das chaves (que são os ingredientes), e reotrna um array só com os ingredientes
    const inProgressIngredients = keys.map((key) => foodRecipeDetails[key]);
    // retorna só os valores que não são nulos
    return (inProgressIngredients.filter((ingredient) => ingredient !== null));
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
      <Header title="Receita em Progresso" />

      <section>
        <img
          className="recipeImage"
          src={ foodRecipeDetails.strMealThumb }
          alt="Imagem da comida"
          data-testid="recipe-photo"
        />
        <div>
          <h2>{ foodRecipeDetails.strMeal }</h2>
          <h3>{ foodRecipeDetails.strCategory }</h3>
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
              >
                <input
                  type="checkbox"
                  data-testid={ `${idx}-ingredient-step` }
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
      { mainButton }
    </div>
  );
}

export default FoodProgress;
