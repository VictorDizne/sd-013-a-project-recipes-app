import React, { useEffect, useState } from 'react';

function DrinksProcess() {
  const [, setDetails] = useState();
  useEffect(() => {
    const id = 15300;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    async function fetchResult() {
      const result = await (await fetch(url)).json();
      console.log(result, 'result');
      setDetails(result.drinks);
    }
    fetchResult();
  }, []);

  return (
    <section>
      {/*  <img alt="" data-testid="recipe-photo" />
        <h2 data-testid="recipe-title"></h2>
        <Button data-testid="share-btn">Compartilhar</Button>
        <Button data-testid="favorite-btn">Favoritar</Button>
        <h3 data-testid="${index}-ingredient-name-and-measure"></h3>
        <p data-testid="instructions"></p>
        <video data-testid="video"></video>
        <p data-testid="${index}-recomendation-card"></p>
        <Button data-testid="start-recipe-btn"></Button> */}

      <h1>DrinksProcess</h1>
    </section>
  );
}

export default DrinksProcess;
