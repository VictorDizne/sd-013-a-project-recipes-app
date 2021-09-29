import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDebugState } from 'use-named-state';
import './Styles/Sugestions.css';

function ComponentSugestions() {
  const history = useHistory();

  const [state, setState] = useDebugState('state', []);
  const handlePage = history.location.pathname.includes('/comidas');

  useEffect(() => {
    let URL;

    if (handlePage) {
      URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    } else {
      URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    }

    fetch(URL)
      .then((response) => response.json())
      .then((response) => {
        if (handlePage) {
          setState(response.drinks);
        } else {
          setState(response.meals);
        }
      })
      .then((response) => response);
  }, []);

  const number = 6;
  const twelveArray = state.slice(0, number);

  const renderCardMeals = () => twelveArray.map((card, index) => (
    <div className="card" key={ index }>
      <h1 data-testid={ `${index}-recomendation-title` }>{card.strMeal}</h1>
      <img
        data-testid={ `${index}-recomendation-card` }
        src={ card.strMealThumb }
        alt={ card.strMeal }
        width="150px"
      />
    </div>
  ));

  const renderCardDrink = () => twelveArray.map((card, index) => (
    <div className="card" key={ index }>
      <h1 data-testid={ `${index}-recomendation-title` }>{card.strDrink}</h1>
      <img
        data-testid={ `${index}-recomendation-card` }
        src={ card.strDrinkThumb }
        alt={ card.strDrink }
        width="150px"
      />
    </div>
  ));

  return (
    <div className="sugestion-carousel">
      {handlePage ? renderCardDrink() : renderCardMeals()}
    </div>
  );
}

export default ComponentSugestions;
