import React, { useState, useEffect /* useLocation */ } from 'react';
import { useHistory } from 'react-router';
import clipboardCopy from 'clipboard-copy';
import Loading from './loadingComponent';
import RecomendationCardDrinks from './recomendationCardDrinks';
import StartRecipeButton from './StartRecipeButton';

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
    setCopiado('Link copiado!');
  }

  return (
    <div className="container">
      <button type="button" data-testid="share-btn" onClick={ () => copyText() }>
        Compartilhar receita
      </button>
      <p>{copiado}</p>
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
        width="200px"
      />
      <ul>
        <h3>
          Ingredientes
        </h3>
        {filtrarIngredients().map((ingrediente, index) => (
          <li key={ ingrediente } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${index}: ${ingrediente}`}
          </li>
        )) }
      </ul>
      <ul>
        <h3>
          Medidas
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

      <video data-testid="video" type="video/mp4" width="320" height="240" controls>
        <track kind="captions" { ...id } />
      </video>
      <StartRecipeButton
        bebidasORcomidas="comidas"
        id={ id.props }
        mealOrDrink="meals"
        filterIngredients={ filtrarIngredients() }
      />

      <button type="button" data-testid="favorite-btn">
        Favoritar receita
      </button>
      <RecomendationCardDrinks data-testid="recomendation-card" />
    </div>
  );
};

export default CardDetailsMeal;
