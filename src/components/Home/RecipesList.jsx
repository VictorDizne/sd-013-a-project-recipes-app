import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { fetchDrinksByCategory, fetchDrinksByQuery, fetchDrinksCategories,
  fetchMealByIngredient,
  fetchMealsByCategory,
  fetchDrinkByIngredient,
  fetchMealsByQuery, fetchMealsCategories } from '../../services/API';
import RecipeCard from './RecipeCard';

import './RecipeList.css';

const handleCat = ({ currentTarget: { value } }, setCat) => {
  setCat((prevState) => (prevState === value ? 'All' : value));
};
function teste(type, cat, dispatch) {
  if (type === 'Meal') {
    if (cat === 'All') {
      fetchMealsByQuery('s', '', dispatch);
    } else {
      fetchMealsByCategory(cat, dispatch);
    }
  } else if (cat === 'All') {
    fetchDrinksByQuery('s', '', dispatch);
  } else {
    fetchDrinksByCategory(cat, dispatch);
  }
}

function RecipesList({ type }) {
  const location = useLocation();
  const lists = useSelector((state) => state.api.recipesList);
  const categories = useSelector((state) => state.api.categories);
  const [cat, setCat] = useState('All');
  const dispatch = useDispatch();
  const maxListLength = 12;
  const maxCategories = 5;

  useEffect(() => {
    if (type === 'Meal') {
      fetchMealsCategories(dispatch);
    } else {
      fetchDrinksCategories(dispatch);
    }
  }, [dispatch, type]);

  useEffect(() => {
    if (location.state) {
      if (type === 'Meal') {
        fetchMealByIngredient(dispatch, location.state.strIngredient);
        return;
      }
      fetchDrinkByIngredient(dispatch, location.state.strIngredient1);
      return;
    }
    teste(type, cat, dispatch);
  }, [dispatch, type, cat, location.state]);

  if (!lists || !categories) {
    return null;
  }

  return (
    <>
      <div className="list-button-container">
        <button
          type="button"
          onClick={ () => setCat('All') }
          data-testid="All-category-filter"
        >
          All
        </button>
        {
          categories.slice(0, maxCategories).map(({ strCategory }) => (
            <button
              key={ strCategory }
              type="button"
              data-testid={ `${strCategory}-category-filter` }
              value={ strCategory }
              onClick={ (event) => handleCat(event, setCat) }
            >
              { strCategory }
            </button>
          ))
        }
      </div>
      <hr />
      <div className="list-container">
        {
          lists.slice(0, maxListLength).map((rec, index) => (
            <RecipeCard key={ index } type={ type } rec={ rec } idx={ index } />
          ))
        }
      </div>
    </>
  );
}

export default RecipesList;

RecipesList.propTypes = {
  type: PropTypes.string.isRequired,
};
