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
  const { meals } = payload;
  if (!meals[id]) {
    meals[id] = [];
  }
  const updated = { ...payload, meals };
  localStorage.setItem('inProgressRecipes', JSON.stringify(updated));
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
  const [isDone, setIsDone] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const initialRender = useRef(false);
  const styleBtn = {
    position: 'fixed',
    bottom: '0px',
  };

  async function checkDoneRecipes() {
    const data = await fetchDetails(location.pathname, id);
    const ten = 10;
    const date = new Date().toJSON().slice(0, ten).replace(/-/g, '/');
    console.log(data);
    const doneRecipe = {
      id: data.idMeal,
      type: 'comida',
      area: data.strArea,
      category: data.strCategory,
      alcoholicOrNot: '',
      name: data.strMeal,
      image: data.strMealThumb,
      doneDate: date,
      tags: (data.strTags === null ? [] : data.strTags.split(',')),
    };
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    await localStorage.setItem(
      'doneRecipes', JSON.stringify([...doneRecipes, doneRecipe]),
    );
    history.push('/receitas-feitas');
  }

  function done() {
    checkDoneRecipes();
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
              src={ `${recipe.strMealThumb}/preview` }
              alt={ recipe.strMeal }
            />
            <h3 data-testid="recipe-title">{recipe.strMeal}</h3>
            <ShareButton id={ id } type="comidas" />
            <FavoriteButton id={ id } type="comida" recipe={ recipe } />
            <h4 data-testid="recipe-category">{recipe.strCategory}</h4>
            <p data-testid="instructions">{recipe.strInstructions}</p>
            <CheckIngredients
              recipe={ recipe }
              inProgressRecipes={ inProgressRecipes }
              id={ id }
              handleCheckBox={ handleCheckBox }
            />
            <button
              type="button"
              data-testid="finish-recipe-btn"
              style={ styleBtn }
              onClick={ done }
              disabled={ !isDone }
            >
              Finalizar Receita
            </button>
          </>
        )
      }
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
