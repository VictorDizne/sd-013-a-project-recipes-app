import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchDetails, fetchRecipes } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Recomendations from '../components/Recomendations';

const MAX_RECOMENDATION = 6;

function DrinkDetails({ match: { params: { id } } }) {
  const [isReady, setIsReady] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [recomendations, setRecomendations] = useState([]);
  const location = useLocation();
  const initialRender = useRef(false);
  const loading = <p>Loading...</p>;

  useEffect(() => {
    const fetchRecipe = async () => {
      const data = await fetchDetails(location.pathname, id);
      setRecipe(data);
    };
    const fetchRecomendations = async () => {
      const data = await fetchRecipes('', 'name', '/comidas');
      setRecomendations(data.slice(0, MAX_RECOMENDATION));
    };
    fetchRecipe();
    fetchRecomendations();
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      setIsReady(true);
    } else {
      initialRender.current = true;
    }
  }, [recipe]);

  if (!isReady) return loading;

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
      />
      <h3 data-testid="recipe-title">{recipe.strDrink}</h3>
      <input type="image" data-testid="share-btn" src={ shareIcon } alt="Share" />
      <input
        type="image"
        data-testid="favorite-btn"
        src={ whiteHeartIcon }
        alt="Favorite Icon"
      />
      <h4 data-testid="recipe-category">{recipe.strAlcoholic}</h4>
      <div>
        {
          Object.entries(recipe).map(([key, value]) => {
            console.log(`${key} - ${value}`);
            if (key.includes('strIngredient') && value) {
              const index = Number(key.split('strIngredient')[1]) - 1;
              return (
                <label
                  htmlFor="ingredient"
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${value} - ${recipe[`strMeasure${index + 1}`]}`}
                  {/* <input type="checkbox" id="ingredient" /> */}
                  {/* Podemos usar esse input checkbox quando
                  estivermos na página de progresso da receita */}
                </label>);
            }
            return null;
          })
        }
      </div>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <div>
        <Recomendations recomendations={ recomendations } />
      </div>
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinkDetails;
