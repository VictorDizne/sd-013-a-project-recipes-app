import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import fetchAPI from '../../services/fetchAPI';
import recipesContext from '../../context';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function RecipeDetail() {
  const {
    details,
    setDetails,
    setLoading,
    loading,
  } = useContext(recipesContext);
  const { id } = useParams();

  // const ingredients = (mealInfo) => {
  //   const arr = Object.keys(mealInfo);
  //   const limit = 21;
  //   for (let i = 0; i < limit; i = +1) {
  //     return
  //   }
  //   console.log(arr);
  // };

  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const fetchByID = async () => {
    setLoading(true);
    const { meals } = await fetchAPI(URL);
    setDetails(meals[0]);
    setLoading(false);
    // ingredients(meals[0]);
  };

  useEffect(() => {
    fetchByID();
  }, []);

  if (loading) return 'loading';

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ details.strMealThumb }
        alt="Meal"
      />
      <h2 data-testid="recipe-title">{details.strMeal}</h2>
      <button
        type="button"
        data-testid="share-btn"
      >
        <img
          src={ shareIcon }
          alt="share button"
        />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        <img
          src={ whiteHeartIcon }
          alt="Favoritar"
        />
      </button>
      <ul data-testid={ `${id}-ingredient-name-and-measure` }>
        <li>oi</li>
      </ul>
      <p data-testid="instructions">{ details.strInstructions }</p>
    </>
  );
}

RecipeDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeDetail;
