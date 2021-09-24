import React, { useContext } from 'react';
import RecipesContext from '../context/index';

function FoodDetails() {
  const { data, id } = useContext(RecipesContext);
  const foodFiltered = data.filter((element) => element.idMeal === id);
  // id 52771
  const filterIngredient = [];
  const filtersTrMeasure = [];

  console.log(foodFiltered);

  for (let i = 1; i <= 100; i += 1) {
    foodFiltered.filter((item) => {
      if (item[`strIngredient${i}`]) filterIngredient.push(item[`strIngredient${i + 1}`]);
      return null;
    });
  }

  for (let i = 1; i <= 100; i += 1) {
    foodFiltered.filter((item) => {
      if (item[`strIngredient${i}`]) filtersTrMeasure.push(item[`strMeasure${i + 1}`]);
      return null;
    });
  }

  return (
    <div>
      {
        foodFiltered
          .map(({
            strMealThumb,
            strArea,
            strCategory,
            idMeal,
            strInstructions,
            strYoutube,
            strMeal,
          }, i) => (
            <div key={ idMeal }>
              <img
                src={ strMealThumb }
                alt={ strMealThumb }
                data-testid="recipe-photo"
                width="50"
              />
              <div>
                <p data-testid="recipe-title">{ strArea }</p>
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
                width="425"
                height="350"
                src={ strYoutube.replace('watch?v=', 'embed/') }
                title={ strMeal }
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

export default FoodDetails;
