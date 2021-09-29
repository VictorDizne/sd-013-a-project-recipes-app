import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchDetails, fetchRecipes } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Recomendations from '../components/Recomendations';

const MAX_RECOMENDATION = 6;

function getStorage() {
  const payload = localStorage.getItem('inProgressRecipes');
  if (payload === null) {
    localStorage
      .setItem('inProgressRecipes', JSON.stringify({ cocktails: {}, meals: {} }));
  }
  return JSON.parse(localStorage.getItem('inProgressRecipes'));
}

function checkProgress(id, recipes) {
  const recipesIds = Object.keys(recipes);
  if (recipesIds.includes(id)) return true;
  return false;
}

function saveOnStorage(id) {
  if (localStorage.getItem('inProgressRecipes') === null) {
    localStorage.setItem(
      'inProgressRecipes', JSON.stringify({ meals: {}, cocktails: {} }),
    );
  }
  const payload = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { cocktails } = payload;
  if (!cocktails[id]) {
    cocktails[id] = [];
  }

  const updated = { ...payload, cocktails };
  localStorage.setItem('inProgressRecipes', JSON.stringify(updated));
}

function DrinkDetails({ match: { params: { id } } }) {
  const [isReady, setIsReady] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [recomendations, setRecomendations] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState({});
  const location = useLocation();
  const history = useHistory();
  const initialRender = useRef(false);
  const loading = <p>Loading...</p>;

  const styleBtn = {
    position: 'fixed',
    bottom: '0px',
  };

  function startRecipe() {
    saveOnStorage(id);
    history.push(`/bebidas/${id}/in-progress`);
  }

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
    const checkStorage = async () => {
      const data = await getStorage();
      setInProgressRecipes(data.cocktails);
    };
    checkStorage();
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
        src={ `${recipe.strDrinkThumb}/preview` }
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
            if (key.includes('strIngredient') && value) {
              const index = Number(key.split('strIngredient')[1]) - 1;
              console.log(JSON.stringify(inProgressRecipes));
              return (
                <label
                  htmlFor="ingredient"
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${value} - ${recipe[`strMeasure${index + 1}`]}`}
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
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ styleBtn }
        onClick={ startRecipe }
      >
        {checkProgress(id, inProgressRecipes)
          ? 'Continuar Receita' : 'Iniciar Receita'}
      </button>
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
