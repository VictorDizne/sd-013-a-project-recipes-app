import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/Context';
import * as myFunc from '../services/api';

function FoodDetailsPage({ match }) {
  const { myPage } = useContext(MyContext);
  const [details, setDetails] = useState({});

  const requestDetails = async () => {
    const { meals } = await myFunc.fetchRecipesDetails(match.params.id, 'themealdb');
    // console.log(meals)
    setDetails(meals);
  };

  const setIngredients = () => {
    const number = 20;
    for (let index = 0; index < number; index += 1) {
      console.log(details);
    }
  };

  useEffect(() => {
    if (myPage !== '') {
      requestDetails();
    }
    if (!details.length) {
      setIngredients();
    }
  }, [myPage, details]);
  if (!details.length) return <p>Loading...</p>;

  return (
    <div>
      {/* { console.log(details) } */}
      <img
        style={ { width: '50px', height: '50px' } }
        src={ details[0].strMealThumb }
        data-testid="recipe-photo"
        alt={ details[0].strMeal }
      />

      <h3
        data-testid="recipe-title"
      >
        {details[0].strMeal}
      </h3>
      <p data-testid="recipe-category">{details[0].strCategory}</p>

      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorito
      </button>

      <p data-testid="instructions">{details[0].strInstructions}</p>

      {/* <p
      //  data-testid={`${index}-ingredient-name-and-measure`}></p> */}
      {/* <video width="320" height="240" controls data-testid="video">
        <source src="https://www.youtube.com/watch?v=VVnZd8A84z4" type="video/mp4"> </source>
      </video> */}
    </div>
  );
}

export default FoodDetailsPage;
