import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
// import RecommendedCard from '../components/RecommendedCard';
import { fetchDetails } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function MealDetails({ match: { params: { id } } }) {
  const [isReady, setIsReady] = useState(false);
  const [recipe, setRecipe] = useState({});
  const location = useLocation();
  const initialRender = useRef(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      const data = await fetchDetails(location.pathname, id);
      setRecipe(data);
    };
    fetchRecipe();
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      setIsReady(true);
    } else {
      initialRender.current = true;
    }
  }, [recipe]);

  if (!isReady) return <p>Loading...</p>;

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipe[0].strMealThumb }
        alt={ recipe[0].strMeal }
      />
      <h3 data-testid="recipe-title">{recipe[0].strMeal}</h3>
      <input type="image" data-testid="share-btn" src={ shareIcon } alt="Share" />
      <input
        type="image"
        data-testid="favorite-btn"
        src={ whiteHeartIcon }
        alt="Favorite Icon"
      />
      <h4 data-testid="recipe-category">{recipe[0].strCategory}</h4>
      <div>
        {
          recipe.map((meal) => (
            Object.keys(meal).forEach((key, index) => {
              if (key.includes('strIngredient')) {
                console.log(meal[key]);
                return (
                  <label
                    htmlFor="ingredient"
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    <input type="checkobox" id="ingredient" />
                    {meal[key]}
                  </label>);
              }
            })
          ))
        }
      </div>
      <p data-testid="instructions">{recipe[0].strInstructions}</p>
      <iframe data-testid="video" src={ recipe[0].strYoutube } title="Video" />
      {/* <RecommendedCard testid={ `${index}-recomendation-card` } /> */}
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );
}

export default MealDetails;
