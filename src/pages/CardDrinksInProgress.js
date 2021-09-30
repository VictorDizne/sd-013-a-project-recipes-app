import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Loading from '../components/loadingComponent';

const CardDrinksInProgress = () => {
  const history = useHistory();
  const [drink, updateDrink] = useState(false);
  function getId() {
    const { pathname } = history.location;
    const id = pathname.split('/')[2];
    return id;
  }

  async function fetchDrink(id) {
    const fetchResult = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((r) => r.json())
      .then((r) => r.drinks[0]);
    updateDrink(fetchResult);
  }

  useEffect(() => {
    const id = getId();
    fetchDrink(id);
  }, []);

  if (drink === false) {
    return <Loading />;
  }
  function filtrarIngredientsDrinks() {
    const ingredientesAndMensuresDrinks = Object.keys(drink);
    const ingredientesDrinks = [];
    for (let i = Number('9'); i < Number('28'); i += 1) {
      if (ingredientesAndMensuresDrinks[i].includes('Ingredient')
      && drink[ingredientesAndMensuresDrinks[i]] !== ''
      && drink[ingredientesAndMensuresDrinks[i]] !== null) {
        ingredientesDrinks.push(drink[ingredientesAndMensuresDrinks[i]]);
      }
    }
    return ingredientesDrinks;
  }

  return (
    <div>
      {console.log(drink)}
      <img
        alt={ drink.strDrink }
        src={ drink.strDrinkThumb }
        width="150px"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ drink.strDrink }</h1>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        finalizar receita
      </button>
      <p data-testid="recipe-category">{ drink.strCategory }</p>
      <ul>
        {filtrarIngredientsDrinks().map((ingredient, index) => (
          <li key={ index }>
            <label htmlFor={ ingredient } data-testid="ingredient-step">
              {ingredient}
              <input
                type="checkbox"
                id={ ingredient }
                value={ ingredient }
              />
            </label>
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ drink.strInstructions }</p>
    </div>
  );
};

export default CardDrinksInProgress;
