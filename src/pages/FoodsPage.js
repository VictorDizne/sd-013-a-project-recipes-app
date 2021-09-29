import React, { useEffect, useContext } from 'react';
import MyContext from '../context/Context';
import * as myFuncApi from '../services/api';
import * as myFuncStorage from '../services/storage';
import { Header, Footer, FoodCard, ButtonsFilters } from '../components';

function FoodsPage() {
  const { recipes, setMyPage, myPage, setRecipes } = useContext(MyContext);
  const LIMITER_FOODS = 12;

  const randonRecipes = async () => {
    const { meals } = await myFuncApi.fetchRandonRecipes(myPage);
    setRecipes(meals);
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

export default FoodsPage;
