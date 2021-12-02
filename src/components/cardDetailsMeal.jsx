import React, { useState, useEffect /* useLocation */ } from 'react';
import { useHistory } from 'react-router';
import clipboardCopy from 'clipboard-copy';
import Loading from './loadingComponent';
import RecomendationCardDrinks from './recomendationCardDrinks';
import FavoriteButton from './FavoriteButton';
// const copy = require('clipboard-copy');

const CardDetailsMeal = (id) => {
  // console.log(clipboardCopy);
  const history = useHistory();
  const [produto, setProduto] = useState();
  const [copiado, setCopiado] = useState('');
  useEffect(() => {
    console.log(history);
    const fetchDetails = async () => {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id.props}`;
      const results = await fetch(endpoint);
      const { meals } = await results.json();
      setProduto(meals[0]);
    };
    fetchDetails();
  }, []);

  if (!produto) {
    return <Loading />;
  }
  function filtrarIngredients() {
    const ingredientesAndMensuresKeys = Object.keys(produto);
    const ingredientes = [];
    for (let i = Number('9'); i < Number('28'); i += 1) {
      if (ingredientesAndMensuresKeys[i].includes('Ingredient')
      && produto[ingredientesAndMensuresKeys[i]] !== '') {
        ingredientes.push(produto[ingredientesAndMensuresKeys[i]]);
      }
    }
    return ingredientes;
  }

  function filterMensures() {
    const ingredientesAndMensuresKeys = Object.keys(produto);
    const mensures = [];
    for (let i = Number('29'); i < Number('48'); i += 1) {
      if (ingredientesAndMensuresKeys[i].includes('Measure')
      && produto[ingredientesAndMensuresKeys[i]] !== ''
      && produto[ingredientesAndMensuresKeys[i]] !== ' ') {
        mensures.push(produto[ingredientesAndMensuresKeys[i]]);
      }
    }
    return mensures;
  }

  function copyText() {
    const { pathname } = history.location;
    clipboardCopy(`http://localhost:3000${pathname}`);
    // console.log(text);
    setCopiado('Link saved!');
  }

  return (
    <div className="details">
      <div className="details-header">
        <h1 data-testid="recipe-title">
          {produto.strMeal}
        </h1>
        <h4 data-testid="recipe-category">
          {produto.strCategory}
        </h4>
        <img
          src={ produto.strMealThumb }
          alt={ produto.strMeal }
          data-testid="recipe-photo"
        />
      </div>
      <ul>
        <h3>
          Ingredients
        </h3>
        {filtrarIngredients().map((ingrediente, index) => (
          <li key={ ingrediente } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${index}: ${ingrediente}`}
          </li>
        )) }
      </ul>
      <ul>
        <h3>
          Measures
        </h3>
        {filterMensures().map((mensure, index) => (
          <li key={ mensure } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${index}: ${mensure}`}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">
        {produto.strInstructions}
      </p>
      {/* <StartRecipeButton
        bebidasORcomidas="comidas"
        id={ id.props }
        mealOrDrink="meals"
        filterIngredients={ filtrarIngredients() }
      /> */}
      <div>
        <button
          className="details-btn"
          type="button"
          onClick={ () => history.push('../comidas') }
        >
          Return
        </button>
        <button
          className="details-btn"
          type="button"
          data-testid="share-btn"
          onClick={ () => copyText() }
        >
          Share recipe
        </button>
        <FavoriteButton recipeDetails={ produto } />
        <p>{copiado}</p>
      </div>
      {/* <h2>Goes well with:</h2>
      <RecomendationCardDrinks data-testid="recomendation-card" /> */}
    </div>
  );
};

export default CardDetailsMeal;
