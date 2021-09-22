import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrinksByCategory, fetchDrinksByQuery, fetchDrinksCategories,
  fetchMealsByCategory,
  fetchMealsByQuery, fetchMealsCategories } from '../../services/API';

const handleCat = ({ currentTarget: { value } }, setCat) => {
  setCat((prevState) => (prevState === value ? 'All' : value));
};

function RecipesList({ type }) {
  const lists = useSelector((state) => state.api.recipesList);
  const categories = useSelector((state) => state.api.categories);
  const [cat, setCat] = useState('All');
  const dispatch = useDispatch();
  const name = type === 'Meal' ? 'strMeal' : 'strDrink';
  const thumb = type === 'Meal' ? 'strMealThumb' : 'strDrinkThumb';
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
  }, [dispatch, type, cat]);

  if (!lists || !categories) {
    return null;
  }

  return (
    <div>
      <h1>List</h1>
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
      {
        lists.slice(0, maxListLength).map((list, index) => {
          const url = type === 'Meal' ? `/comidas/${list.idMeal}`
            : `/bebidas/${list.idDrink}`;
          return (
            <Link to={ url } key={ index }>
              <div data-testid={ `${index}-recipe-card` }>
                <img data-testid={ `${index}-card-img` } src={ list[thumb] } alt="Rec" />
                <p data-testid={ `${index}-card-name` }>{list[name]}</p>
              </div>
            </Link>
          );
        })
      }
    </div>
  );
}

export default RecipesList;

RecipesList.propTypes = {
  type: PropTypes.string.isRequired,
};
