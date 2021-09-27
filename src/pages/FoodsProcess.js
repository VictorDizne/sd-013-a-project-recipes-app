import React, { useState, useEffect, useContext } from 'react';
import Context from '../Context/Context';
import Button from '../components/Button';

function FoodsProcess() {
  const [details, setDetails] = useState();
  const { id } = useContext(Context);
  useEffect(() => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    async function fetchResult() {
      const result = await (await fetch(url)).json();
      setDetails(result.meals);
    }
    fetchResult();
  }, []);

  if (!details) return <h3>Loading...</h3>;
  return (
    <section>
      {console.log(details)}
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
    </section>
  );
}

export default FoodsProcess;
