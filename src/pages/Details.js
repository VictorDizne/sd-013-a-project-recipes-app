import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function Details() {
  // Importa do Context o state mealsOrDrinks que é um array generico que usamos para trazer as informações da API e salvar nele
  const { mealsOrDrinks, setShouldRedirect } = useContext(RecipeContext);
  const [objDetail, setObjDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const requestByID = async () => {
    const TWO_SECONDS = 2000;
    const value = history.location.pathname;
    let response = [];
    const id = value.split('s/')[1];

    if (value.includes('bebidas')) {
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const responseJson = await response.json();
      await setObjDetail(responseJson.drinks);
    }
    if (value.includes('comidas')) {
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const responseJson = await response.json();
      await setObjDetail(responseJson.meals);
    }

    setTimeout(() => {
      setLoading(false);
    }, TWO_SECONDS);
  };

  const getIngredients = () => {
    const ingredientes = Object.entries(objDetail[0]);
    const filtering = ingredientes.filter((element) => (
      element[0].includes('strIngredient') && element[1] !== null && element[1] !== ''));
    const results = filtering.map((elem, index) => (
      <li key={ elem[1] } data-testid={ `${index}-ingredient-name-and-measure` }>
        {elem[1]}
      </li>));

    return results;
  };

  const handleYoutube = () => {
    const https = objDetail[0].strYoutube.split('https://www.youtube.com/watch?v=');
    const newHttps = `https://www.youtube.com/embed/${https[1]}`;
    return newHttps;
  };

  useEffect(() => {
    requestByID();
    setShouldRedirect(false);
  }, []);

  const renderDrink = () => (
    <div>
      <h1 data-testid="recipe-category">{objDetail[0].strCategory}</h1>
      <h2 data-testid="recipe-title">{objDetail[0].strDrink}</h2>
      <img
        data-testid="recipe-photo"
        className="food-image"
        src={ objDetail[0].strDrinkThumb }
        alt={ objDetail[0].strDrink }
      />
      <div>
        <input
          type="image"
          data-testid="share-btn"
          src={ shareIcon }
          alt={ objDetail[0].strDrink }
        />
        <input
          type="image"
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
          alt={ objDetail[0].strDrink }
        />
      </div>
      <ol>
        { getIngredients() }
      </ol>
      <p data-testid="instructions">{objDetail[0].strInstructions}</p>
      <div>Recomendados</div>
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );

  const renderFood = () => (
    <div>
      <h1 data-testid="recipe-category">{objDetail[0].strCategory}</h1>
      <h2 data-testid="recipe-title">{objDetail[0].strMeal}</h2>
      <img
        data-testid="recipe-photo"
        className="food-image"
        src={ objDetail[0].strMealThumb }
        alt={ objDetail[0].strMeal }
      />
      <div>
        <input
          type="image"
          data-testid="share-btn"
          src={ shareIcon }
          alt={ objDetail[0].strMeal }
        />
        <input
          type="image"
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
          alt={ objDetail[0].strMeal }
        />
      </div>
      <ol>
        { getIngredients() }
      </ol>
      <iframe
        data-testid="video"
        width="300px"
        height="200px"
        src={ handleYoutube() }
        title="YouTube video player"
      />
      <p data-testid="instructions">{objDetail[0].strInstructions}</p>
      <div>Recomendados</div>
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );

  const render = () => {
    // Descobre se no link há informação de '/comidas' ou '/bebidas' para gerar a renderização
    const value = history.location.pathname;
    // Se no link tiver 'comidas', renderiza renderFood
    if (value.includes('comidas')) {
      return renderFood();
    }
    // Se no link tiver 'bebidas', renderiza renderDrink
    if (value.includes('bebidas')) {
      return renderDrink();
    }
  };

  if (loading) return <p>Carregando</p>;
  return (
    <div>
      {loading ? <p>Carregando</p> : render()}
    </div>
  );
}

export default Details;
