import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchDetails } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RecommendedCard from '../components/RecommendedCard';

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
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
      />
      <h3 data-testid="recipe-title">{recipe.strMeal}</h3>
      <input type="image" data-testid="share-btn" src={ shareIcon } alt="Share" />
      <input
        type="image"
        data-testid="favorite-btn"
        src={ whiteHeartIcon }
        alt="Favorite Icon"
      />
      <h4 data-testid="recipe-category">{recipe.strCategory}</h4>
      <div>
        {
          Object.entries(recipe).map(([key, value]) => {
            if (key.includes('strIngredient') && value) {
              const index = Number(key.split('strIngredient')[1]) - 1;
              return (
                <label
                  htmlFor="ingredient"
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  <input type="checkbox" id="ingredient" />
                  {`${value} - ${recipe[`strMeasure${index}`]}`}
                </label>);
            }
            return null;
          })
        }
      </div>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <iframe data-testid="video" src={ recipe.strYoutube } title="Video" />
      { /* Recomendados não está pronto */}
      <RecommendedCard testid="0-recomendation-card" />
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );
}

MealDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MealDetails;
