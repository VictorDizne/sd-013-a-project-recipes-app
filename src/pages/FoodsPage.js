import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/Context';
import * as myFuncApi from '../services/api';
import * as myFuncStorage from '../services/storage';
import { Header, Footer, FoodCard, ButtonsFilters } from '../components';

function FoodsPage({ location: { query } }) {
  const { recipes, setMyPage, myPage, setRecipes } = useContext(MyContext);
  const LIMITER_FOODS = 12;

  const randonRecipes = async () => {
    if (query !== undefined) {
      const results = await myFuncApi
        .fetchRecipesIngredients('themealdb', query.ingredient.strIngredient);
      setRecipes(results.meals);
    } else {
      const results = await myFuncApi.fetchRandonRecipes(myPage);
      setRecipes(results.meals);
    }
  };

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!doneRecipes) {
      myFuncStorage.setDoneRecipesLocalStorage();
    }

    const progressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!progressRecipe) {
      myFuncStorage.setInProgressRecipeLocalStorage();
    }

    const favoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipe) {
      myFuncStorage.setFavoriteRecipeLocalStorage();
    }

    setMyPage('themealdb');
    if (myPage !== '') {
      randonRecipes();
    }
  }, [setMyPage, myPage]);

  const returnCard = (item, index) => (
    <FoodCard
      key={ index }
      index={ index }
      thumb="strMealThumb"
      name="strMeal"
      id="idMeal"
      route="comidas"
      data={ item }
    />
  );

  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <Header title="Comidas" search />
      <ButtonsFilters page="meals" />
      <div style={ { display: 'flex', flexWrap: 'wrap' } }>
        { recipes !== null
          && recipes.map((item, index) => (index >= LIMITER_FOODS
            ? null : returnCard(item, index))) }
      </div>
      <Footer />
    </div>
  );
}

FoodsPage.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      ingredient: PropTypes.shape({
        strIngredient: PropTypes.string.isRequired,
      }),
    }).isRequired,
  }).isRequired,
};

export default FoodsPage;
