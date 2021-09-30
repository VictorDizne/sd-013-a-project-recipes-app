import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getDrinkById from '../services/getDrinkId';

function DrinkDetails() {
  const [data, recipeDrinks, setRecipeDrinks] = useState(['']);
  const ingredients = [{ title: 1 }, { title: 2 }, { title: 3 }];
  const { id: recipeId } = useParams();

  useEffect(() => {
    const foodRecipe = async (id) => {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { meals } = await fetch(endpoint)
        .then((response) => response.json());
      setRecipeDrinks(meals);
      console.log();
    };
    foodRecipe();
  }, []);

  // const recipesData = [...recipeDrinks];
  return (
    <section>
      <div>
        <img
          data-testid="recipe-photo"
          alt="receita pronta"
        />
        <h2 data-testid="recipe-title"></h2>
        <button data-testid="share-btn" type="button">Share</button>
        <button data-testid="favorite-btn" type="button">Favorites</button>
        <p data-testid="recipe-category" />
        {ingredients.map((ingredient, index) => (
          <p
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredient.title}
          </p>
        ))}
      </div>
      <div>
        <ul>
          <li
            data-testid="`$-ingredient-name-and-measure`"
          />

        </ul>
        <p data-testid="instructions" />
        <h3>Instructions</h3>

        <div>Recomendadas</div>
        <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
      </div>
      <div>
        <iframe
          src=""
          title="video"
        />
      </div>
    </section>

  );
}

export default DrinkDetails;
