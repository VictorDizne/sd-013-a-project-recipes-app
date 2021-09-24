import React, { useContext } from 'react';
import RecipesContext from '../context/index';

function DrinkDetails() {
  const { data, id } = useContext(RecipesContext);
  const drinkFiltered = data.filter((element) => element.strDrink === id);

  const filterIngredient = [];
  const filtersTrMeasure = [];

  for (let i = 1; i <= 100; i += 1) {
    drinkFiltered.filter((item) => {
      if (item[`strIngredient${i}`]) filterIngredient.push(item[`strIngredient${i + 1}`]);
      return null;
    });
  }

  for (let i = 1; i <= 100; i += 1) {
    drinkFiltered.filter((item) => {
      if (item[`strIngredient${i}`]) filtersTrMeasure.push(item[`strMeasure${i + 1}`]);
      return null;
    });
  }

  return (
    <div>
      {
        drinkFiltered
          .map(({
            strDrinkThumb,
            strAlcoholic,
            strCategory,
            idDrink,
            strInstructions,
            strVideo,
          }, i) => (
            <div key={ idDrink }>
              <img
                src={ strDrinkThumb }
                alt={ strDrinkThumb }
                data-testid="recipe-photo"
                width="50"
              />
              <div>
                <p data-testid="recipe-title">{ strAlcoholic }</p>
                <button type="button" data-testid="share-btn">Compartilhar</button>
                <button type="button" data-testid="favorite-btn">Favoritos</button>
              </div>
              <p data-testid="recipe-category">{ strCategory }</p>
              <h1>
                Ingredients
              </h1>
              {
                filterIngredient.map((item, t) => (
                  <p data-testid={ `${i}-ingredient-name-and-measure` } key={ t }>
                    { item }
                  </p>
                ))
              }
              <h1>
                Instructions
              </h1>
              <p data-testid="instructions">{ strInstructions }</p>
              <h1>
                Video
              </h1>
              <iframe
                title={ strVideo }
                width="420"
                height="345"
                src={ strVideo }
                data-testid="video"
              />
              <h1>
                Recomendadas
              </h1>
              {
                filtersTrMeasure.map((item, c) => (
                  <p data-testid={ `${i}-recomendation-card` } key={ c }>
                    { item }
                  </p>
                ))
              }
              <button type="button" data-testid="start-recipe-btn">
                Iniciar Receita
              </button>
            </div>
          ))
      }
    </div>
  );
}

export default DrinkDetails;
