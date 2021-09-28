import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { fetchDrinksById } from '../services/bebidasApi';
import { fetchRecommendedMeals } from '../services/comidasApi';
import RecomendationCard from '../components/RecomendationCard';

const INITIAL_VALUE = 9;
const MAX_RECOMANDATION = 6;

function DrinkDetails() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [recomendation, setRecomendation] = useState([]);

  const history = useHistory();
  const historyFilter = history.location.pathname;
  const historyId = historyFilter.substr(INITIAL_VALUE);

  // solução feita a partir do repositório
  // https://github.com/tryber/sd-013-a-project-recipes-app/blob/main-group-3-requisito-28/src/components/RecipeDetailCard.jsx
  const getIngredients = (drink) => {
    const strDrink = Object.entries(drink[0]);
    const strIngredient = strDrink.filter(([key, value]) => key
      .includes('strIngredient') && value);

    const strMeasure = strDrink.filter(([key, value]) => key
      .includes('strMeasure') && value);

    return strIngredient.map((item, index) => `${item[1]} - ${strMeasure[index][1]}`);
  };

  useEffect(() => {
    const getRecipe = async () => {
      const drink = await fetchDrinksById(historyId);
      setIngredients(getIngredients(drink));
      setRecipe(drink);
    };
    getRecipe();
  }, [historyId]);

  useEffect(() => {
    const getRecomendations = async () => {
      const recommendedRecipes = await fetchRecommendedMeals();
      setRecomendation(recommendedRecipes);
    };
    getRecomendations();
  }, []);

  return (
    <div className="food-container">
      { (recipe.length === 1) && (
        <div>
          <img
            src={ recipe[0].strDrinkThumb }
            data-testid="recipe-photo"
            alt="Imagem da receita"
            width="200"
          />

          <h1 data-testid="recipe-title">{ recipe[0].strDrink }</h1>

          <button type="button" data-testid="favorite-btn">Favoritar</button>
          <button type="button" data-testid="share-btn">Compartilhar</button>

          <p data-testid="recipe-category">{ recipe[0].strAlcoholic }</p>
        </div>
      )}

      <h3>Ingredientes</h3>
      <ul>
        { ingredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { ingredient }
          </li>
        )) }
      </ul>

      <h3>Instruções</h3>
      { (recipe.length === 1)
        && <p data-testid="instructions">{ recipe[0].strInstructions }</p> }

      {/* <h3>Video</h3>
      { (recipe.length === 1)
        && recipe[0].strVideo
        && (<iframe
          width="425"
          height="350"
          src={ recipe[0].strVideo }
          title={ recipe[0].strDrink }
          data-testid="video"
        />)} */}

      { recomendation.slice(0, MAX_RECOMANDATION).map((rec, idx) => (
        <RecomendationCard
          key={ idx }
          recipe={ rec }
          idx={ idx }
          page="drinks"
        />
      ))}

      <Link to={ `/comidas/${historyId}/in-progress` } data-testid="start-recipe-btn">
        Iniciar Receita
      </Link>
    </div>
  );
}

export default DrinkDetails;

// import React, { useContext, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import RecipesContext from '../context/index';

// const INITIAL_VALUE = 9;
// const INITIAL_LOOP = 50;

// function DrinkDetails() {
//   const { DrinkGetId, setCatchDrinkId } = useContext(RecipesContext);

//   const history = useHistory();
//   const historyFilter = history.location.pathname;
//   const historyId = historyFilter.substr(INITIAL_VALUE);

//   useEffect(() => {
//     setCatchDrinkId(historyId);
//   }, []);

//   const filterIngredient = [];
//   const filtersTrMeasure = [];

//   DrinkGetId.filter((item) => {
//     for (let i = 1; i <= INITIAL_LOOP; i += 1) {
//       if (item[`strIngredient${i}`]) filterIngredient.push(item[`strIngredient${i + 1}`]);
//     }
//     return null;
//   });

//   DrinkGetId.filter((item) => {
//     for (let i = 1; i <= INITIAL_LOOP; i += 1) {
//       if (item[`strIngredient${i}`]) filtersTrMeasure.push(item[`strMeasure${i + 1}`]);
//     }
//     return null;
//   });

//   return (
//     <div>
//       {
//         DrinkGetId
//           .map(({
//             strDrinkThumb,
//             strCategory,
//             idDrink,
//             strInstructions,
//             strDrink,
//             strVideo,
//           }, i) => (
//             <div key={ idDrink }>
//               <img
//                 src={ strDrinkThumb }
//                 alt={ strDrinkThumb }
//                 data-testid="recipe-photo"
//                 width="50"
//               />
//               <p data-testid="recipe-title">{ strMeal }</p>
//               <button type="button" data-testid="share-btn">Compartilhar</button>
//               <button type="button" data-testid="favorite-btn">Favoritos</button>
//               <p data-testid="recipe-category">{ strCategory }</p>
//               <h1>
//                 Ingredients
//               </h1>
//               {
//                 filterIngredient.map((item, t) => (
//                   <p data-testid={ `${i}-ingredient-name-and-measure` } key={ t }>
//                     { item }
//                   </p>
//                 ))
//               }
//               <h1>
//                 Instructions
//               </h1>
//               <p data-testid="instructions">{ strInstructions }</p>
//               <h1>
//                 Video
//               </h1>
//               <iframe
//                 title={ strVideo }
//                 width="420"
//                 height="345"
//                 src={ strVideo ? strVideo.replace('watch?v=', 'embed/') : '' }
//                 data-testid="video"
//               />
//               <h1>
//                 Recomendadas
//               </h1>
//               {
//                 filtersTrMeasure.map((item, c) => (
//                   <p data-testid={ `${i}-recomendation-card` } key={ c }>
//                     { item }
//                   </p>
//                 ))
//               }
//               <button type="button" data-testid="start-recipe-btn">
//                 Iniciar Receita
//               </button>
//             </div>
//           ))
//       }
//     </div>
//   );
// }

// export default DrinkDetails;
