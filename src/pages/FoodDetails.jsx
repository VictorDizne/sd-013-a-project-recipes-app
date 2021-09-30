import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import getMealById from '../services/getDrinkId';
import ShareButton from '../pages/ShareButton';

function FoodDetails() {
  const [recipeFood, setRecipeFood] = useState([]);
  const { pathname } = useLocation();
  const { id: recipeId } = useParams();
  const history = useHistory();
  const { api, id } = history.location;

  const getRecipe = async () => {
    // if (pathname.includes('comidas'))
    const apirReturn = await getMealById(api, id);
    setRecipeFood(apirReturn);

  };

  useEffect(() => {
    getRecipe();
  }, []);

  //   const foodRecipe = async (id) => {
  //     const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  //     const { meals } = await fetch(endpoint)
  //       .then((data) => data.json());
  //     setRecipeFood(meals);
  //   };
  //   foodRecipe();
  // }, []);

  // const recipesData = [...recipeFood];

  return (
    <section>
      <div>
        <img
          data-testid="recipe-photo"
          alt="receita pronta"
        />
        <h2 data-testid="recipe-title"></h2>
        {/* <button data-testid="share-btn" type="button">Share</button> */}
        <ShareButton />
        <button data-testid="favorite-btn" type="button">Favorites</button>
        <p data-testid="recipe-category" />
        Food Details
      </div>
      <div>
        <h3>Ingredients</h3>
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


export default FoodDetails;
