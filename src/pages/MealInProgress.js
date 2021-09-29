import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchDetails } from '../services';
// import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

function initStorage(id) {
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

function getStorage() {
  const payload = localStorage.getItem('inProgressRecipes');
  if (payload === null) {
    localStorage
      .setItem('inProgressRecipes', JSON.stringify({ cocktails: {}, meals: {} }));
  }
  return JSON.parse(localStorage.getItem('inProgressRecipes'));
}

function saveOnStorage(number, id) {
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
  meals[id] = [...meals[id], number];

  const updated = { ...payload, meals };
  localStorage.setItem('inProgressRecipes', JSON.stringify(updated));
  return meals;
}

function MealInProgress({ match: { params: { id } } }) {
  const [isReady, setIsReady] = useState(false);
  const [recipe, setRecipe] = useState({});
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
    history.push(`/comidas/${id}/in-progress`);
  }

  function handleCheckBox({ target }) {
    const { name, checked } = target;
    if (checked) {
      setInProgressRecipes(saveOnStorage(name, id));
    }
  }

  useEffect(() => {
    initStorage(id);
    const fetchRecipe = async () => {
      const data = await fetchDetails(location.pathname, id);
      setRecipe(data);
    };
    fetchRecipe();
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
      {/* <input type="image" data-testid="share-btn" src={ shareIcon } alt="Share" />
      <input
        type="image"
        data-testid="favorite-btn"
        src={ whiteHeartIcon }
        alt="Favorite Icon"
      /> */}
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
                  data-testid={ `${index}-ingredient-step` }
                  style={ { textDecoration: inProgressRecipes[id]
                    .includes(`${index + 1}`) ? 'line-through' : '' } }
                >
                  <input
                    name={ index + 1 }
                    type="checkbox"
                    id="ingredient"
                    onChange={ handleCheckBox }
                    checked={ inProgressRecipes[id].includes(`${index + 1}`) }
                  />
                  {`${value} - ${recipe[`strMeasure${index + 1}`]}`}
                </label>);
            }
            return null;
          })
        }
      </div>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        style={ styleBtn }
        onClick={ startRecipe }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

MealInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MealInProgress;
