import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/header';
import LowerMenu from '../components/LowerMenu';
import appContext from '../contexts/appContext';
import { fetchByIngredient, fetchIngredients } from '../services/fetchs';

function FoodIngredientsExp() {
  const { state, setState } = useContext(appContext);
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const MAX_INGREDIENTS = 12;
      const ingredientsFetched = await fetchIngredients('themealdb');
      const filteredIngredients = ingredientsFetched
        .filter((ingredient, index) => index < MAX_INGREDIENTS);
      setIngredients(filteredIngredients);
    };
    getData();
  });

  const setFoodsByIngredient = async (ingredient) => {
    setState(await {
      ...state,
      foods: await fetchByIngredient('themealdb', ingredient),
      keyExplorer: true });
    history.push('/comidas');
  };

  return (
    <section>
      <Header name="Explorar Ingredientes de comidas" search={ false } />
      {
        ingredients.map((ingredient, index) => (
          <button
            type="button"
            key={ index }
            onClick={ () => setFoodsByIngredient(ingredient.strIngredient) }
          >
            <label
              htmlFor={ `${index}-ingredient-card` }
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                id={ `${index}-ingredient-card` }
                src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                data-testid={ `${index}-card-img` }
                alt={ `${ingredient.strIngredient}` }
              />
              <h2 data-testid={ `${index}-card-name` }>
                { ingredient.strIngredient }
              </h2>
            </label>
          </button>
        ))
      }
      <LowerMenu />
    </section>
  );
}

export default FoodIngredientsExp;
