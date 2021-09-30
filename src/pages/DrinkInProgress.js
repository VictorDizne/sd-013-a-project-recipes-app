import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchDetails, getStorage } from '../services';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import CheckIngredients from '../components/CheckIngredients';

function initStorage(id) {
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

function saveOnStorage(number, id) {
  const payload = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { cocktails } = payload;
  if (!cocktails[id]) {
    cocktails[id] = [];
  }
  cocktails[id] = [...cocktails[id], number];

  const updated = { ...payload, cocktails };
  localStorage.setItem('inProgressRecipes', JSON.stringify(updated));
  return cocktails;
}

function DrinkInProgress({ match: { params: { id } } }) {
  const [isReady, setIsReady] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [inProgressRecipes, setInProgressRecipes] = useState({});
  const [isDone, setIsDone] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const initialRender = useRef(false);
  const styleBtn = {
    position: 'fixed',
    bottom: '0px',
  };

  function done() {
    history.push('/receitas-feitas');
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
      const data = await getStorage('inProgressRecipes');
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

  useEffect(() => {
    let checkedIngredients = 0;
    const arrayIngredients = [];
    Object.entries(recipe).forEach(([key, value]) => {
      if (key.includes('strIngredient') && value) {
        const index = Number(key.split('strIngredient')[1]) - 1;
        arrayIngredients.push(index);
        const checked = inProgressRecipes[id].includes(`${index + 1}`);
        if (checked) checkedIngredients += 1;
      }
      return null;
    });
    if (arrayIngredients.length > 0) {
      setIsDone(arrayIngredients.length === checkedIngredients);
    }
  }, [inProgressRecipes, id, recipe]);

  return (
    <div>
      {
        isReady
        && (
          <>
            <img
              data-testid="recipe-photo"
              src={ `${recipe.strDrinkThumb}/preview` }
              alt={ recipe.strDrink }
            />
            <h3 data-testid="recipe-title">{recipe.strDrink}</h3>
            <ShareButton id={ id } type="bebidas" />
            <FavoriteButton id={ id } type="bebida" recipe={ recipe } />
            <h4 data-testid="recipe-category">{recipe.strAlcoholic}</h4>
            <CheckIngredients
              recipe={ recipe }
              inProgressRecipes={ inProgressRecipes }
              id={ id }
              handleCheckBox={ handleCheckBox }
            />
            <p data-testid="instructions">{recipe.strInstructions}</p>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              style={ styleBtn }
              disabled={ !isDone }
              onClick={ done }
            >
              Finalizar Receita
            </button>
          </>)
      }
    </div>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinkInProgress;
