import React, { useEffect, useContext } from 'react';
import MyContext from '../context/Context';
import * as myFunc from '../services/api';
import { Header, Footer, FoodCard, ButtonsFilters } from '../components';

function FoodsPage() {
  const { recipes, setMyPage, myPage, setRecipes } = useContext(MyContext);

  const LIMITER_FOODS = 12;

  const randonRecipes = async () => {
    const { meals } = await myFunc.fetchRandonRecipes(myPage);
    setRecipes(meals);
  };

  const setInProgressRecipeLocalStorage = () => {
    const progressRecipe = {
      cocktails: {},
      meals: {}
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipe));
  }

  const setFavoriteRecipeLocalStorage = () => {
    const favoriteRecipe = []
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipe));
  }

  useEffect(() => {
    const progressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if ( !progressRecipe ) {
      setInProgressRecipeLocalStorage()
    }

    const favoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if ( !favoriteRecipe ) {
      setFavoriteRecipeLocalStorage()
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
  //  if (!recipe.length) return <p>Loading...</p>

  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <Header title="Comidas" search />
      <ButtonsFilters page="meals" />
      <div style={ { display: 'flex', flexWrap: 'wrap' } }>
        { recipes !== null && recipes.map((item, index) => (index >= LIMITER_FOODS
          ? null : returnCard(item, index))) }
      </div>
      <Footer />
    </div>
  );
}

export default FoodsPage;
