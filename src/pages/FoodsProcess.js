import React, { useState, useEffect } from 'react';
import Button from '../components/Button';

function FoodsProcess() {
  const [details, setDetails] = useState();
  useEffect(() => {
    const id = 15300;
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    async function fetchResult() {
      const result = await (await fetch(url)).json();
      console.log(result, 'result');
      setDetails(result.meals);
    }
    fetchResult();
  }, []);

  return (
    <section>
      <img src={ details.srtMealThumb } alt="" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{ details.srtMeal }</h2>
      <Button data-testid="share-btn">Compartilhar</Button>
      <Button data-testid="favorite-btn">Favoritar</Button>
      {/* <table data-testid="${index}-ingredient-name-and-measure">
      </table> */}
      <p data-testid="instructions">{ details.srtInstructions }</p>
      <source src={ details.srtYoutube } type="video/mp4" data-testid="video" />
      <p data-testid={ `${details.srtMeal}-recomendation-card` }>Card</p>
      <Button data-testid="start-recipe-btn">Iniciar</Button>

      <h1>DrinksProcess</h1>
    </section>
  );
}

export default FoodsProcess;
