import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/Context';
import * as myFuncApi from '../services/api';
import * as myFuncStorage from '../services/storage';
import { Header, Footer, FoodCard, ButtonsFilters } from '../components';

function DrinksPage({ location: { query } }) {
  const { recipes, setMyPage, myPage, setRecipes } = useContext(MyContext);
  const LIMITER_FOODS = 12;

  // const randonRecipes = async () => {
  //   const { drinks } = await myFuncApi.fetchRandonRecipes(myPage);
  //   setRecipes(drinks);
  // };

  const randonRecipes = async () => {
    if (query !== undefined) {
      // console.log(location.query)
      const results = await myFuncApi
        .fetchRecipesIngredients('thecocktaildb', query.ingredient.strIngredient1);
      setRecipes(results.drinks);
    } else {
      const results = await myFuncApi.fetchRandonRecipes(myPage);
      setRecipes(results.drinks);
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

    setMyPage('thecocktaildb');
    if (myPage !== '') {
      randonRecipes();
    }
  }, [setMyPage, myPage]);

  const returnCard = (item, index) => (
    <FoodCard
      key={ index }
      index={ index }
      thumb="strDrinkThumb"
      name="strDrink"
      id="idDrink"
      data={ item }
      route="bebidas"
    />
  );

  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <Header title="Bebidas" search />
      <ButtonsFilters page="drinks" />
      <div style={ { display: 'flex', flexWrap: 'wrap' } }>
        {recipes !== null
          && recipes.map((item, index) => (index >= LIMITER_FOODS
            ? null : returnCard(item, index)))}
      </div>
      <Footer />
    </div>
  );
}

DrinksPage.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      ingredient: PropTypes.shape({
        strIngredient1: PropTypes.string.isRequired,
      }),
    }).isRequired,
  }).isRequired,
};

export default DrinksPage;
