import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchDetails, fetchRecipes } from '../services';
// import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Recomendations from '../components/Recomendations';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

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
  const { meals } = payload;
  if (!meals[id]) {
    meals[id] = [];
  }
  const updated = { ...payload, meals };
  localStorage.setItem('inProgressRecipes', JSON.stringify(updated));
}

function MealDetails({ match: { params: { id } } }) {
  const [isReady, setIsReady] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [recomendations, setRecomendations] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState({});
  const location = useLocation();
  const history = useHistory();
  const initialRender = useRef(false);
  const loading = <p>Loading.......</p>;
  const styleBtn = {
    position: 'fixed',
    bottom: '0px',
  };

  function startRecipe() {
    saveOnStorage(id);
    history.push(`/comidas/${id}/in-progress`);
  }

  useEffect(() => {
    const fetchRecipe = async () => {
      const data = await fetchDetails(location.pathname, id);
      setRecipe(data);
    };
    const fetchRecomendations = async () => {
      const data = await fetchRecipes('', 'name', '/bebidas');
      setRecomendations(data.slice(0, MAX_RECOMENDATION));
    };
    fetchRecipe();
    fetchRecomendations();
  }, [id, location.pathname]);

  useEffect(() => {
    const checkStorage = async () => {
      const data = await getStorage();
      setInProgressRecipes(data.meals);
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
        src={ `${recipe.strMealThumb}/preview` }
        alt={ recipe.strMeal }
      />
      <h3 data-testid="recipe-title">{recipe.strMeal}</h3>
      <ShareButton id={ id } type="comidas" />
      <FavoriteButton id={ id } type="comida" recipe={ recipe } />
      <h4 data-testid="recipe-category">{recipe.strCategory}</h4>
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
      <iframe data-testid="video" src={ recipe.strYoutube } title="Video" />
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

MealDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MealDetails;
