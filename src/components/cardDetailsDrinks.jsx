import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import clipboardCopy from 'clipboard-copy';
import Loading from './loadingComponent';
import RecomendationCardMeals from './RecomendationsCardMeals';
import StartRecipeButton from './StartRecipeButton';
import FavoriteButton from './FavoriteButton';

const CardDetailsDrinks = (id) => {
  const history = useHistory();
  const [produtoDrinks, setProdutoDrinks] = useState();
  const [copiado, setCopiado] = useState('');

  useEffect(() => {
    const fetchDetailsDrinks = async () => {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id.props}`;
      const results = await fetch(endpoint);
      const { drinks } = await results.json();
      setProdutoDrinks(drinks[0]);
    };
    fetchDetailsDrinks();
  }, []);

  if (!produtoDrinks) {
    return <Loading />;
  }
  function filtrarIngredients() {
    const ingredientesAndMensuresDrinksKeys = Object.keys(produtoDrinks);
    const ingredientesDrinks = [];
    for (let i = Number('9'); i < Number('28'); i += 1) {
      if (ingredientesAndMensuresDrinksKeys[i].includes('Ingredient')
      && produtoDrinks[ingredientesAndMensuresDrinksKeys[i]] !== null) {
        ingredientesDrinks.push(produtoDrinks[ingredientesAndMensuresDrinksKeys[i]]);
      }
    }
    return ingredientesDrinks;
  }

  function filtrarMensures() {
    const ingredientesAndMensuresDrinksKeys = Object.keys(produtoDrinks);
    const mensuresDrinks = [];
    for (let i = Number('29'); i < Number('48'); i += 1) {
      if (ingredientesAndMensuresDrinksKeys[i].includes('Measure')
      && produtoDrinks[ingredientesAndMensuresDrinksKeys[i]] !== null) {
        mensuresDrinks.push(produtoDrinks[ingredientesAndMensuresDrinksKeys[i]]);
      }
    }
    return mensuresDrinks;
  }

  function copyText() {
    const { pathname } = history.location;
    clipboardCopy(`http://localhost:3000${pathname}`);
    // console.log(text);
    setCopiado('Link copiado!');
  }

  return (
    <div>
      <button type="button" data-testid="share-btn" onClick={ () => copyText() }>
        Compartilhar receita
      </button>
      <FavoriteButton recipeDetails={ produtoDrinks } />
      <p>{copiado}</p>
      <h2 data-testid="recipe-title">
        {produtoDrinks.strDrink}
      </h2>
      <h4 data-testid="recipe-category">
        {produtoDrinks.strAlcoholic}
      </h4>
      <img
        src={ produtoDrinks.strDrinkThumb }
        alt={ produtoDrinks.strDrink }
        data-testid="recipe-photo"
        width="150px"
      />
      <ul>
        <h3>
          Ingredientes
        </h3>
        {filtrarIngredients().map((ingrediente, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${1 + index}: 
            ${ingrediente}
            `}
          </li>
        )) }
      </ul>
      <ul>
        <h3>
          Medidas
        </h3>
        {filtrarMensures().map((ingrediente, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${1 + index}: 
              ${ingrediente}
              `}
          </li>
        )) }
      </ul>
      <p data-testid="instructions">
        {produtoDrinks.strInstructions}
      </p>
      <StartRecipeButton
        bebidasORcomidas="bebidas"
        id={ id.props }
        mealOrDrink="cocktails"
        filterIngredients={ filtrarIngredients() }
      />
      <RecomendationCardMeals data-testeid="recomendation-card" />
    </div>
  );
};

export default CardDetailsDrinks;
