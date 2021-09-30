import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/header';
import LowerMenu from '../components/LowerMenu';
import appContext from '../contexts/appContext';
import { fetchByIngredient, fetchIngredients } from '../services/fetchs';

function DrinkIngredientsExp() {
  const { state, setState } = useContext(appContext);
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const MAX_INGREDIENTS = 12;
      const ingredientsFetched = await fetchIngredients('thecocktaildb');
      const filteredIngredients = ingredientsFetched
        .filter((ingredient, index) => index < MAX_INGREDIENTS);
      setIngredients(filteredIngredients);
    };
    getData();
  });

  const setDrinksByIngredient = async (ingredient) => {
    setState(await {
      ...state,
      drinks: await fetchByIngredient('thecocktaildb', ingredient),
      key: true });
    history.push('/bebidas');
  };

  return (
    <section>
      <Header name="Explorar Ingredientes de bebidas" search={ false } />
      {
        ingredients.map((ingredient, index) => (
          <button
            type="button"
            key={ index }
            onClick={ () => setDrinksByIngredient(ingredient.strIngredient1) }
          >
            <label
              htmlFor={ `${index}-ingredient-card` }
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                id={ `${index}-ingredient-card` }
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                data-testid={ `${index}-card-img` }
                alt={ `${ingredient.strIngredient1}` }
              />
              <h2 data-testid={ `${index}-card-name` }>
                { ingredient.strIngredient1 }
              </h2>
            </label>
          </button>
        ))
      }
      <LowerMenu />
    </section>
  );
}

export default DrinkIngredientsExp;
